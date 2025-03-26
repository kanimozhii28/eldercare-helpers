
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Settings, LogOut, Heart, Clock, Calendar, 
  MapPin, ChevronRight, Star, MessageSquare, Edit, ShieldCheck
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  
  // Mock data for profile
  const userProfile = {
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, CA 12345",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  };
  
  // Mock data for bookings
  const bookings = [
    {
      id: "booking1",
      caregiver: {
        name: "Sarah Johnson",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      service: "Personal Care",
      date: "May 22, 2023",
      time: "2:00 PM",
      duration: 3,
      status: "completed",
      reviewed: true
    },
    {
      id: "booking2",
      caregiver: {
        name: "Michael Chen",
        image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      service: "Companion Care",
      date: "May 28, 2023",
      time: "10:00 AM",
      duration: 4,
      status: "upcoming",
      reviewed: false
    },
    {
      id: "booking3",
      caregiver: {
        name: "Lisa Rodriguez",
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      service: "Respite Care",
      date: "Jun 05, 2023",
      time: "1:00 PM",
      duration: 2,
      status: "active",
      reviewed: false
    }
  ];
  
  // Mock data for favorite caregivers
  const favoriteCaregivers = [
    {
      id: "caregiver1",
      name: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      rating: 4.8,
      specialty: "Alzheimer's Care"
    },
    {
      id: "caregiver2",
      name: "Michael Chen",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      rating: 4.7,
      specialty: "Physical Therapy"
    },
    {
      id: "caregiver3",
      name: "Lisa Rodriguez",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      rating: 4.9,
      specialty: "Companion Care"
    }
  ];
  
  // Mock data for notifications
  const notifications = [
    {
      id: "notif1",
      message: "Your booking with Sarah Johnson is confirmed for May 22, 2023",
      time: "2 days ago",
      read: false
    },
    {
      id: "notif2",
      message: "Michael Chen sent you a message about your upcoming appointment",
      time: "3 days ago",
      read: true
    },
    {
      id: "notif3",
      message: "You have a new care plan recommendation",
      time: "5 days ago",
      read: true
    }
  ];
  
  const handleViewTracking = (bookingId) => {
    navigate('/live-tracking', { state: { bookingId } });
  };
  
  const handleWriteReview = (booking) => {
    navigate('/review-booking', { state: { caregiver: booking.caregiver, booking: { date: booking.date, time: booking.time, duration: booking.duration } } });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-10 bg-eldercare-blueGray">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="w-24 h-24 border-4 border-white shadow-md">
              <AvatarImage src={userProfile.image} alt={userProfile.name} />
              <AvatarFallback>{userProfile.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{userProfile.name}</h1>
              <p className="text-muted-foreground mb-4">{userProfile.email}</p>
              
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Edit Profile
                </Button>
                
                <Button variant="outline" size="sm" className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="bookings" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="bookings" className="text-sm">Bookings</TabsTrigger>
            <TabsTrigger value="favorites" className="text-sm">Favorites</TabsTrigger>
            <TabsTrigger value="notifications" className="text-sm">Notifications</TabsTrigger>
            <TabsTrigger value="account" className="text-sm">Account</TabsTrigger>
          </TabsList>
          
          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Bookings</h2>
              <Button variant="outline" size="sm" onClick={() => navigate('/caregivers')}>
                Book New Session
              </Button>
            </div>
            
            {bookings.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
                  <p className="text-muted-foreground text-center mb-6">
                    You haven't booked any caregiving sessions yet. Find a caregiver to get started.
                  </p>
                  <Button onClick={() => navigate('/caregivers')}>
                    Find a Caregiver
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                        <div className="flex gap-4 items-center">
                          <Avatar className="w-12 h-12 border-2 border-eldercare-lightBlue">
                            <AvatarImage src={booking.caregiver.image} alt={booking.caregiver.name} />
                            <AvatarFallback>{booking.caregiver.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          
                          <div>
                            <h3 className="font-medium">{booking.caregiver.name}</h3>
                            <p className="text-sm text-muted-foreground">{booking.service}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 items-center">
                          {booking.status === 'upcoming' && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                              Upcoming
                            </Badge>
                          )}
                          
                          {booking.status === 'active' && (
                            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                              Active
                            </Badge>
                          )}
                          
                          {booking.status === 'completed' && (
                            <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                              Completed
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        <div className="flex gap-2 items-center">
                          <Calendar className="h-4 w-4 text-eldercare-blue" />
                          <span className="text-sm">{booking.date}</span>
                        </div>
                        
                        <div className="flex gap-2 items-center">
                          <Clock className="h-4 w-4 text-eldercare-blue" />
                          <span className="text-sm">{booking.time} ({booking.duration} hours)</span>
                        </div>
                        
                        <div className="flex gap-2 items-center">
                          <MapPin className="h-4 w-4 text-eldercare-blue" />
                          <span className="text-sm">Home Address</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {booking.status === 'active' && (
                          <Button 
                            onClick={() => handleViewTracking(booking.id)}
                            className="flex-1 sm:flex-none gap-2"
                          >
                            <MapPin className="h-4 w-4" />
                            Track Caregiver
                          </Button>
                        )}
                        
                        {booking.status === 'upcoming' && (
                          <Button 
                            variant="outline" 
                            className="flex-1 sm:flex-none gap-2"
                            onClick={() => handleViewTracking(booking.id)}
                          >
                            <Clock className="h-4 w-4" />
                            View Details
                          </Button>
                        )}
                        
                        {booking.status === 'completed' && !booking.reviewed && (
                          <Button 
                            variant="outline" 
                            className="flex-1 sm:flex-none gap-2 border-eldercare-blue text-eldercare-blue hover:bg-eldercare-lightBlue/20"
                            onClick={() => handleWriteReview(booking)}
                          >
                            <Star className="h-4 w-4" />
                            Write Review
                          </Button>
                        )}
                        
                        {booking.status === 'completed' && booking.reviewed && (
                          <Button
                            variant="ghost"
                            className="flex-1 sm:flex-none gap-2 text-muted-foreground cursor-default"
                            disabled
                          >
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            Reviewed
                          </Button>
                        )}
                        
                        <Link to={`/caregivers/${booking.caregiver.id}`} className="flex-1 sm:flex-none">
                          <Button 
                            variant="outline"
                            className="w-full gap-2"
                          >
                            <User className="h-4 w-4" />
                            View Profile
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Favorite Caregivers</h2>
              <Button variant="outline" size="sm" onClick={() => navigate('/caregivers')}>
                Find Caregivers
              </Button>
            </div>
            
            {favoriteCaregivers.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
                  <p className="text-muted-foreground text-center mb-6">
                    You haven't added any caregivers to your favorites yet. Browse caregivers and add them to your favorites.
                  </p>
                  <Button onClick={() => navigate('/caregivers')}>
                    Browse Caregivers
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteCaregivers.map((caregiver) => (
                  <Card key={caregiver.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="w-16 h-16 border-2 border-eldercare-lightBlue">
                          <AvatarImage src={caregiver.image} alt={caregiver.name} />
                          <AvatarFallback>{caregiver.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <h3 className="font-medium">{caregiver.name}</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                            <span className="text-sm">{caregiver.rating}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{caregiver.specialty}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          className="flex-1"
                          onClick={() => navigate(`/caregivers/booking/${caregiver.id}`, { state: { caregiver } })}
                        >
                          Book
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => navigate(`/caregivers/${caregiver.id}`)}
                        >
                          Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Notifications</h2>
              <Button variant="outline" size="sm">
                Mark All as Read
              </Button>
            </div>
            
            {notifications.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No notifications</h3>
                  <p className="text-muted-foreground text-center">
                    You don't have any notifications at the moment. Check back later.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-0">
                  {notifications.map((notification, index) => (
                    <div key={notification.id} className="flex items-start p-4 hover:bg-muted/30 transition-colors">
                      <div className={`w-2 h-2 rounded-full mt-2 mr-4 ${notification.read ? 'bg-transparent' : 'bg-eldercare-blue'}`}></div>
                      <div className="flex-1">
                        <p className={`${notification.read ? 'text-muted-foreground' : 'font-medium'}`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Full Name</h3>
                    <p>{userProfile.name}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Email Address</h3>
                    <p>{userProfile.email}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone Number</h3>
                    <p>{userProfile.phone}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Address</h3>
                    <p>{userProfile.address}</p>
                  </div>
                </div>
                
                <Button className="mt-6">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Information
                </Button>
              </CardContent>
            </Card>
            
            <h2 className="text-xl font-semibold mb-4">Security</h2>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-eldercare-blue" />
                    <span className="font-medium">Password</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Change Password
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-eldercare-blue" />
                    <span className="font-medium">Two-Factor Authentication</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Enable
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
