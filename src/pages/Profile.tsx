
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, Settings, Heart, Calendar, Clock, MapPin, ChevronRight,
  Edit, LogOut, CreditCard, Shield, Bell, Star, CheckCircle, ArrowRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("bookings");
  
  // Mock data for user profile
  const user = {
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, San Francisco, CA 94105",
    image: null,
    memberSince: "January 2023"
  };
  
  // Mock data for bookings
  const bookings = [
    {
      id: 1,
      caregiver: {
        name: "Sarah Johnson",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        rating: 4.8
      },
      date: "May 22, 2023",
      time: "2:00 PM",
      duration: 3,
      careType: "Standard Care",
      status: "upcoming",
      total: "$84.00"
    },
    {
      id: 2,
      caregiver: {
        name: "Michael Chen",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        rating: 4.6
      },
      date: "May 15, 2023",
      time: "10:00 AM",
      duration: 4,
      careType: "Premium Care",
      status: "completed",
      total: "$140.00"
    },
    {
      id: 3,
      caregiver: {
        name: "Lisa Rodriguez",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        rating: 4.9
      },
      date: "May 10, 2023",
      time: "1:00 PM",
      duration: 2,
      careType: "Standard Care",
      status: "completed",
      total: "$56.00"
    }
  ];
  
  // Mock data for favorite caregivers
  const favoritesCaregivers = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Certified Nursing Assistant",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      rating: 4.8,
      hourlyRate: 28,
      specialties: ["Alzheimer's Care", "Medication Management"]
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Home Health Aide",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      rating: 4.6,
      hourlyRate: 25,
      specialties: ["Mobility Assistance", "Personal Care"]
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      title: "Registered Nurse",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      rating: 4.9,
      hourlyRate: 35,
      specialties: ["Post-Hospital Care", "Specialized Care"]
    }
  ];
  
  const handleViewCaregiver = (caregiverId) => {
    navigate(`/caregivers/${caregiverId}`);
  };
  
  const handleBookAgain = (caregiverId) => {
    navigate(`/caregivers/booking/${caregiverId}`);
  };
  
  const handleRemoveFavorite = (caregiverId) => {
    toast({
      title: "Removed from favorites",
      description: "The caregiver has been removed from your favorites."
    });
  };
  
  const handleTrackCaregivers = (bookingId) => {
    // Simulate finding the booking and navigating to tracking
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      navigate('/live-tracking', { state: { caregiver: booking.caregiver, booking: { 
        date: booking.date,
        time: booking.time,
        duration: booking.duration,
        careType: booking.careType,
        total: booking.total.replace('$', '')
      }}});
    }
  };
  
  const handleReviewBooking = (bookingId) => {
    // Simulate finding the booking and navigating to review
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      navigate('/review-booking', { state: { caregiver: booking.caregiver, booking: { 
        date: booking.date,
        time: booking.time,
        duration: booking.duration
      }}});
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusBadge = (status) => {
    return (
      <Badge className={`${getStatusColor(status)} capitalize`}>
        {status}
      </Badge>
    );
  };
  
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-10 bg-eldercare-blueGray">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your account and bookings</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar / User Profile */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col items-center mb-4">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={user.image} />
                    <AvatarFallback className="bg-eldercare-blue text-white text-xl">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">Member since {user.memberSince}</p>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-3 text-eldercare-blue" />
                      <span className="font-medium">Profile</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setActiveTab("bookings")}
                  >
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-3 text-eldercare-blue" />
                      <span className="font-medium">My Bookings</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setActiveTab("favorites")}
                  >
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-3 text-eldercare-blue" />
                      <span className="font-medium">Favorites</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-3 text-eldercare-blue" />
                      <span className="font-medium">Payment Methods</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bell className="h-4 w-4 mr-3 text-eldercare-blue" />
                      <span className="font-medium">Notifications</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Settings className="h-4 w-4 mr-3 text-eldercare-blue" />
                      <span className="font-medium">Account Settings</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <Button variant="outline" className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Shield className="h-5 w-5 mr-2 text-eldercare-blue" />
                  <h3 className="font-semibold">Need Help?</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Our customer support team is available 24/7 to assist you with any questions or concerns.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger 
                  value="bookings" 
                  className="data-[state=active]:bg-eldercare-blue data-[state=active]:text-white"
                >
                  My Bookings
                </TabsTrigger>
                <TabsTrigger 
                  value="favorites" 
                  className="data-[state=active]:bg-eldercare-blue data-[state=active]:text-white"
                >
                  Favorites
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="data-[state=active]:bg-eldercare-blue data-[state=active]:text-white"
                >
                  Profile Settings
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="bookings" className="mt-0">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">My Bookings</h2>
                    <Button 
                      onClick={() => navigate('/caregivers')}
                      className="bg-eldercare-blue hover:bg-blue-600"
                    >
                      Book New Service
                    </Button>
                  </div>
                  
                  {bookings.length > 0 ? (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <Card key={booking.id}>
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <img 
                                  src={booking.caregiver.image} 
                                  alt={booking.caregiver.name} 
                                  className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                  <div className="flex items-center mb-1">
                                    <h3 className="font-semibold">{booking.caregiver.name}</h3>
                                    <div className="flex items-center ml-2">
                                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                      <span className="text-sm ml-1">{booking.caregiver.rating}</span>
                                    </div>
                                  </div>
                                  <div className="text-sm text-muted-foreground mb-1">
                                    {booking.careType}
                                  </div>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    <span className="mr-3">{booking.date}</span>
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>{booking.time} ({booking.duration} hours)</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex flex-col items-end">
                                {getStatusBadge(booking.status)}
                                <div className="font-bold mt-2">{booking.total}</div>
                                <div className="flex gap-2 mt-3">
                                  {booking.status === 'upcoming' && (
                                    <Button 
                                      size="sm" 
                                      className="bg-eldercare-blue hover:bg-blue-600"
                                      onClick={() => handleTrackCaregivers(booking.id)}
                                    >
                                      Track
                                    </Button>
                                  )}
                                  
                                  {booking.status === 'completed' && (
                                    <Button 
                                      size="sm" 
                                      onClick={() => handleReviewBooking(booking.id)}
                                      variant="outline"
                                    >
                                      Leave Review
                                    </Button>
                                  )}
                                  
                                  <Button 
                                    size="sm" 
                                    variant={booking.status === 'completed' ? "default" : "outline"}
                                    className={booking.status === 'completed' ? "bg-eldercare-blue hover:bg-blue-600" : ""}
                                    onClick={() => handleBookAgain(booking.caregiver.id)}
                                  >
                                    Book Again
                                  </Button>
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
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-eldercare-lightBlue flex items-center justify-center">
                          <Calendar className="w-8 h-8 text-eldercare-blue" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
                        <p className="text-muted-foreground mb-4">
                          You haven't made any bookings yet. Start by browsing our available caregivers.
                        </p>
                        <Button 
                          onClick={() => navigate('/caregivers')}
                          className="bg-eldercare-blue hover:bg-blue-600"
                        >
                          Find Caregivers
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="favorites" className="mt-0">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Favorite Caregivers</h2>
                    <Button 
                      onClick={() => navigate('/caregivers')}
                      variant="outline"
                    >
                      Browse Caregivers
                    </Button>
                  </div>
                  
                  {favoritesCaregivers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {favoritesCaregivers.map((caregiver) => (
                        <Card key={caregiver.id} className="hover:border-eldercare-blue transition-colors">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <img 
                                src={caregiver.image} 
                                alt={caregiver.name} 
                                className="w-20 h-20 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex items-center mb-1">
                                  <h3 className="font-semibold">{caregiver.name}</h3>
                                  <div className="flex items-center ml-2">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    <span className="text-sm ml-1">{caregiver.rating}</span>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-1">
                                  {caregiver.title}
                                </p>
                                <p className="text-sm font-medium mb-2">
                                  ${caregiver.hourlyRate}/hour
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {caregiver.specialties.map((specialty, index) => (
                                    <Badge 
                                      key={index} 
                                      variant="outline"
                                      className="text-xs bg-eldercare-warmGray/10"
                                    >
                                      {specialty}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="flex gap-2">
                                  <Button 
                                    size="sm" 
                                    className="bg-eldercare-blue hover:bg-blue-600"
                                    onClick={() => handleBookAgain(caregiver.id)}
                                  >
                                    Book
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleViewCaregiver(caregiver.id)}
                                  >
                                    View Profile
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost"
                                    className="p-0 h-8 w-8"
                                    onClick={() => handleRemoveFavorite(caregiver.id)}
                                  >
                                    <Heart className="h-4 w-4 text-pink-500 fill-pink-500" />
                                  </Button>
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
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-eldercare-lightBlue flex items-center justify-center">
                          <Heart className="w-8 h-8 text-eldercare-blue" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                        <p className="text-muted-foreground mb-4">
                          You haven't added any caregivers to your favorites list yet.
                        </p>
                        <Button 
                          onClick={() => navigate('/caregivers')}
                          className="bg-eldercare-blue hover:bg-blue-600"
                        >
                          Browse Caregivers
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
                    
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={user.image} />
                          <AvatarFallback className="bg-eldercare-blue text-white text-xl">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <Button size="sm" variant="outline">
                            <Edit className="mr-2 h-4 w-4" />
                            Change Photo
                          </Button>
                          <p className="text-xs text-muted-foreground mt-2">
                            JPG, GIF or PNG. Max size 1MB.
                          </p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Full Name</label>
                          <div className="flex items-center justify-between border rounded-md p-2">
                            <span>{user.name}</span>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">Email Address</label>
                          <div className="flex items-center justify-between border rounded-md p-2">
                            <span>{user.email}</span>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">Phone Number</label>
                          <div className="flex items-center justify-between border rounded-md p-2">
                            <span>{user.phone}</span>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">Address</label>
                          <div className="flex items-center justify-between border rounded-md p-2">
                            <span>{user.address}</span>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium mb-4">Password & Security</h3>
                        <Button variant="outline">
                          Change Password
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium mb-4">Notification Preferences</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">Email Notifications</div>
                              <div className="text-sm text-muted-foreground">
                                Receive booking updates and promotions via email
                              </div>
                            </div>
                            <div className="w-12 h-6 rounded-full bg-eldercare-blue relative cursor-pointer">
                              <div className="absolute right-1 top-1 bg-white rounded-full h-4 w-4"></div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">SMS Notifications</div>
                              <div className="text-sm text-muted-foreground">
                                Receive booking updates and alerts via text message
                              </div>
                            </div>
                            <div className="w-12 h-6 rounded-full bg-eldercare-blue relative cursor-pointer">
                              <div className="absolute right-1 top-1 bg-white rounded-full h-4 w-4"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="bg-eldercare-blue hover:bg-blue-600">
                        Save Changes
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

// Define Shield component since it's not imported from lucide-react
const Shield = ({ className = "", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export default Profile;
