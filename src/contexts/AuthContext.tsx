
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

// Auth state cleanup utility to prevent "limbo" states
const cleanupAuthState = () => {
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { speak } = useSpeechSynthesis();

  // Initialize auth state
  useEffect(() => {
    console.log("Setting up auth provider...");
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, !!session);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          // Use timeout to prevent potential deadlocks
          setTimeout(() => {
            navigate('/home');
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          navigate('/login');
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Existing session check:", !!session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting sign in for:", email);
      
      // Always clean up auth state first to prevent limbo states
      cleanupAuthState();
      
      // Basic validation
      if (!email) {
        const message = "Email is required";
        speak(message);
        toast({
          title: "Sign in failed",
          description: message,
          variant: "destructive"
        });
        return;
      }
      
      if (!password) {
        const message = "Password is required";
        speak(message);
        toast({
          title: "Sign in failed",
          description: message,
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
          description: "You have successfully signed in with the test account."
        });
        
        // Navigate to home after setting user state
        window.location.href = '/home';
        return;
      }
      
      // Try Supabase auth for non-test users - always attempt global signout first
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
        console.log("Global sign out failed, continuing with sign in", err);
      }
      
      // Regular Supabase auth for other users
      const { error, data } = await supabase.auth.signInWithPassword({ 
        email, 
        password
      });
      
      if (error) {
        console.error("Sign in error:", error.message);
        
        // Better explain what might be wrong
        let friendlyErrorMessage = "The email or password you entered is incorrect. Please check your credentials and try again.";
        
        // Specifically identify what's wrong
        if (error.message.includes("Email not confirmed")) {
          friendlyErrorMessage = "Your email has not been verified yet. For testing, try using test@eldercare.com with any password.";
        } else if (error.message.includes("Invalid login credentials")) {
          friendlyErrorMessage = "Invalid login credentials. Please check your email and password.";
        }
        
        speak(friendlyErrorMessage);
        
        toast({
          title: "Sign in failed",
          description: friendlyErrorMessage,
          variant: "destructive"
        });
        
        // Throw error to be caught in the component
        throw new Error(friendlyErrorMessage);
      }
      
      if (!data?.user) {
        console.error("No user data returned after sign in");
        const errorMessage = "User information could not be retrieved.";
        
        speak(errorMessage);
        
        toast({
          title: "Sign in failed",
          description: errorMessage,
          variant: "destructive"
        });
        throw new Error(errorMessage);
      }
      
      console.log("Sign in successful for:", data.user.email);
      speak("Sign in successful. Welcome back.");
      
      toast({
        title: "Welcome back",
        description: "You have successfully signed in."
      });
      
      // Force page reload
      window.location.href = '/home';
      
    } catch (error: any) {
      console.error('Error during sign in:', error);
      throw error; // Let the component handle the UI display of errors
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      console.log("Attempting sign up for:", email);
      
      // Clean up auth state first
      cleanupAuthState();
      
      // Basic validation
      if (!email || !password) {
        const message = !email ? "Email is required" : "Password is required";
        speak(message);
        toast({
          title: "Sign up failed",
          description: message,
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
        
        // Store email for future logins
        localStorage.setItem('eldercare_registered_email', email);
        
        // Force navigation to home
        window.location.href = '/home';
        return;
      }
      
      // Try global signout first
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }
      
      // Create user with auto sign in enabled
      const { error: signUpError, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
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
          },
          emailRedirectTo: window.location.origin + '/login'
        }
      });

      if (signUpError) {
        console.error("Sign up error:", signUpError.message);
        
        let friendlyErrorMessage = signUpError.message;
        
        if (signUpError.message.includes("User already registered")) {
          friendlyErrorMessage = "An account with this email already exists. Try signing in instead.";
        }
        
        speak(friendlyErrorMessage);
        
        toast({
          title: "Sign up failed",
          description: friendlyErrorMessage,
          variant: "destructive"
        });
        throw new Error(friendlyErrorMessage);
      }

      // Handle successful signup
      if (data && data.user && data.user.id) {
        console.log("User created successfully:", data.user.email);
        
        // Store credentials for future login
        localStorage.setItem('eldercare_registered_email', email);
        
        // Check if email confirmation is required
        if (data.session) {
          // User is automatically signed in (email confirmation not required)
          speak("Account created and signed in successfully. Welcome to ElderCare.");
          
          toast({
            title: "Account created",
            description: "Your account has been created successfully and you are now signed in.",
          });
          
          // Force navigation to home page
          window.location.href = '/home';
        } else {
          // Email confirmation is likely required
          speak("Account created successfully. Please check your email to confirm your account.");
          
          toast({
            title: "Account created",
            description: "Your account has been created. Please check your email to confirm your account before signing in.",
          });
          
          navigate('/login');
        }
      } else {
        console.error("No user data returned after sign up");
        throw new Error("Account may have been created but user data is unavailable. Please try signing in with your credentials.");
      }
    } catch (error: any) {
      console.error('Error during sign up:', error);
      throw error; // Let component handle UI display of errors
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
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) {
        speak(`Password reset failed: ${error.message}`);
        
        toast({
          title: "Password reset failed",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }
      
      speak("Password reset email sent. Check your email for the password reset link.");
      
      toast({
        title: "Password reset email sent",
        description: "Check your email for the password reset link"
      });
      
      navigate('/login');
    } catch (error: any) {
      console.error('Error during password reset:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Clean up auth state first
      cleanupAuthState();
      
      // Try global signout
      await supabase.auth.signOut({ scope: 'global' });
      
      speak("You have been successfully signed out.");
      
      toast({
        title: "Signed out",
        description: "You have been successfully signed out."
      });
      
      // Force page reload for clean state
      window.location.href = '/login';
    } catch (error: any) {
      console.error('Error during sign out:', error);
      throw error;
    }
  };

  const updateProfile = async (data: any) => {
    try {
      if (!user || !user.id) {
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
        speak(`Profile update failed: ${error.message}`);
        
        toast({
          title: "Profile update failed",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }

      speak("Profile updated successfully.");
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated."
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      throw error;
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
