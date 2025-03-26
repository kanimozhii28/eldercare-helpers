
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Edit, LogOut, Calendar, Clock, Heart, 
  CheckCircle, Clock3, X, ChevronRight, Settings
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Mock data for user profile
const userProfile = {
  name: "John Smith",
  email: "john.smith@example.com",
  phone: "(555) 123-4567",
  address: "123 Main St, Anytown, CA 12345",
};

// Mock data for bookings
const currentBookings = [
  {
    id: 1,
    caregiverName: "Sarah Johnson",
    caregiverImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    date: "June 15, 2023",
    time: "2:00 PM",
    duration: 3,
    status: "active",
    careType: "Companion Care"
  },
  {
    id: 2,
    caregiverName: "Michael Chen",
    caregiverImage: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    date: "June 18, 2023",
    time: "10:00 AM",
    duration: 4,
    status: "scheduled",
    careType: "Home Health Care"
  }
];

const pastBookings = [
  {
    id: 3,
    caregiverName: "Emma Wilson",
    caregiverImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    date: "May 22, 2023",
    time: "1:00 PM",
    duration: 2,
    status: "completed",
    careType: "Personal Care",
    rated: true,
    rating: 5
  },
  {
    id: 4,
    caregiverName: "David Thompson",
    caregiverImage: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    date: "May 10, 2023",
    time: "9:00 AM",
    duration: 3,
    status: "completed",
    careType: "Specialized Care",
    rated: true,
    rating: 4
  }
];

// Mock data for favorite caregivers
const favoriteCaregivers = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.9,
    specialty: "Companion Care",
    hourlyRate: 28
  },
  {
    id: 2,
    name: "Emma Wilson",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.8,
    specialty: "Personal Care",
    hourlyRate: 32
  }
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left sidebar */}
          <div className="w-full md:w-1/4">
            <div className="sticky top-24">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <Avatar className="w-24 h-24 mb-4">
                      <AvatarImage src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold">{userProfile.name}</h2>
                    <p className="text-sm text-muted-foreground">{userProfile.email}</p>
                  </div>
                  
                  <Separator className="mb-4" />
                  
                  <nav className="space-y-1">
                    <button
                      className={`w-full flex items-center p-2 rounded-md text-left ${
                        activeTab === "account" 
                          ? "bg-eldercare-lightBlue text-eldercare-blue font-medium" 
                          : "hover:bg-muted"
                      }`}
                      onClick={() => setActiveTab("account")}
                    >
                      <User className="mr-3 h-5 w-5" />
                      Account
                    </button>
                    
                    <button
                      className={`w-full flex items-center p-2 rounded-md text-left ${
                        activeTab === "bookings" 
                          ? "bg-eldercare-lightBlue text-eldercare-blue font-medium" 
                          : "hover:bg-muted"
                      }`}
                      onClick={() => setActiveTab("bookings")}
                    >
                      <Calendar className="mr-3 h-5 w-5" />
                      Bookings
                    </button>
                    
                    <button
                      className={`w-full flex items-center p-2 rounded-md text-left ${
                        activeTab === "favorites" 
                          ? "bg-eldercare-lightBlue text-eldercare-blue font-medium" 
                          : "hover:bg-muted"
                      }`}
                      onClick={() => setActiveTab("favorites")}
                    >
                      <Heart className="mr-3 h-5 w-5" />
                      Favorites
                    </button>
                    
                    <button
                      className={`w-full flex items-center p-2 rounded-md text-left ${
                        activeTab === "settings" 
                          ? "bg-eldercare-lightBlue text-eldercare-blue font-medium" 
                          : "hover:bg-muted"
                      }`}
                      onClick={() => setActiveTab("settings")}
                    >
                      <Settings className="mr-3 h-5 w-5" />
                      Settings
                    </button>
                    
                    <Link 
                      to="/login" 
                      className="w-full flex items-center p-2 rounded-md text-left text-red-500 hover:bg-red-50"
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      Sign Out
                    </Link>
                  </nav>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-2">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our support team is always ready to assist you with any questions.
                  </p>
                  <Button variant="outline" className="w-full">Contact Support</Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Main content */}
          <div className="w-full md:w-3/4">
            {activeTab === "account" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">Account Information</h1>
                  <Button variant="outline">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
                
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
                    
                    <div className="flex items-center justify-between p-3 border rounded-md mb-3">
                      <div className="flex items-center">
                        <div className="h-10 w-14 bg-blue-500 rounded-md flex items-center justify-center text-white font-bold mr-3">
                          VISA
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 05/2025</p>
                        </div>
                      </div>
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Default
                        </span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      Add Payment Method
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === "bookings" && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Your Bookings</h1>
                
                <Tabs defaultValue="current">
                  <TabsList className="mb-6">
                    <TabsTrigger value="current">Current & Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past Bookings</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="current">
                    <div className="space-y-4">
                      {currentBookings.length > 0 ? (
                        currentBookings.map(booking => (
                          <Card key={booking.id} className="overflow-hidden">
                            <CardContent className="p-0">
                              <div className="p-4 md:p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                  <div className="flex items-center mb-3 md:mb-0">
                                    <img 
                                      src={booking.caregiverImage} 
                                      alt={booking.caregiverName} 
                                      className="w-12 h-12 rounded-full object-cover mr-3"
                                    />
                                    <div>
                                      <h3 className="font-semibold">{booking.caregiverName}</h3>
                                      <p className="text-sm text-muted-foreground">
                                        {booking.careType}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    {booking.status === "active" ? (
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Active
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        <Clock3 className="w-3 h-3 mr-1" />
                                        Scheduled
                                      </span>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                  <div className="flex items-center">
                                    <Calendar className="w-5 h-5 text-eldercare-blue mr-2" />
                                    <div>
                                      <p className="text-sm text-muted-foreground">Date</p>
                                      <p className="font-medium">{booking.date}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center">
                                    <Clock className="w-5 h-5 text-eldercare-blue mr-2" />
                                    <div>
                                      <p className="text-sm text-muted-foreground">Time</p>
                                      <p className="font-medium">{booking.time}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center">
                                    <Clock className="w-5 h-5 text-eldercare-blue mr-2" />
                                    <div>
                                      <p className="text-sm text-muted-foreground">Duration</p>
                                      <p className="font-medium">{booking.duration} hours</p>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex flex-col md:flex-row gap-3 mt-4">
                                  {booking.status === "active" && (
                                    <Link to="/live-tracking" className="flex-1">
                                      <Button variant="default" className="w-full bg-eldercare-blue hover:bg-blue-600">
                                        Track Caregiver
                                      </Button>
                                    </Link>
                                  )}
                                  <Button variant="outline" className="flex-1">
                                    View Details
                                  </Button>
                                  <Button variant="outline" className="flex-1 text-red-500 hover:text-red-600">
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <div className="text-center py-10 rounded-md border border-dashed">
                          <Calendar className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                          <h3 className="font-medium mb-1">No upcoming bookings</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            You don't have any upcoming bookings.
                          </p>
                          <Link to="/caregivers">
                            <Button className="bg-eldercare-blue hover:bg-blue-600">
                              Book a Caregiver
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="past">
                    <div className="space-y-4">
                      {pastBookings.map(booking => (
                        <Card key={booking.id}>
                          <CardContent className="p-4 md:p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                              <div className="flex items-center mb-3 md:mb-0">
                                <img 
                                  src={booking.caregiverImage} 
                                  alt={booking.caregiverName} 
                                  className="w-12 h-12 rounded-full object-cover mr-3"
                                />
                                <div>
                                  <h3 className="font-semibold">{booking.caregiverName}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {booking.careType}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Completed
                                </span>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center">
                                <Calendar className="w-5 h-5 text-eldercare-blue mr-2" />
                                <div>
                                  <p className="text-sm text-muted-foreground">Date</p>
                                  <p className="font-medium">{booking.date}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center">
                                <Clock className="w-5 h-5 text-eldercare-blue mr-2" />
                                <div>
                                  <p className="text-sm text-muted-foreground">Time</p>
                                  <p className="font-medium">{booking.time}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center">
                                <Clock className="w-5 h-5 text-eldercare-blue mr-2" />
                                <div>
                                  <p className="text-sm text-muted-foreground">Duration</p>
                                  <p className="font-medium">{booking.duration} hours</p>
                                </div>
                              </div>
                            </div>
                            
                            {booking.rated ? (
                              <div className="flex items-center mt-2">
                                <p className="text-sm mr-2">Your rating:</p>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`w-4 h-4 ${
                                        i < booking.rating 
                                          ? 'text-yellow-400 fill-yellow-400' 
                                          : 'text-gray-300'
                                      }`} 
                                    />
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <Button variant="outline" className="mt-2">
                                Leave a Review
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
            
            {activeTab === "favorites" && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Favorite Caregivers</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favoriteCaregivers.map(caregiver => (
                    <Card key={caregiver.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <img 
                            src={caregiver.image} 
                            alt={caregiver.name} 
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold">{caregiver.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {caregiver.specialty}
                                </p>
                              </div>
                              <button className="text-red-500 hover:text-red-600 focus:outline-none">
                                <Heart className="w-5 h-5 fill-current" />
                              </button>
                            </div>
                            
                            <div className="flex items-center mt-1 mb-3">
                              <div className="flex mr-1">
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
                              <span className="text-sm">{caregiver.rating}</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-eldercare-blue">
                                ${caregiver.hourlyRate}/hr
                              </span>
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
              </div>
            )}
            
            {activeTab === "settings" && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Settings</h1>
                
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Email Notifications</h3>
                          <p className="text-sm text-muted-foreground">
                            Receive booking updates via email
                          </p>
                        </div>
                        <div className="flex items-center h-6">
                          <input
                            type="checkbox"
                            className="rounded text-eldercare-blue focus:ring-eldercare-blue"
                            defaultChecked
                          />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">SMS Notifications</h3>
                          <p className="text-sm text-muted-foreground">
                            Receive booking updates via text message
                          </p>
                        </div>
                        <div className="flex items-center h-6">
                          <input
                            type="checkbox"
                            className="rounded text-eldercare-blue focus:ring-eldercare-blue"
                            defaultChecked
                          />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Promotional Emails</h3>
                          <p className="text-sm text-muted-foreground">
                            Receive special offers and promotions
                          </p>
                        </div>
                        <div className="flex items-center h-6">
                          <input
                            type="checkbox"
                            className="rounded text-eldercare-blue focus:ring-eldercare-blue"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Account Security</h2>
                    
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-between">
                        <span>Change Password</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-between">
                        <span>Two-Factor Authentication</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-between text-red-500 hover:text-red-600">
                        <span>Delete Account</span>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
