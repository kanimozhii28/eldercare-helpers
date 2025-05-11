
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useSpeechSynthesis } from '@/components/SpeechSynthesis';

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
  const { speak } = useSpeechSynthesis();

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

  // Email and password validation is now more lenient for testing
  const validateEmail = (email: string): boolean => {
    // Basic check to ensure there's some text that looks like an email
    return email.includes('@');
  };

  const validatePassword = (password: string): boolean => {
    // Accept any non-empty password for testing
    return password.length > 0;
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting sign in for:", email);
      
      // Simplified validation for testing
      let errorMessage = "";
      
      if (!email) {
        errorMessage = "Email is required";
      } else if (!password) {
        errorMessage = "Password is required";
      }
      
      if (errorMessage) {
        speak(errorMessage);
        toast({
          title: "Sign in failed",
          description: errorMessage,
          variant: "destructive"
        });
        return;
      }
      
      // For testing - if using the test account, bypass Supabase auth
      if (email === "test@eldercare.com" && password.length > 0) {
        // Create a mock user and session
        const mockUser = {
          id: "test-user-id",
          email: "test@eldercare.com",
          user_metadata: {
            first_name: "Test",
            last_name: "User"
          }
        };
        
        // Set the mock user and session
        setUser(mockUser as any);
        setSession({ user: mockUser } as any);
        
        speak("Sign in successful. Welcome back.");
        toast({
          title: "Welcome back",
          description: "You have successfully signed in."
        });
        
        navigate('/home');
        return;
      }
      
      // Regular Supabase auth for other users
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error("Sign in error:", error.message);
        
        // Better explain what might be wrong
        let friendlyErrorMessage = "The email or password you entered is incorrect. Please check your credentials and try again.";
        
        // Specifically identify what's wrong
        if (error.message.includes("Email not confirmed")) {
          friendlyErrorMessage = "Your email has not been verified yet. For testing, try using test@eldercare.com with any password.";
        } else if (error.message.includes("Invalid login credentials")) {
          friendlyErrorMessage = "Invalid login credentials. For testing purposes, you can use test@eldercare.com with any password.";
        }
        
        speak(friendlyErrorMessage);
        
        toast({
          title: "Sign in failed",
          description: friendlyErrorMessage,
          variant: "destructive"
        });
        return;
      }
      
      if (!data?.user) {
        console.error("No user data returned after sign in");
        const errorMessage = "User information could not be retrieved. For testing, use test@eldercare.com with any password.";
        
        speak(errorMessage);
        
        toast({
          title: "Sign in failed",
          description: errorMessage,
          variant: "destructive"
        });
        return;
      }
      
      console.log("Sign in successful for:", data.user.email);
      speak("Sign in successful. Welcome back.");
      
      toast({
        title: "Welcome back",
        description: "You have successfully signed in."
      });
      
      navigate('/home');
    } catch (error: any) {
      console.error('Error during sign in:', error);
      const errorMessage = error?.message || "An unexpected error occurred during sign in. For testing, try test@eldercare.com.";
      
      speak(errorMessage);
      
      toast({
        title: "Sign in error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      console.log("Attempting sign up for:", email);
      
      // Simplified validation for testing
      let errorMessage = "";
      
      if (!email) {
        errorMessage = "Email is required";
      } else if (!password) {
        errorMessage = "Password is required";
      }
      
      if (errorMessage) {
        speak(errorMessage);
        toast({
          title: "Sign up failed",
          description: errorMessage,
          variant: "destructive"
        });
        return;
      }
      
      // For testing - if using test account, automatically set up a user
      if (email === "test@eldercare.com") {
        // Create a mock user
        const mockUser = {
          id: "test-user-id",
          email: "test@eldercare.com",
          user_metadata: {
            first_name: userData.first_name || "Test",
            last_name: userData.last_name || "User"
          }
        };
        
        // Set the mock user and session
        setUser(mockUser as any);
        setSession({ user: mockUser } as any);
        
        speak("Account created successfully. Welcome to ElderCare.");
        
        toast({
          title: "Account created",
          description: "Your test account has been created successfully.",
        });
        
        navigate('/home');
        return;
      }
      
      // Create user without email confirmation for testing
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
        console.error("Sign up error:", signUpError.message);
        
        let friendlyErrorMessage = signUpError.message;
        
        if (signUpError.message.includes("User already registered")) {
          friendlyErrorMessage = "An account with this email already exists. For testing, try using test@eldercare.com.";
        }
        
        speak(friendlyErrorMessage);
        
        toast({
          title: "Sign up failed",
          description: friendlyErrorMessage,
          variant: "destructive"
        });
        return;
      }

      // Handle successful signup
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
          const errorMessage = `Profile updated but some details may be missing. You can now sign in.`;
          
          speak(errorMessage);
          
          toast({
            title: "Account created",
            description: errorMessage,
          });
        } else {
          speak("Account created successfully. Welcome to ElderCare.");
          
          toast({
            title: "Account created",
            description: "Your account has been created successfully. You can now sign in.",
          });
        }
        
        // For regular signup, redirect to login instead of auto-sign-in
        navigate('/login');
        return;
      } else {
        console.error("No user data returned after sign up");
        const errorMessage = "Account may have been created but user data is unavailable. Please try signing in with your credentials.";
        
        speak(errorMessage);
        
        toast({
          title: "Sign up issue",
          description: errorMessage,
        });
        
        navigate('/login');
      }
    } catch (error: any) {
      console.error('Error during sign up:', error);
      const errorMessage = error?.message || "An unexpected error occurred during sign up. For testing, try test@eldercare.com.";
      
      speak(errorMessage);
      
      toast({
        title: "Sign up error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      if (!email) {
        const errorMessage = "Email is required for password reset";
        speak(errorMessage);
        toast({
          title: "Password reset failed",
          description: errorMessage,
          variant: "destructive"
        });
        return;
      }
      
      if (!validateEmail(email)) {
        const errorMessage = "Please enter a valid email address";
        speak(errorMessage);
        toast({
          title: "Password reset failed",
          description: errorMessage,
          variant: "destructive"
        });
        return;
      }
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) {
        // Use speech synthesis to announce the error for visually impaired users
        speak(`Password reset failed: ${error.message}`);
        
        toast({
          title: "Password reset failed",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      // Use speech synthesis to announce the success for visually impaired users
      speak("Password reset email sent. Check your email for the password reset link.");
      
      toast({
        title: "Password reset email sent",
        description: "Check your email for the password reset link"
      });
      
      navigate('/login');
    } catch (error: any) {
      console.error('Error during password reset:', error);
      // Use speech synthesis to announce the error for visually impaired users
      speak(`Password reset error: ${error?.message || "An unexpected error occurred"}`);
      
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
      speak("You have been successfully signed out.");
      
      toast({
        title: "Signed out",
        description: "You have been successfully signed out."
      });
      navigate('/login');
    } catch (error: any) {
      console.error('Error during sign out:', error);
      // Use speech synthesis to announce the error for visually impaired users
      speak("Sign out failed. An error occurred while signing out.");
      
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
        speak("Update failed. User not authenticated.");
        
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
        speak(`Profile update failed: ${error.message}`);
        
        toast({
          title: "Profile update failed",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }

      // Use speech synthesis to announce the success for visually impaired users
      speak("Profile updated successfully.");
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated."
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      // Use speech synthesis to announce the error for visually impaired users
      speak(`Update error: ${error?.message || "An unexpected error occurred"}`);
      
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
