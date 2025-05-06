
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserIcon, KeyIcon, Calendar, Phone, Heart, Ruler, Weight, Droplet } from 'lucide-react';
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
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (user && !loading) {
      navigate('/home');
    }
  }, [user, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signIn(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate required fields
      if (!firstName || !lastName || !email || !password || !dob || !phoneNumber || 
          !emergencyContact || !gender || !bloodGroup || !address) {
        toast({
          title: "Missing required fields",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }
      
      const userData = {
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dob,
        phone_number: phoneNumber,
        age: age,
        emergency_contact: emergencyContact,
        health_condition: healthCondition,
        under_treatment: underTreatment,
        gender: gender,
        height: height,
        weight: weight,
        blood_group: bloodGroup,
        address: address,
      };

      await signUp(email, password, userData);
      
      // Sign in directly after signup
      await signIn(email, password);
    } catch (error) {
      console.error('Error during signup:', error);
    } finally {
      setIsLoading(false);
    }
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
          </div>
          
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger id="signin-tab" value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleLogin}>
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
                        className="pl-10" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <KeyIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••"
                        className="pl-10" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button 
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-eldercare-blue hover:bg-blue-600"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-6">
                {/* Personal Information Section */}
                <div>
                  <h3 className="text-md font-semibold mb-3">Personal Information</h3>
                  <div className="space-y-4">
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First name *</Label>
                        <Input 
                          id="first-name" 
                          placeholder="John" 
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last name *</Label>
                        <Input 
                          id="last-name" 
                          placeholder="Doe" 
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required 
                        />
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
                          required
                        />
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
                          required
                        />
                        <button 
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                          onClick={() => setShowPassword(!showPassword)}
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
                        <Select value={gender} onValueChange={setGender} required>
                          <SelectTrigger id="gender">
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
                            required
                          />
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
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Address */}
                    <div className="space-y-2">
                      <Label htmlFor="address">Address *</Label>
                      <Textarea 
                        id="address" 
                        placeholder="Your full address" 
                        className="min-h-[80px]"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
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
                        />
                      </div>
                    </div>

                    {/* Under Treatment */}
                    <div className="space-y-2">
                      <Label>Currently Under Treatment?</Label>
                      <RadioGroup value={underTreatment} onValueChange={setUnderTreatment}>
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
                          />
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
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="blood-group">Blood Group *</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Droplet className="h-5 w-5 text-gray-400" />
                          </div>
                          <Select value={bloodGroup} onValueChange={setBloodGroup} required>
                            <SelectTrigger id="blood-group" className="pl-10">
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
                    alt=""
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                    alt=""
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                    alt=""
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
