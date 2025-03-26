
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Phone, Mail, User, Edit, Heart, X, CheckCircle, AlertCircle, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

// Define caregiver type with id
interface Caregiver {
  id: number;
  name: string;
  image: string;
  rating?: number;
  specialties?: string[];
  location?: string;
  hourlyRate?: number;
  reviews?: number;
}

const Profile = () => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  
  // Mock data for the profile
  const [profile, setProfile] = useState({
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    profileImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  });
  
  // Mock data for bookings
  const [bookings, setBookings] = useState([
    {
      id: 1,
      caregiverName: "Sarah Johnson",
      caregiverImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      date: "May 22, 2023",
      time: "2:00 PM",
      duration: 3,
      service: "Personal Care",
      status: "completed",
      reviewed: true
    },
    {
      id: 2,
      caregiverName: "Michael Chen",
      caregiverImage: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      date: "June 5, 2023",
      time: "10:00 AM",
      duration: 2,
      service: "Medication Management",
      status: "completed",
      reviewed: false
    },
    {
      id: 3,
      caregiverName: "Elena Rodriguez",
      caregiverImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      date: "June 15, 2023",
      time: "9:00 AM",
      duration: 4,
      service: "Companion Care",
      status: "upcoming",
      reviewed: false
    }
  ]);
  
  // Mock data for favorite caregivers
  const [favorites, setFavorites] = useState<Caregiver[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      rating: 4.9,
      specialties: ["Dementia Care", "Meal Preparation"],
      location: "Brooklyn, NY",
      hourlyRate: 28,
      reviews: 124
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      rating: 4.8,
      specialties: ["Parkinson's Care", "Physical Therapy Support"],
      location: "Manhattan, NY",
      hourlyRate: 32,
      reviews: 156
    }
  ]);
  
  const form = useForm({
    defaultValues: profile
  });
  
  const onSubmit = (data) => {
    setProfile(data);
    setEditMode(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been successfully updated."
    });
  };
  
  const removeFavorite = (caregiverId) => {
    setFavorites(favorites.filter(fav => fav.id !== caregiverId));
    toast({
      title: "Removed from favorites",
      description: "Caregiver has been removed from your favorites."
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">My Profile</h1>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/3 flex flex-col items-center">
                      <Avatar className="w-32 h-32">
                        <AvatarImage src={profile.profileImage} />
                        <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      {!editMode && (
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => setEditMode(true)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Profile
                        </Button>
                      )}
                    </div>
                    
                    <div className="w-full md:w-2/3">
                      {editMode ? (
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="email" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Address</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="flex gap-4">
                              <Button type="submit" className="bg-eldercare-blue hover:bg-blue-600">
                                Save Changes
                              </Button>
                              <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => setEditMode(false)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </form>
                        </Form>
                      ) : (
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl font-semibold mb-6">{profile.name}</h2>
                            
                            <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-gray-500" />
                                <span>{profile.email}</span>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-gray-500" />
                                <span>{profile.phone}</span>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-gray-500" />
                                <span>{profile.address}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-medium mb-3">Account Information</h3>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Member Since</span>
                                <span>January 2023</span>
                              </div>
                              
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Payment Method</span>
                                <span>Visa ending in 4242</span>
                              </div>
                              
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Plan</span>
                                <Badge>Standard</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bookings">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Your Bookings</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">All</Button>
                    <Button variant="outline" size="sm" className="bg-eldercare-lightBlue text-eldercare-blue">Upcoming</Button>
                    <Button variant="outline" size="sm">Completed</Button>
                  </div>
                </div>
                
                {bookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div className="flex gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={booking.caregiverImage} />
                            <AvatarFallback>{booking.caregiverName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          
                          <div>
                            <h3 className="font-semibold text-lg">{booking.caregiverName}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{booking.service}</p>
                            
                            <div className="flex flex-wrap gap-4 text-sm">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                                <span>{booking.date}</span>
                              </div>
                              
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1 text-gray-500" />
                                <span>{booking.time} ({booking.duration} hours)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col justify-between items-end">
                          <Badge 
                            className={
                              booking.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }
                          >
                            {booking.status === 'completed' ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <AlertCircle className="h-3 w-3 mr-1" />
                            )}
                            {booking.status === 'completed' ? 'Completed' : 'Upcoming'}
                          </Badge>
                          
                          <div className="mt-4">
                            {booking.status === 'upcoming' ? (
                              <Button className="bg-eldercare-blue hover:bg-blue-600" size="sm">
                                View Details
                              </Button>
                            ) : booking.reviewed ? (
                              <Button variant="outline" size="sm" disabled>
                                Reviewed
                              </Button>
                            ) : (
                              <Link to="/review-booking" state={{ 
                                caregiver: { 
                                  name: booking.caregiverName, 
                                  image: booking.caregiverImage 
                                }, 
                                booking: {
                                  date: booking.date,
                                  time: booking.time,
                                  duration: booking.duration
                                }
                              }}>
                                <Button className="bg-eldercare-blue hover:bg-blue-600" size="sm">
                                  Leave Review
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="favorites">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Your Favorite Caregivers</h2>
                
                {favorites.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favorites.map((caregiver) => (
                      <Card key={caregiver.id}>
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <Avatar className="w-16 h-16">
                              <AvatarImage src={caregiver.image} />
                              <AvatarFallback>{caregiver.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-grow">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold">{caregiver.name}</h3>
                                  <div className="flex items-center text-sm">
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                                    <span>{caregiver.rating}</span>
                                    <span className="text-muted-foreground ml-1">({caregiver.reviews})</span>
                                  </div>
                                </div>
                                
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0" 
                                  onClick={() => removeFavorite(caregiver.id)}
                                >
                                  <X className="h-4 w-4 text-gray-500" />
                                </Button>
                              </div>
                              
                              <div className="flex items-center text-sm mt-1">
                                <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                                <span>{caregiver.location}</span>
                              </div>
                              
                              {caregiver.specialties && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {caregiver.specialties.map((specialty, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {specialty}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              
                              <div className="flex justify-between items-center mt-3">
                                <span className="font-semibold">${caregiver.hourlyRate}/hr</span>
                                <Link to={`/caregivers/booking/${caregiver.id}`}>
                                  <Button size="sm" className="bg-eldercare-blue hover:bg-blue-600">
                                    Book Now
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Heart className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                      <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
                      <p className="text-muted-foreground mb-4">
                        You haven't added any caregivers to your favorites list.
                      </p>
                      <Link to="/caregivers">
                        <Button className="bg-eldercare-blue hover:bg-blue-600">
                          Browse Caregivers
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
