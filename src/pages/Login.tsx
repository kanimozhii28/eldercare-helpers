import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserIcon, KeyIcon, Calendar, Phone, Heart, Ruler, Weight, Droplet, Volume, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { SpeakButton, useSpeechSynthesis } from '@/components/SpeechSynthesis';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Login = () => {
  const { user, loading, signIn, signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState<Date>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [healthCondition, setHealthCondition] = useState('');
  const [underTreatment, setUnderTreatment] = useState('no');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [address, setAddress] = useState('');
  const [activeTab, setActiveTab] = useState('signin');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (user && !loading) {
      navigate('/home');
    }
    
    // Announce page load for visually impaired users
    if (!user && !loading) {
      speak("ElderCare login page loaded. Please sign in or create an account.");
    }
  }, [user, loading, navigate, speak]);

  // Announce tab changes for accessibility
  useEffect(() => {
    if (activeTab === 'signin') {
      speak("Sign in tab selected. Please enter your email and password.");
    } else if (activeTab === 'signup') {
      speak("Sign up tab selected. Please fill in the registration form to create your account.");
    }
  }, [activeTab, speak]);

  // Use test account - improved functionality
  const useTestAccount = () => {
    setEmail("test@eldercare.com");
    setPassword("test123");
    speak("Test account credentials filled. You can now sign in.");
    
    toast({
      title: "Test account ready",
      description: "You can now sign in with the test account credentials."
    });
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    setFormError('');

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      speak("There are errors in your form. Please correct them before submitting.");
      return;
    }
    
    setIsLoading(true);
    setFormError('');
    
    try {
      console.log("Login attempt with:", email);
      await signIn(email, password);
      // Note: signIn function will handle the navigation and feedback
    } catch (error) {
      console.error("Login error caught in component:", error);
      setFormError('Sign in failed. Please check your credentials and try again.');
      speak("Sign in failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const validateSignupForm = () => {
    let isValid = true;
    setFormError('');

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !dob || !phoneNumber || 
        !emergencyContact || !gender || !bloodGroup || !address) {
      setFormError('Please fill in all required fields marked with an asterisk.');
      speak("Missing required fields. Please fill in all required fields marked with an asterisk.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setFormError('Please enter a valid email address');
      speak("Please enter a valid email address");
      isValid = false;
    } else if (!validatePassword(password)) {
      setFormError('Password must be at least 6 characters long');
      speak("Password must be at least 6 characters long");
      isValid = false;
    }

    return isValid;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSignupForm()) {
      return;
    }
    
    setIsLoading(true);
    setFormError('');
    
    try {
      const userData = {
        first_name: firstName || "Test",
        last_name: lastName || "User",
        date_of_birth: dob || new Date(),
        phone_number: phoneNumber || "0000000000",
        age: age || "30",
        emergency_contact: emergencyContact || "0000000000", 
        health_condition: healthCondition || "",
        under_treatment: underTreatment,
        gender: gender || "prefer-not-to-say",
        height: height || "170",
        weight: weight || "70",
        blood_group: bloodGroup || "O+",
        address: address || "Test address",
      };

      console.log("Sign up attempt with:", email);
      await signUp(email, password, userData);
      // Note: signUp function will handle the navigation and feedback
    } catch (error: any) {
      console.error('Error during signup:', error);
      setFormError(error.message || 'Error during signup. Please try again.');
      speak("Error during signup. " + (error.message || 'Please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  // Read form field to user when focused
  const handleFieldFocus = (fieldName: string, value: string = '') => {
    let message = `${fieldName} field`;
    if (value) {
      message += `. Current value: ${value}`;
    }
    speak(message);
  };

  // Announce read-only information
  const announceInfo = (text: string) => {
    speak(text);
  };

  // If still loading auth state, show loading indicator
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel (Form) */}
      <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8">
            <span className="text-2xl font-semibold bg-gradient-to-r from-eldercare-blue to-blue-600 bg-clip-text text-transparent">ElderCare</span>
            <h1 className="text-2xl md:text-3xl font-bold mt-6 mb-2">Welcome</h1>
            <p className="text-muted-foreground">Sign in to access your account or create a new one</p>
            
            {/* Accessibility button to read page description */}
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 flex items-center gap-1"
              onClick={() => speak("ElderCare platform login page. Here you can sign in with your existing account or create a new one to access elder care services.")}
              aria-label="Read page description aloud"
            >
              <Volume size={16} />
              <span className="sr-only">Read aloud</span>
            </Button>
          </div>
          
          {/* Test Account Alert - Enhanced for better visibility */}
          <Alert className="mb-4 bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-sm text-blue-700">
              <div className="font-medium">Testing mode enabled</div>
              <p className="mt-1">Use <strong>test@eldercare.com</strong> with any password for quick testing.</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2 bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200"
                onClick={useTestAccount}
              >
                Use test account
              </Button>
            </AlertDescription>
          </Alert>
          
          <Tabs 
            defaultValue="signin" 
            className="w-full"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger id="signin-tab" value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleLogin}>
                {formError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                    <p className="text-sm font-medium">{formError}</p>
                    <SpeakButton text={formError} label="Read Error" variant="ghost" size="sm" iconOnly={false} className="mt-1" />
                  </div>
                )}
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com"
                        className={`pl-10 ${emailError ? 'border-red-500' : ''}`}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailError('');
                        }}
                        onFocus={() => handleFieldFocus("Email", email)}
                        required
                        aria-label="Email address"
                        aria-invalid={!!emailError}
                        aria-describedby={emailError ? "email-error" : undefined}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-8"
                        onClick={() => speak(email ? `Email entered: ${email}` : "Email field is empty")}
                        aria-label="Read email aloud"
                      >
                        <Volume className="h-4 w-4" />
                        <span className="sr-only">Read aloud</span>
                      </Button>
                    </div>
                    {emailError && (
                      <p id="email-error" className="text-sm text-red-500 mt-1">{emailError}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <KeyIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••"
                        className={`pl-10 ${passwordError ? 'border-red-500' : ''}`}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setPasswordError('');
                        }}
                        onFocus={() => handleFieldFocus("Password")}
                        required
                        aria-label="Password"
                        aria-invalid={!!passwordError}
                        aria-describedby={passwordError ? "password-error" : undefined}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <button 
                          type="button"
                          className="pr-3"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    {passwordError && (
                      <p id="password-error" className="text-sm text-red-500 mt-1">{passwordError}</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-eldercare-blue hover:bg-blue-600"
                    disabled={isLoading}
                    aria-label={isLoading ? "Signing in, please wait" : "Sign In"}
                    onClick={() => !isLoading && speak("Attempting to sign in. Please wait.")}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-6">
                {formError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                    <p className="text-sm font-medium">{formError}</p>
                    <SpeakButton text={formError} label="Read Error" variant="ghost" size="sm" iconOnly={false} className="mt-1" />
                  </div>
                )}
                
                {/* Personal Information Section */}
                <div>
                  <h3 className="text-md font-semibold mb-3">Personal Information</h3>
                  <div className="space-y-4">
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First name *</Label>
                        <div className="relative">
                          <Input 
                            id="first-name" 
                            placeholder="John" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            onFocus={() => handleFieldFocus("First name", firstName)}
                            required 
                            aria-label="First name, required field"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1 h-8"
                            onClick={() => speak(firstName ? `First name entered: ${firstName}` : "First name field is empty")}
                            aria-label="Read first name aloud"
                          >
                            <Volume className="h-4 w-4" />
                            <span className="sr-only">Read aloud</span>
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last name *</Label>
                        <div className="relative">
                          <Input 
                            id="last-name" 
                            placeholder="Doe" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            onFocus={() => handleFieldFocus("Last name", lastName)}
                            required 
                            aria-label="Last name, required field"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1 h-8"
                            onClick={() => speak(lastName ? `Last name entered: ${lastName}` : "Last name field is empty")}
                            aria-label="Read last name aloud"
                          >
                            <Volume className="h-4 w-4" />
                            <span className="sr-only">Read aloud</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Email & Password */}
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email *</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <UserIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input 
                          id="signup-email" 
                          type="email" 
                          placeholder="your@email.com"
                          className="pl-10" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={() => handleFieldFocus("Email", email)}
                          required
                          aria-label="Email address, required field"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1 h-8"
                          onClick={() => speak(email ? `Email entered: ${email}` : "Email field is empty")}
                          aria-label="Read email aloud"
                        >
                          <Volume className="h-4 w-4" />
                          <span className="sr-only">Read aloud</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password *</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <KeyIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input 
                          id="signup-password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••"
                          className="pl-10" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onFocus={() => handleFieldFocus("Password")}
                          required
                          aria-label="Password, required field"
                        />
                        <button 
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Date of Birth & Gender */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                              id="dob"
                              onFocus={() => handleFieldFocus("Date of birth", dob ? format(dob, "PPP") : "Not selected")}
                              aria-label="Date of Birth, required field"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {dob ? format(dob, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={dob}
                              onSelect={setDob}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender *</Label>
                        <Select 
                          value={gender} 
                          onValueChange={setGender} 
                          required
                          onOpenChange={(open) => open && handleFieldFocus("Gender", gender)}
                        >
                          <SelectTrigger id="gender" aria-label="Gender, required field">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Phone & Emergency Contact */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input 
                            id="phone" 
                            type="tel" 
                            placeholder="(555) 123-4567"
                            className="pl-10" 
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            onFocus={() => handleFieldFocus("Phone number", phoneNumber)}
                            required
                            aria-label="Phone number, required field"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1 h-8"
                            onClick={() => speak(phoneNumber ? `Phone number entered: ${phoneNumber}` : "Phone number field is empty")}
                            aria-label="Read phone number aloud"
                          >
                            <Volume className="h-4 w-4" />
                            <span className="sr-only">Read aloud</span>
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergency">Emergency Contact *</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input 
                            id="emergency" 
                            type="tel" 
                            placeholder="(555) 123-4567"
                            className="pl-10" 
                            value={emergencyContact}
                            onChange={(e) => setEmergencyContact(e.target.value)}
                            onFocus={() => handleFieldFocus("Emergency contact", emergencyContact)}
                            required
                            aria-label="Emergency contact, required field"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1 h-8"
                            onClick={() => speak(emergencyContact ? `Emergency contact entered: ${emergencyContact}` : "Emergency contact field is empty")}
                            aria-label="Read emergency contact aloud"
                          >
                            <Volume className="h-4 w-4" />
                            <span className="sr-only">Read aloud</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Address */}
                    <div className="space-y-2">
                      <Label htmlFor="address">Address *</Label>
                      <div className="relative">
                        <Textarea 
                          id="address" 
                          placeholder="Your full address" 
                          className="min-h-[80px]"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          onFocus={() => handleFieldFocus("Address", address)}
                          required
                          aria-label="Address, required field"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1 h-8"
                          onClick={() => speak(address ? `Address entered: ${address}` : "Address field is empty")}
                          aria-label="Read address aloud"
                        >
                          <Volume className="h-4 w-4" />
                          <span className="sr-only">Read aloud</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medical Information Section */}
                <div>
                  <h3 className="text-md font-semibold mb-3">Medical Information</h3>
                  <div className="space-y-4">
                    {/* Health Conditions */}
                    <div className="space-y-2">
                      <Label htmlFor="health-condition">Health Conditions</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Heart className="h-5 w-5 text-gray-400" />
                        </div>
                        <Textarea 
                          id="health-condition" 
                          placeholder="Any existing health conditions we should be aware of"
                          className="pl-10 min-h-[80px]" 
                          value={healthCondition}
                          onChange={(e) => setHealthCondition(e.target.value)}
                          onFocus={() => handleFieldFocus("Health conditions", healthCondition)}
                          aria-label="Health conditions"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1 h-8"
                          onClick={() => speak(healthCondition ? `Health conditions entered: ${healthCondition}` : "Health conditions field is empty")}
                          aria-label="Read health conditions aloud"
                        >
                          <Volume className="h-4 w-4" />
                          <span className="sr-only">Read aloud</span>
                        </Button>
                      </div>
                    </div>

                    {/* Under Treatment */}
                    <div className="space-y-2">
                      <Label>Currently Under Treatment?</Label>
                      <RadioGroup 
                        value={underTreatment} 
                        onValueChange={(value) => {
                          setUnderTreatment(value);
                          speak(`Under treatment: ${value === 'yes' ? 'Yes' : 'No'}`);
                        }}
                        aria-label="Currently under treatment?"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="treatment-yes" />
                          <Label htmlFor="treatment-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="treatment-no" />
                          <Label htmlFor="treatment-no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Physical Details */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="height">Height (cm)</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Ruler className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input 
                            id="height" 
                            type="number" 
                            placeholder="175"
                            className="pl-10" 
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            onFocus={() => handleFieldFocus("Height", height)}
                            aria-label="Height in centimeters"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1 h-8"
                            onClick={() => speak(height ? `Height entered: ${height} centimeters` : "Height field is empty")}
                            aria-label="Read height aloud"
                          >
                            <Volume className="h-4 w-4" />
                            <span className="sr-only">Read aloud</span>
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Weight className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input 
                            id="weight" 
                            type="number" 
                            placeholder="70"
                            className="pl-10" 
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            onFocus={() => handleFieldFocus("Weight", weight)}
                            aria-label="Weight in kilograms"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1 h-8"
                            onClick={() => speak(weight ? `Weight entered: ${weight} kilograms` : "Weight field is empty")}
                            aria-label="Read weight aloud"
                          >
                            <Volume className="h-4 w-4" />
                            <span className="sr-only">Read aloud</span>
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="blood-group">Blood Group *</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Droplet className="h-5 w-5 text-gray-400" />
                          </div>
                          <Select 
                            value={bloodGroup} 
                            onValueChange={setBloodGroup} 
                            required
                            onOpenChange={(open) => open && handleFieldFocus("Blood group", bloodGroup)}
                          >
                            <SelectTrigger id="blood-group" className="pl-10" aria-label="Blood group, required field">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="A+">A+</SelectItem>
                              <SelectItem value="A-">A-</SelectItem>
                              <SelectItem value="B+">B+</SelectItem>
                              <SelectItem value="B-">B-</SelectItem>
                              <SelectItem value="AB+">AB+</SelectItem>
                              <SelectItem value="AB-">AB-</SelectItem>
                              <SelectItem value="O+">O+</SelectItem>
                              <SelectItem value="O-">O-</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-eldercare-blue hover:bg-blue-600"
                  disabled={isLoading}
                  aria-label={isLoading ? "Creating account, please wait" : "Create Account"}
                  onClick={() => !isLoading && speak("Attempting to create your account. Please wait.")}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Right Panel (Image) - Only shown in sign in state */}
      <div className="hidden md:block md:w-1/2 bg-eldercare-blueGray">
        <div className="h-full flex items-center justify-center p-8">
          <div className="max-w-md">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="mb-6">
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                    alt="Profile image of a woman"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                    alt="Profile image of an older man"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                    alt="Profile image of a woman with glasses"
                  />
                </div>
              </div>
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-eldercare-lightBlue flex items-center justify-center">
                    <svg className="h-4 w-4 text-eldercare-blue fill-eldercare-blue" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">"ElderCare has been a lifesaver for our family. The caregivers are professional, compassionate, and truly care about my mother's wellbeing."</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                <p className="font-medium">Jennifer H.</p>
                <p>Daughter of ElderCare client</p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Join thousands of families who trust ElderCare</h3>
              <p className="text-gray-600">Providing compassionate care for seniors since 2015</p>
              
              <div className="mt-6 flex justify-center space-x-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-eldercare-blue">5,000+</p>
                  <p className="text-sm text-gray-600">Caregivers</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-eldercare-blue">12,000+</p>
                  <p className="text-sm text-gray-600">Families</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-eldercare-blue">4.8/5</p>
                  <p className="text-sm text-gray-600">Satisfaction</p>
                </div>
              </div>
              
              {/* Button to read testimonial and statistics aloud */}
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4 flex items-center gap-1"
                onClick={() => announceInfo("ElderCare testimonial: ElderCare has been a lifesaver for our family. The caregivers are professional, compassionate, and truly care about my mother's wellbeing. By Jennifer H., daughter of ElderCare client. Join thousands of families who trust ElderCare. Providing compassionate care for seniors since 2015. With over 5,000 caregivers, 12,000 families served, and a 4.8 out of 5 satisfaction rating.")}
                aria-label="Read testimonial and statistics aloud"
              >
                <Volume size={16} />
                <span>Read Aloud</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
