
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, UserIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import SpeakButton, { useSpeechSynthesis } from '@/components/SpeechSynthesis';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();
  const { speak } = useSpeechSynthesis();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    speak("Processing your password reset request. Please wait.");
    
    try {
      await resetPassword(email);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="mb-8">
          <span className="text-2xl font-semibold bg-gradient-to-r from-eldercare-blue to-blue-600 bg-clip-text text-transparent">ElderCare</span>
          <h1 className="text-2xl md:text-3xl font-bold mt-6 mb-2">Reset Password</h1>
          <p className="text-muted-foreground">Enter your email address to reset your password</p>
          
          <SpeakButton
            text="Reset Password page. Enter your email address below and we will send you a link to reset your password."
            label="Read page description"
            className="mt-2"
          />
        </div>
        
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com"
                className="pl-10" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address input field for password reset"
              />
              <div className="absolute right-1 top-1">
                <SpeakButton
                  text={email ? `Email entered: ${email}` : "Email field is empty"}
                  iconOnly={true}
                />
              </div>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-eldercare-blue hover:bg-blue-600"
            disabled={isLoading}
            aria-label={isLoading ? "Sending password reset email" : "Send reset link"}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
          
          <div className="text-center">
            <Link 
              to="/login" 
              className="text-sm text-eldercare-blue hover:underline flex items-center justify-center"
              onClick={() => speak("Navigating back to login page.")}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
