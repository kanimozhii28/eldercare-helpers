
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, Heart, Calendar, Clock, MapPin, Award, 
  Shield, FileText, MessageCircle, ChevronRight, Check
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import VoiceAssistant from '@/components/VoiceAssistant';

// Mock data for caregiver profile
const caregiverData = {
  id: "1",
  name: "Sarah Johnson",
  title: "Certified Nurse Assistant",
  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  rating: 4.9,
  reviews: 47,
  hourlyRate: 28,
  location: "San Francisco, CA",
  experience: 6,
  bio: "I've been a dedicated caregiver for over 6 years, specializing in elderly care. I'm passionate about providing compassionate support and improving the quality of life for seniors. I'm certified in First Aid, CPR, and have specialized training in dementia care.",
  specialties: ["Alzheimer's Care", "Mobility Assistance", "Meal Preparation", "Medication Management"],
  languages: ["English", "Spanish"],
  availability: {
    mon: ["Morning", "Afternoon"],
    tue: ["Morning", "Afternoon", "Evening"],
    wed: ["Morning", "Afternoon"],
    thu: ["Afternoon", "Evening"],
    fri: ["Morning", "Afternoon"],
    sat: ["Morning"],
    sun: []
  },
  certifications: [
    "Certified Nursing Assistant (CNA)",
    "CPR & First Aid",
    "Dementia Care Specialist",
    "Home Health Aide (HHA)"
  ],
  reviews: [
    {
      id: 1,
      user: "Jennifer H.",
      date: "April 15, 2023",
      rating: 5,
      comment: "Sarah was exceptional with my mother who has early-stage Alzheimer's. She was patient, kind, and incredibly attentive to her needs. My mother looks forward to her visits, which speaks volumes about Sarah's caregiving abilities."
    },
    {
      id: 2,
      user: "Robert M.",
      date: "March 3, 2023",
      rating: 5,
      comment: "We hired Sarah to help my father recover after his hip surgery. She was professional, punctual, and extremely knowledgeable. She helped with exercises, medication management, and was a wonderful companion to my father during his recovery."
    },
    {
      id: 3,
      user: "Linda K.",
      date: "February 18, 2023",
      rating: 4,
      comment: "Sarah provided excellent care for my aunt. She was reliable and showed genuine concern for her wellbeing. The only reason for 4 stars instead of 5 is that there were a couple of scheduling hiccups, but the care itself was outstanding."
    }
  ]
};

const CaregiverProfile = () => {
  const { caregiverId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // In a real app, we would fetch the caregiver data based on the ID
  // const caregiver = useCaregiverData(caregiverId);
  const caregiver = caregiverData;
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  const getAvailabilityLabel = (day, times) => {
    if (times.length === 0) return "Not Available";
    return times.join(", ");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar with caregiver info */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center mb-4">
                    <Avatar className="w-32 h-32 mb-4">
                      <AvatarImage src={caregiver.image} alt={caregiver.name} />
                      <AvatarFallback>{caregiver.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <h1 className="text-2xl font-bold">{caregiver.name}</h1>
                    <p className="text-muted-foreground">{caregiver.title}</p>
                    
                    <div className="flex items-center mt-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < Math.floor(caregiver.rating) 
                                ? 'text-yellow-400 fill-yellow-400' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm">
                        {caregiver.rating} ({caregiver.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hourly Rate</span>
                      <span className="font-semibold">${caregiver.hourlyRate}/hr</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location</span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-eldercare-blue" />
                        {caregiver.location}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Experience</span>
                      <span>{caregiver.experience} years</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Languages</span>
                      <span>{caregiver.languages.join(", ")}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <Link to={`/caregivers/booking/${caregiver.id}`}>
                      <Button className="w-full bg-eldercare-blue hover:bg-blue-600">
                        Book Now
                      </Button>
                    </Link>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={toggleFavorite}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                      {isFavorite ? "Saved to Favorites" : "Save to Favorites"}
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Availability</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Monday</span>
                      <span className="text-sm">
                        {getAvailabilityLabel("mon", caregiver.availability.mon)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Tuesday</span>
                      <span className="text-sm">
                        {getAvailabilityLabel("tue", caregiver.availability.tue)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Wednesday</span>
                      <span className="text-sm">
                        {getAvailabilityLabel("wed", caregiver.availability.wed)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Thursday</span>
                      <span className="text-sm">
                        {getAvailabilityLabel("thu", caregiver.availability.thu)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Friday</span>
                      <span className="text-sm">
                        {getAvailabilityLabel("fri", caregiver.availability.fri)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Saturday</span>
                      <span className="text-sm">
                        {getAvailabilityLabel("sat", caregiver.availability.sat)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Sunday</span>
                      <span className="text-sm">
                        {getAvailabilityLabel("sun", caregiver.availability.sun)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about">
              <TabsList className="w-full grid grid-cols-3 mb-8">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about">
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">About {caregiver.name}</h2>
                    <p className="mb-6">{caregiver.bio}</p>
                    
                    <h3 className="font-semibold mb-3">Certifications & Training</h3>
                    <ul className="space-y-2 mb-6">
                      {caregiver.certifications.map((cert, index) => (
                        <li key={index} className="flex items-start">
                          <Award className="w-5 h-5 text-eldercare-blue mr-2 flex-shrink-0" />
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <h3 className="font-semibold mb-3">Specialties</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {caregiver.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Why Choose Me</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <Shield className="w-5 h-5 text-eldercare-blue mr-2 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">Fully Vetted & Background Checked</h4>
                          <p className="text-sm text-muted-foreground">
                            I've undergone thorough background checks and verification.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <FileText className="w-5 h-5 text-eldercare-blue mr-2 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">Experienced Professional</h4>
                          <p className="text-sm text-muted-foreground">
                            Over 6 years of experience in senior and specialized care.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Check className="w-5 h-5 text-eldercare-blue mr-2 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">Personalized Care Approach</h4>
                          <p className="text-sm text-muted-foreground">
                            I tailor my care approach to each client's unique needs.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Clock className="w-5 h-5 text-eldercare-blue mr-2 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">Reliable & Punctual</h4>
                          <p className="text-sm text-muted-foreground">
                            You can count on me to be dependable and on time.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="services">
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Services I Provide</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Personal Care</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Bathing and grooming assistance</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Toileting and incontinence care</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Dressing assistance</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Mobility assistance</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Transfer assistance</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Health & Medication</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Medication reminders</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Vital signs monitoring</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Wound care (non-medical)</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Exercise assistance</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Medical appointment management</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Household Support</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Meal preparation</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Light housekeeping</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Laundry assistance</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Grocery shopping</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Errands and transportation</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Companionship</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Conversation and social engagement</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Cognitive stimulation activities</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Hobby and recreational activities</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Reading and mail assistance</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Emotional support</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-lg font-medium mb-3">Specialized Care Services</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Alzheimer's & Dementia Care</span>
                            <p className="text-sm text-muted-foreground mt-1">
                              Specialized care for those with memory impairments, including safety monitoring, 
                              redirection techniques, and memory-enhancing activities.
                            </p>
                          </div>
                        </li>
                        
                        <li className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Post-Surgery Recovery</span>
                            <p className="text-sm text-muted-foreground mt-1">
                              Support for seniors recovering from surgery, including medication management, 
                              wound care monitoring, and assistance with prescribed exercises.
                            </p>
                          </div>
                        </li>
                        
                        <li className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Respite Care</span>
                            <p className="text-sm text-muted-foreground mt-1">
                              Temporary relief for family caregivers, providing them with breaks while ensuring 
                              their loved ones receive continued quality care.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="text-center">
                  <Link to={`/caregivers/booking/${caregiver.id}`}>
                    <Button className="bg-eldercare-blue hover:bg-blue-600">
                      Book {caregiver.name} Now
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Reviews</h2>
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-5 h-5 ${
                                i < Math.floor(caregiver.rating) 
                                  ? 'text-yellow-400 fill-yellow-400' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="ml-2">
                          {caregiver.rating} ({caregiver.reviews} reviews)
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {caregiver.reviews.map(review => (
                        <div key={review.id} className="pb-6 border-b last:border-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">{review.user}</h4>
                              <p className="text-sm text-muted-foreground">{review.date}</p>
                            </div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${
                                    i < review.rating 
                                      ? 'text-yellow-400 fill-yellow-400' 
                                      : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p>{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <VoiceAssistant />
      <Footer />
    </div>
  );
};

export default CaregiverProfile;
