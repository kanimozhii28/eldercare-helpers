
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, DollarSign, MapPin, CalendarCheck, User, Home } from 'lucide-react';
import { format, addDays } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';

// Mock data for caregivers
const caregivers = {
  "1": {
    id: 1,
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.9,
    reviews: 124,
    location: "Brooklyn, NY",
    distance: "2.3 miles away",
    experience: "8 years",
    specialties: ["Dementia Care", "Meal Preparation", "Medication Management"],
    hourlyRate: 28,
    availability: "Weekdays, Evenings",
    bio: "I've been a dedicated caregiver for over 8 years, specializing in dementia care and medication management. My approach centers on creating a safe, engaging environment where seniors can maintain their dignity and enjoy a high quality of life. I believe in fostering genuine connections with those I care for, adapting to their unique needs and preferences.",
    education: "Certified Nursing Assistant (CNA), Dementia Care Specialist",
    languages: ["English", "Spanish"],
    verified: true
  },
  "2": {
    id: 2,
    name: "Michael Chen",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.7,
    reviews: 89,
    location: "Queens, NY",
    distance: "3.8 miles away",
    experience: "5 years",
    specialties: ["Alzheimer's Care", "Personal Care", "Companionship"],
    hourlyRate: 25,
    availability: "Weekends, Nights",
    bio: "With 5 years of experience in elder care, I specialize in Alzheimer's care and personal assistance. I'm committed to providing compassionate, patient-centered care that enhances the quality of life for seniors. I enjoy building meaningful relationships with my clients and their families, offering both professional support and genuine companionship.",
    education: "Home Health Aide Certification, Alzheimer's Care Training",
    languages: ["English", "Mandarin", "Cantonese"],
    verified: true
  },
  "3": {
    id: 3,
    name: "Elena Rodriguez",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.8,
    reviews: 156,
    location: "Manhattan, NY",
    distance: "1.5 miles away",
    experience: "10 years",
    specialties: ["Parkinson's Care", "Physical Therapy Support", "Health Monitoring"],
    hourlyRate: 32,
    availability: "Full-time",
    bio: "I bring a decade of experience in elder care, with specialized training in Parkinson's care and physical therapy support. My goal is to help seniors maintain their independence and dignity through personalized care plans that address their specific needs. I'm dedicated to providing not just physical assistance, but also emotional support and companionship.",
    education: "Licensed Practical Nurse (LPN), Physical Therapy Assistant Certification",
    languages: ["English", "Spanish"],
    verified: true
  },
  "4": {
    id: 4,
    name: "James Wilson",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.6,
    reviews: 78,
    location: "Bronx, NY",
    distance: "5.2 miles away",
    experience: "4 years",
    specialties: ["Post-Hospital Care", "Mobility Assistance", "Medication Management"],
    hourlyRate: 26,
    availability: "Mornings, Afternoons",
    bio: "Over my 4 years as a caregiver, I've developed expertise in post-hospital care and mobility assistance. I'm passionate about helping seniors recover and maintain their independence through personalized support. I take a holistic approach to caregiving, focusing on both physical needs and emotional well-being to ensure a positive, dignified aging experience.",
    education: "Certified Nursing Assistant (CNA), Post-Acute Care Certification",
    languages: ["English"],
    verified: true
  }
};

const timeSlots = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", 
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", 
  "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"
];

const CaregiverBooking = () => {
  const { caregiverId } = useParams<{ caregiverId: string }>();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [duration, setDuration] = useState<string>("2");
  const [careType, setCareType] = useState<string>("standard");
  
  if (!caregiverId || !caregivers[caregiverId as keyof typeof caregivers]) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-16">
          <h1 className="text-2xl font-bold">Caregiver not found</h1>
          <p className="mt-4">The caregiver you're looking for doesn't exist or has been removed.</p>
          <Link to="/caregivers" className="mt-6 inline-block">
            <Button>Browse Caregivers</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const caregiver = caregivers[caregiverId as keyof typeof caregivers];
  
  const handleBooking = () => {
    if (!date || !timeSlot) {
      toast({
        title: "Missing information",
        description: "Please select a date and time for your appointment.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, we would submit the booking to an API
    // For this demo, we'll navigate to the payment page
    navigate("/payment", { 
      state: { 
        caregiver,
        booking: {
          date: format(date, "MMMM d, yyyy"),
          time: timeSlot,
          duration: parseInt(duration),
          careType,
          total: calculateTotal()
        }
      } 
    });
  };
  
  const calculateTotal = () => {
    const hourlyRate = caregiver.hourlyRate;
    const hours = parseInt(duration);
    let multiplier = 1;
    
    // Apply multiplier based on care type
    if (careType === "premium") {
      multiplier = 1.25;
    } else if (careType === "basic") {
      multiplier = 0.9;
    }
    
    return (hourlyRate * hours * multiplier).toFixed(2);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-10 bg-eldercare-blueGray">
        <div className="container mx-auto px-4">
          <Link to="/caregivers" className="inline-flex items-center text-eldercare-blue mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Caregivers
          </Link>
          
          <h1 className="text-3xl font-bold mb-2">Book an Appointment with {caregiver.name}</h1>
          <p className="text-muted-foreground">Select your preferred date, time, and service details</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-eldercare-blue" />
                  Select Date & Time
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <Label className="mb-2 block">Select Date</Label>
                    <div className="border rounded-md p-4">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date()}
                        className="rounded-md border"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Select Time</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant={timeSlot === time ? "default" : "outline"}
                          className={`text-sm ${timeSlot === time ? 'bg-eldercare-blue' : ''}`}
                          onClick={() => setTimeSlot(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-eldercare-blue" />
                  Care Details
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="duration" className="mb-2 block">Session Duration</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger id="duration" className="w-full">
                        <SelectValue placeholder="Select hours" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="6">6 hours</SelectItem>
                        <SelectItem value="8">8 hours (Full day)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Care Type</Label>
                    <RadioGroup value={careType} onValueChange={setCareType} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className={`border rounded-lg p-4 cursor-pointer ${careType === 'basic' ? 'border-eldercare-blue bg-eldercare-lightBlue/20' : ''}`}>
                        <RadioGroupItem value="basic" id="basic" className="sr-only" />
                        <Label htmlFor="basic" className="cursor-pointer">
                          <div className="font-medium mb-1">Basic Care</div>
                          <div className="text-sm text-muted-foreground">Essential support services</div>
                          <div className="mt-2 text-sm text-eldercare-blue">10% discount</div>
                        </Label>
                      </div>
                      <div className={`border rounded-lg p-4 cursor-pointer ${careType === 'standard' ? 'border-eldercare-blue bg-eldercare-lightBlue/20' : ''}`}>
                        <RadioGroupItem value="standard" id="standard" className="sr-only" />
                        <Label htmlFor="standard" className="cursor-pointer">
                          <div className="font-medium mb-1">Standard Care</div>
                          <div className="text-sm text-muted-foreground">Comprehensive personal care</div>
                          <div className="mt-2 text-sm text-eldercare-blue">Regular price</div>
                        </Label>
                      </div>
                      <div className={`border rounded-lg p-4 cursor-pointer ${careType === 'premium' ? 'border-eldercare-blue bg-eldercare-lightBlue/20' : ''}`}>
                        <RadioGroupItem value="premium" id="premium" className="sr-only" />
                        <Label htmlFor="premium" className="cursor-pointer">
                          <div className="font-medium mb-1">Premium Care</div>
                          <div className="text-sm text-muted-foreground">Advanced specialized care</div>
                          <div className="mt-2 text-sm text-eldercare-blue">25% premium</div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label htmlFor="address" className="mb-2 block">Care Location</Label>
                    <div className="flex gap-4">
                      <div className="w-full">
                        <Input id="address" placeholder="Enter address for care" />
                      </div>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline" className="shrink-0">
                            <MapPin className="h-4 w-4 mr-2" />
                            Map
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[90vw] sm:w-[540px]">
                          <SheetHeader>
                            <SheetTitle>Select Location</SheetTitle>
                            <SheetDescription>
                              Choose the exact location where care will be provided.
                            </SheetDescription>
                          </SheetHeader>
                          <div className="mt-6 h-[70vh] bg-gray-100 rounded-md flex items-center justify-center">
                            <p className="text-muted-foreground text-center">
                              Map integration would be implemented here
                              <br />
                              (Google Maps, Mapbox, etc.)
                            </p>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="notes" className="mb-2 block">Special Instructions (Optional)</Label>
                    <textarea 
                      id="notes" 
                      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-eldercare-blue/20 min-h-[100px]"
                      placeholder="Any specific needs, preferences, or instructions for the caregiver..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={caregiver.image} 
                  alt={caregiver.name} 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{caregiver.name}</h3>
                  <div className="text-sm text-muted-foreground">{caregiver.experience} experience</div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{date ? format(date, "MMMM d, yyyy") : "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">{timeSlot || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{duration} hour{parseInt(duration) > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Care Type:</span>
                  <span className="font-medium capitalize">{careType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rate:</span>
                  <span className="font-medium">${caregiver.hourlyRate}/hour</span>
                </div>
                
                <Separator className="my-2" />
                
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span className="text-eldercare-blue">${calculateTotal()}</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6 bg-eldercare-blue hover:bg-blue-600"
                onClick={handleBooking}
              >
                Proceed to Payment
              </Button>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                By booking, you agree to our Terms of Service and Cancellation Policy
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CaregiverBooking;
