
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
        console.log("Auth state changed:", event, session?.user?.email);
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
      console.log("Existing session check:", session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting sign in for:", email);
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error("Sign in error:", error.message);
        // Use speech synthesis to announce the error for visually impaired users
        if (window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance(`Sign in failed: ${error.message}`);
          window.speechSynthesis.speak(utterance);
        }
        
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      if (!data?.user) {
        console.error("No user data returned after sign in");
        // Use speech synthesis to announce the error for visually impaired users
        if (window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance("Sign in failed: User information could not be retrieved.");
          window.speechSynthesis.speak(utterance);
        }
        
        toast({
          title: "Sign in failed",
          description: "User information could not be retrieved.",
          variant: "destructive"
        });
        return;
      }
      
      console.log("Sign in successful for:", data.user.email);
      // Use speech synthesis to announce the success for visually impaired users
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance("Sign in successful. Welcome back.");
        window.speechSynthesis.speak(utterance);
      }
      
      toast({
        title: "Welcome back",
        description: "You have successfully signed in."
      });
      
      navigate('/home');
    } catch (error: any) {
      console.error('Error during sign in:', error);
      // Use speech synthesis to announce the error for visually impaired users
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(`Sign in error: ${error?.message || "An unexpected error occurred"}`);
        window.speechSynthesis.speak(utterance);
      }
      
      toast({
        title: "Sign in error",
        description: error?.message || "An unexpected error occurred during sign in.",
        variant: "destructive"
      });
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      console.log("Attempting sign up for:", email);
      // Create user without email confirmation requirement
      const { error: signUpError, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name
          },
          // Remove email redirect to disable email verification
        }
      });

      if (signUpError) {
        console.error("Sign up error:", signUpError.message);
        // Use speech synthesis to announce the error for visually impaired users
        if (window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance(`Sign up failed: ${signUpError.message}`);
          window.speechSynthesis.speak(utterance);
        }
        
        toast({
          title: "Sign up failed",
          description: signUpError.message,
          variant: "destructive"
        });
        throw signUpError;
      }

      // Make sure we have a user before trying to update the profile
      if (data && data.user && data.user.id) {
        console.log("User created successfully:", data.user.email);
        
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
          console.error('Profile update error:', profileError);
          // Use speech synthesis to announce the error for visually impaired users
          if (window.speechSynthesis) {
            const utterance = new SpeechSynthesisUtterance(`Profile update failed: ${profileError.message}`);
            window.speechSynthesis.speak(utterance);
          }
          
          toast({
            title: "Profile update failed",
            description: profileError.message,
            variant: "destructive"
          });
        } else {
          // Use speech synthesis to announce the success for visually impaired users
          if (window.speechSynthesis) {
            const utterance = new SpeechSynthesisUtterance("Account created successfully. Welcome to ElderCare.");
            window.speechSynthesis.speak(utterance);
          }
          
          toast({
            title: "Account created",
            description: "Your account has been created successfully.",
          });
          
          // Sign in the user automatically after signup
          await signIn(email, password);
        }
        
        return;
      } else {
        console.error("No user data returned after sign up");
        // Use speech synthesis to announce the error for visually impaired users
        if (window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance("Sign up issue: Account created but user data is unavailable.");
          window.speechSynthesis.speak(utterance);
        }
        
        toast({
          title: "Sign up issue",
          description: "Account created but user data is unavailable. Please contact support.",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      console.error('Error during sign up:', error);
      // Use speech synthesis to announce the error for visually impaired users
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(`Sign up error: ${error?.message || "An unexpected error occurred"}`);
        window.speechSynthesis.speak(utterance);
      }
      
      toast({
        title: "Sign up error",
        description: error?.message || "An unexpected error occurred during sign up.",
        variant: "destructive"
      });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) {
        // Use speech synthesis to announce the error for visually impaired users
        if (window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance(`Password reset failed: ${error.message}`);
          window.speechSynthesis.speak(utterance);
        }
        
        toast({
          title: "Password reset failed",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      // Use speech synthesis to announce the success for visually impaired users
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance("Password reset email sent. Check your email for the password reset link.");
        window.speechSynthesis.speak(utterance);
      }
      
      toast({
        title: "Password reset email sent",
        description: "Check your email for the password reset link"
      });
      
      navigate('/login');
    } catch (error: any) {
      console.error('Error during password reset:', error);
      // Use speech synthesis to announce the error for visually impaired users
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(`Password reset error: ${error?.message || "An unexpected error occurred"}`);
        window.speechSynthesis.speak(utterance);
      }
      
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
      // Use speech synthesis to announce the sign out for visually impaired users
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance("You have been successfully signed out.");
        window.speechSynthesis.speak(utterance);
      }
      
      toast({
        title: "Signed out",
        description: "You have been successfully signed out."
      });
      navigate('/login');
    } catch (error: any) {
      console.error('Error during sign out:', error);
      // Use speech synthesis to announce the error for visually impaired users
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance("Sign out failed. An error occurred while signing out.");
        window.speechSynthesis.speak(utterance);
      }
      
      toast({
        title: "Sign out failed",
        description: "An error occurred while signing out."
      });
    }
  };

  const updateProfile = async (data: any) => {
    try {
      if (!user || !user.id) {
        // Use speech synthesis to announce the error for visually impaired users
        if (window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance("Update failed. User not authenticated.");
          window.speechSynthesis.speak(utterance);
        }
        
        toast({
          title: "Update failed",
          description: "User not authenticated",
          variant: "destructive"
        });
        return;
      }
      
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

      if (error) {
        // Use speech synthesis to announce the error for visually impaired users
        if (window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance(`Profile update failed: ${error.message}`);
          window.speechSynthesis.speak(utterance);
        }
        
        toast({
          title: "Profile update failed",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }

      // Use speech synthesis to announce the success for visually impaired users
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance("Profile updated successfully.");
        window.speechSynthesis.speak(utterance);
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated."
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      // Use speech synthesis to announce the error for visually impaired users
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(`Update error: ${error?.message || "An unexpected error occurred"}`);
        window.speechSynthesis.speak(utterance);
      }
      
      toast({
        title: "Update error",
        description: error?.message || "An unexpected error occurred",
        variant: "destructive"
      });
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
