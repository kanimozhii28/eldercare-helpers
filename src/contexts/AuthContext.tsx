
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          navigate('/home');
        } else if (event === 'SIGNED_OUT') {
          navigate('/login');
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        // Special handling for different error types
        if (error.message.includes("Email not confirmed")) {
          toast({
            title: "Email not confirmed",
            description: "Please check your email inbox and confirm your email address before signing in.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Sign in failed",
            description: error.message,
            variant: "destructive"
          });
        }
        return;
      }
      
      if (!data?.user) {
        toast({
          title: "Sign in failed",
          description: "User information could not be retrieved.",
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Welcome back",
        description: "You have successfully signed in."
      });
      
      navigate('/home');
    } catch (error: any) {
      console.error('Error during sign in:', error);
      toast({
        title: "Sign in error",
        description: error?.message || "An unexpected error occurred during sign in.",
        variant: "destructive"
      });
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      const { error: signUpError, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name
          },
          emailRedirectTo: window.location.origin + '/login'
        }
      });

      if (signUpError) {
        toast({
          title: "Sign up failed",
          description: signUpError.message,
          variant: "destructive"
        });
        throw signUpError;
      }

      // Make sure we have a user before trying to update the profile
      if (data.user) {
        // Update the profile with additional user data
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            first_name: userData.first_name,
            last_name: userData.last_name,
            date_of_birth: userData.date_of_birth,
            phone_number: userData.phone_number,
            emergency_contact: userData.emergency_contact,
            health_condition: userData.health_condition,
            under_treatment: userData.under_treatment === 'yes',
            gender: userData.gender,
            height: userData.height,
            weight: userData.weight,
            blood_group: userData.blood_group,
            address: userData.address,
          })
          .eq('id', data.user.id);

        if (profileError) {
          toast({
            title: "Profile update failed",
            description: profileError.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Account created",
            description: "Please check your email for a confirmation link to complete your registration.",
          });
        }
      } else {
        toast({
          title: "Sign up issue",
          description: "Account created but user data is unavailable. Please contact support.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) {
        toast({
          title: "Password reset failed",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Password reset email sent",
        description: "Check your email for the password reset link"
      });
      
      navigate('/login');
    } catch (error: any) {
      console.error('Error during password reset:', error);
      toast({
        title: "Password reset error",
        description: error?.message || "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out."
      });
      navigate('/login');
    } catch (error) {
      console.error('Error during sign out:', error);
      toast({
        title: "Sign out failed",
        description: "An error occurred while signing out."
      });
    }
  };

  const updateProfile = async (data: any) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user?.id);

      if (error) {
        toast({
          title: "Profile update failed",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated."
      });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
