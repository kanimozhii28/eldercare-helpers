
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import AuthNavbar from '@/components/AuthNavbar';
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
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

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

interface ProfileData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_number: string | null;
  emergency_contact: string | null;
  date_of_birth: string | null;
  gender: string | null;
  height: string | null;
  weight: string | null;
  blood_group: string | null;
  address: string | null;
  health_condition: string | null;
  under_treatment: boolean | null;
}

const Profile = () => {
  const { toast } = useToast();
  const { user, updateProfile } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  
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

  const form = useForm<ProfileData>({
    defaultValues: profile || {}
  });

  // Fetch user profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          if (error) throw error;
          
          if (data) {
            // Combine profile data with user email from auth
            const profileData = {
              ...data,
              email: user.email
            };
            
            setProfile(profileData);
            form.reset(profileData);
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
          toast({
            title: "Error fetching profile",
            description: "There was a problem fetching your profile data.",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfileData();
  }, [user, form, toast]);
  
  const onSubmit = async (data: ProfileData) => {
    try {
      const { email, ...profileData } = data;
      await updateProfile(profileData);
      setProfile(data);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  const removeFavorite = (caregiverId: number) => {
    setFavorites(favorites.filter(fav => fav.id !== caregiverId));
    toast({
      title: "Removed from favorites",
      description: "Caregiver has been removed from your favorites."
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AuthNavbar />
        <div className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <p>Loading profile data...</p>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <AuthNavbar />
      
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
                        <AvatarImage src="" />
                        <AvatarFallback>
                          {profile?.first_name?.charAt(0)}{profile?.last_name?.charAt(0)}
                        </AvatarFallback>
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
                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="first_name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                      <Input {...field} value={field.value || ''} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="last_name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                      <Input {...field} value={field.value || ''} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="email" value={field.value || ''} disabled />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="phone_number"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                      <Input {...field} value={field.value || ''} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="emergency_contact"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Emergency Contact</FormLabel>
                                    <FormControl>
                                      <Input {...field} value={field.value || ''} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <FormField
                              control={form.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Address</FormLabel>
                                  <FormControl>
                                    <Textarea {...field} value={field.value || ''} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="grid grid-cols-3 gap-4">
                              <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                    <Select 
                                      value={field.value || ''} 
                                      onValueChange={field.onChange}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="height"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Height (cm)</FormLabel>
                                    <FormControl>
                                      <Input {...field} value={field.value || ''} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="weight"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Weight (kg)</FormLabel>
                                    <FormControl>
                                      <Input {...field} value={field.value || ''} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="blood_group"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Blood Group</FormLabel>
                                    <Select 
                                      value={field.value || ''} 
                                      onValueChange={field.onChange}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select blood group" />
                                        </SelectTrigger>
                                      </FormControl>
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
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="under_treatment"
                                render={({ field }) => (
                                  <FormItem className="space-y-3">
                                    <FormLabel>Under Treatment?</FormLabel>
                                    <FormControl>
                                      <RadioGroup
                                        onValueChange={(value) => field.onChange(value === 'true')}
                                        defaultValue={field.value ? 'true' : 'false'}
                                        className="flex flex-col space-y-1"
                                      >
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem value="true" id="r1" />
                                          <Label htmlFor="r1">Yes</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem value="false" id="r2" />
                                          <Label htmlFor="r2">No</Label>
                                        </div>
                                      </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <FormField
                              control={form.control}
                              name="health_condition"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Health Conditions</FormLabel>
                                  <FormControl>
                                    <Textarea {...field} value={field.value || ''} />
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
                                onClick={() => {
                                  setEditMode(false);
                                  form.reset(profile || {});
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </form>
                        </Form>
                      ) : (
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl font-semibold mb-6">
                              {profile?.first_name} {profile?.last_name}
                            </h2>
                            
                            <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-gray-500" />
                                <span>{profile?.email}</span>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-gray-500" />
                                <span>{profile?.phone_number || 'Not provided'}</span>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-gray-500" />
                                <span>{profile?.address || 'Not provided'}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-medium mb-3">Medical Information</h3>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <p className="text-muted-foreground">Gender</p>
                                <p>{profile?.gender || 'Not provided'}</p>
                              </div>
                              
                              <div className="space-y-2">
                                <p className="text-muted-foreground">Blood Group</p>
                                <p>{profile?.blood_group || 'Not provided'}</p>
                              </div>
                              
                              <div className="space-y-2">
                                <p className="text-muted-foreground">Height</p>
                                <p>{profile?.height ? `${profile.height} cm` : 'Not provided'}</p>
                              </div>
                              
                              <div className="space-y-2">
                                <p className="text-muted-foreground">Weight</p>
                                <p>{profile?.weight ? `${profile.weight} kg` : 'Not provided'}</p>
                              </div>
                              
                              <div className="space-y-2">
                                <p className="text-muted-foreground">Under Treatment</p>
                                <p>{profile?.under_treatment ? 'Yes' : 'No'}</p>
                              </div>
                              
                              <div className="space-y-2">
                                <p className="text-muted-foreground">Emergency Contact</p>
                                <p>{profile?.emergency_contact || 'Not provided'}</p>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <p className="text-muted-foreground">Health Conditions</p>
                              <p className="mt-1">{profile?.health_condition || 'None specified'}</p>
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
