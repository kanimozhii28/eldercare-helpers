
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
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Clean up auth state to prevent issues
const cleanupAuthState = () => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

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
      
      // Basic validation
      if (!email || !password) {
        const errorMessage = !email ? "Email is required" : "Password is required";
        toast({
          title: "Sign in failed",
          description: errorMessage,
          variant: "destructive"
        });
        return;
      }
      
      // Clean up auth state first to prevent limbo states
      cleanupAuthState();
      
      // Try global signout first
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
        console.log("Global sign out failed, continuing with sign in", err);
      }
      
      // Regular Supabase auth
      const { error, data } = await supabase.auth.signInWithPassword({ 
        email, 
        password
      });
      
      if (error) {
        console.error("Sign in error:", error.message);
        
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive"
        });
        
        throw new Error(error.message);
      }
      
      toast({
        title: "Welcome back",
        description: "You have successfully signed in."
      });
    } catch (error: any) {
      console.error('Error during sign in:', error);
      throw error;
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
        toast({
          title: "Sign up failed",
          description: message,
          variant: "destructive"
        });
        return;
      }
      
      // Try global signout first
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }
      
      // Create user
      const { error, data } = await supabase.auth.signUp({ 
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
          }
        }
      });

      if (error) {
        console.error("Sign up error:", error.message);
        
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive"
        });
        throw new Error(error.message);
      }

      // Handle successful signup
      if (data && data.user) {
        console.log("User created successfully:", data.user.email);
        
        toast({
          title: "Account created",
          description: "Your account has been created successfully. You can now sign in."
        });
        
        navigate('/login');
      } else {
        console.error("No user data returned after sign up");
        throw new Error("Account may have been created but user data is unavailable.");
      }
    } catch (error: any) {
      console.error('Error during sign up:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Clean up auth state first
      cleanupAuthState();
      
      // Try global signout
      await supabase.auth.signOut({ scope: 'global' });
      
      toast({
        title: "Signed out",
        description: "You have been successfully signed out."
      });
      
      // Redirect to login
      navigate('/login');
    } catch (error: any) {
      console.error('Error during sign out:', error);
      throw error;
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut
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
