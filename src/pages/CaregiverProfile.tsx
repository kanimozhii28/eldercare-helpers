
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, Calendar, Shield, Check, Heart, BookOpen, Clipboard, MessageSquare } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const CaregiverProfile = () => {
  const { caregiverId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Mock data for demo purposes
  const caregiver = {
    id: caregiverId,
    name: "Sarah Johnson",
    title: "Certified Nursing Assistant",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.8,
    reviews: 124,
    location: "San Francisco, CA",
    distance: "3.2 miles away",
    hourlyRate: 28,
    experience: 5,
    availability: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      hours: "9:00 AM - 5:00 PM"
    },
    specialties: ["Alzheimer's Care", "Parkinson's Care", "Medication Management", "Mobility Assistance"],
    languages: ["English", "Spanish"],
    certifications: ["Certified Nursing Assistant (CNA)", "CPR Certified", "First Aid Certified"],
    bio: "I've been a dedicated caregiver for over 5 years, specializing in elderly care. My approach combines professional expertise with genuine compassion. I believe in creating a supportive environment that promotes independence while ensuring safety and comfort. My experience includes working with clients who have various conditions including Alzheimer's, Parkinson's, and post-surgery recovery. I'm committed to providing personalized care that enhances quality of life.",
    services: [
      {
        name: "Personal Care",
        description: "Assistance with bathing, dressing, grooming, and other personal hygiene needs."
      },
      {
        name: "Medication Management",
        description: "Reminders to take medications as prescribed and assistance with organizing medications."
      },
      {
        name: "Mobility Assistance",
        description: "Help with walking, transferring, and positioning to prevent falls and injuries."
      },
      {
        name: "Companionship",
        description: "Engaging conversation, shared activities, and emotional support."
      },
      {
        name: "Light Housekeeping",
        description: "Maintaining a clean and safe environment, including laundry and meal preparation."
      }
    ]
  };

  const reviews = [
    {
      id: 1,
      user: "Michael P.",
      date: "March 15, 2023",
      rating: 5,
      comment: "Sarah was amazing with my mother who has Alzheimer's. She was patient, kind, and very professional. My mother felt comfortable with her right away. Highly recommend!"
    },
    {
      id: 2,
      user: "Jennifer R.",
      date: "February 8, 2023",
      rating: 5,
      comment: "We hired Sarah to help my father after his hip surgery. She was knowledgeable about post-surgery care and made sure he was comfortable and taking his medications on time. She also kept our family updated on his progress."
    },
    {
      id: 3,
      user: "David L.",
      date: "January 22, 2023",
      rating: 4,
      comment: "Sarah provided excellent care for my aunt. She was always on time and very attentive. The only reason I'm giving 4 stars instead of 5 is because there were a couple of communication hiccups, but nothing major."
    }
  ];

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? "This caregiver has been removed from your favorites." : "This caregiver has been added to your favorites.",
    });
  };

  const handleBookNow = () => {
    navigate(`/caregivers/booking/${caregiverId}`, { state: { caregiver } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-10 bg-eldercare-blueGray">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/caregivers" className="hover:text-foreground transition-colors">
              Caregivers
            </Link>
            <span>/</span>
            <span>{caregiver.name}</span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-white shadow-md flex-shrink-0">
              <img 
                src={caregiver.image} 
                alt={caregiver.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl md:text-3xl font-bold">{caregiver.name}</h1>
                <Badge variant="outline" className="bg-eldercare-lightBlue text-eldercare-blue">
                  Verified
                </Badge>
              </div>
              
              <p className="text-lg text-muted-foreground mb-3">{caregiver.title}</p>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1 fill-yellow-400" />
                  <span className="font-medium">{caregiver.rating}</span>
                  <span className="text-muted-foreground ml-1">({caregiver.reviews} reviews)</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-eldercare-blue mr-1" />
                  <span>{caregiver.distance}</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-eldercare-blue mr-1" />
                  <span>{caregiver.experience} years experience</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <Button 
                onClick={handleBookNow}
                className="w-full md:w-auto bg-eldercare-blue hover:bg-blue-600"
              >
                Book Now
              </Button>
              
              <Button 
                variant="outline" 
                className={`w-full md:w-auto ${isFavorite ? 'text-pink-500 border-pink-500 hover:bg-pink-50' : ''}`}
                onClick={handleFavorite}
              >
                <Heart className={`mr-2 h-4 w-4 ${isFavorite ? 'fill-pink-500' : ''}`} />
                {isFavorite ? 'Favorited' : 'Add to Favorites'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Hourly Rate</h3>
                <p className="text-3xl font-bold mb-1">${caregiver.hourlyRate}</p>
                <p className="text-sm text-muted-foreground">per hour</p>
                
                <Separator className="my-4" />
                
                <h3 className="font-semibold mb-3">Availability</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-eldercare-blue mt-1" />
                    <div>
                      <p className="font-medium">Days</p>
                      <p className="text-sm text-muted-foreground">{caregiver.availability.days.join(", ")}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-eldercare-blue mt-1" />
                    <div>
                      <p className="font-medium">Hours</p>
                      <p className="text-sm text-muted-foreground">{caregiver.availability.hours}</p>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="font-semibold mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {caregiver.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="bg-eldercare-warmGray/10">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="font-semibold mb-3">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {caregiver.languages.map((language, index) => (
                    <Badge key={index} variant="outline" className="bg-eldercare-blueGray/10">
                      {language}
                    </Badge>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="font-semibold mb-3">Certifications</h3>
                <div className="space-y-2">
                  {caregiver.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-eldercare-blue" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Contact Information</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Contact information is only visible after booking a service.
                </p>
                
                <Button className="w-full" onClick={handleBookNow}>
                  Book to View Contact
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about">
              <TabsList className="mb-6">
                <TabsTrigger value="about" className="data-[state=active]:bg-eldercare-blue data-[state=active]:text-white">
                  About
                </TabsTrigger>
                <TabsTrigger value="services" className="data-[state=active]:bg-eldercare-blue data-[state=active]:text-white">
                  Services
                </TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-eldercare-blue data-[state=active]:text-white">
                  Reviews
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">About {caregiver.name}</h3>
                    <p className="text-muted-foreground mb-6 whitespace-pre-line">
                      {caregiver.bio}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="bg-eldercare-lightBlue/20 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-eldercare-blue/10 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-eldercare-blue" />
                          </div>
                          <div className="font-medium">Background Checked</div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Comprehensive background checks conducted for your safety.
                        </p>
                      </div>
                      
                      <div className="bg-eldercare-lightBlue/20 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-eldercare-blue/10 flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-eldercare-blue" />
                          </div>
                          <div className="font-medium">Professionally Trained</div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Completed extensive training in elderly care and medical assistance.
                        </p>
                      </div>
                    </div>
                    
                    <Button className="w-full md:w-auto" onClick={handleBookNow}>
                      Book a Session
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="services" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Services Offered</h3>
                    <p className="text-muted-foreground mb-6">
                      {caregiver.name} offers the following services to help your loved ones maintain 
                      independence, comfort, and quality of life.
                    </p>
                    
                    <div className="space-y-4 mb-6">
                      {caregiver.services.map((service, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-eldercare-lightBlue/40 flex items-center justify-center">
                              <Check className="w-4 h-4 text-eldercare-blue" />
                            </div>
                            <h4 className="font-medium">{service.name}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground pl-11">
                            {service.description}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-eldercare-blueGray/20 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-eldercare-blue/10 flex items-center justify-center">
                          <Clipboard className="w-5 h-5 text-eldercare-blue" />
                        </div>
                        <div className="font-medium">Customized Care Plans</div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {caregiver.name} works with clients to develop personalized care plans that address 
                        specific needs and preferences. Please discuss any special requirements during booking.
                      </p>
                    </div>
                    
                    <Button className="w-full md:w-auto" onClick={handleBookNow}>
                      Book a Service
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold">Client Reviews</h3>
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="font-bold mr-1">{caregiver.rating}</span>
                        <span className="text-muted-foreground">({caregiver.reviews} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="space-y-6 mb-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium">{review.user}</div>
                            <div className="text-sm text-muted-foreground">{review.date}</div>
                          </div>
                          <div className="flex mb-2">
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
                          <p className="text-muted-foreground text-sm">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <Button className="w-full sm:w-auto" onClick={handleBookNow}>
                        Book with {caregiver.name}
                      </Button>
                      
                      <Button variant="outline" className="w-full sm:w-auto">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Ask a Question
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CaregiverProfile;
