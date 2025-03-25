
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Calendar, User, Check, AlertTriangle, Home, Phone, MessageSquare } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const LiveTracking = () => {
  const [careProgress, setCareProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    // Update the progress bar to simulate an ongoing care session
    const interval = setInterval(() => {
      setCareProgress((prev) => {
        const newProgress = prev + 0.5;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 3000);
    
    // Update the current time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => {
      clearInterval(interval);
      clearInterval(timeInterval);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-10 bg-eldercare-blueGray">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Care Session Tracking</h1>
          <p className="text-muted-foreground">Monitor ongoing care sessions in real-time</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <div className="relative">
                      <img 
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                        alt="Sarah Johnson" 
                        className="w-16 h-16 rounded-full object-cover border-2 border-eldercare-blue"
                      />
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Sarah Johnson</h2>
                      <p className="text-sm text-muted-foreground">Currently with Robert Smith</p>
                    </div>
                  </div>
                  
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    Active Session
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Session Progress</span>
                      <span>{Math.floor(careProgress)}% complete</span>
                    </div>
                    <Progress value={careProgress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-eldercare-blueGray p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Clock className="h-4 w-4" />
                        Start Time
                      </div>
                      <div className="font-medium">2:00 PM</div>
                    </div>
                    <div className="bg-eldercare-blueGray p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Clock className="h-4 w-4" />
                        End Time
                      </div>
                      <div className="font-medium">5:00 PM</div>
                    </div>
                    <div className="bg-eldercare-blueGray p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Calendar className="h-4 w-4" />
                        Date
                      </div>
                      <div className="font-medium">{currentTime.toLocaleDateString()}</div>
                    </div>
                    <div className="bg-eldercare-blueGray p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <User className="h-4 w-4" />
                        Care Type
                      </div>
                      <div className="font-medium">Standard Care</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="location" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>
              
              <TabsContent value="location">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Current Location</h3>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        Verified
                      </Badge>
                    </div>
                    
                    <div className="mb-4 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-eldercare-blue" />
                      <span>123 Eldercare Ave, Brooklyn, NY 11201</span>
                    </div>
                    
                    <div className="h-[300px] bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center text-muted-foreground">
                        <MapPin className="h-6 w-6 mx-auto mb-2" />
                        Map view would be integrated here
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      Last location update: {currentTime.toLocaleTimeString()}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="tasks">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Care Tasks</h3>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Task</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Time</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Medication reminder</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Completed
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">2:15 PM</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Prepare lunch</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Completed
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">2:30 PM</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Light housekeeping</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              In Progress
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">3:00 PM</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Afternoon walk</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
                              Pending
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">4:00 PM</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Evening medication</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
                              Pending
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">4:45 PM</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notes">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Session Notes</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-eldercare-blueGray p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Caregiver Note</span>
                          <span className="text-sm text-muted-foreground">2:20 PM</span>
                        </div>
                        <p className="text-sm">
                          Robert took his medication on time. He seems to be in good spirits today and has a good appetite.
                        </p>
                      </div>
                      
                      <div className="bg-eldercare-blueGray p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Health Update</span>
                          <span className="text-sm text-muted-foreground">3:15 PM</span>
                        </div>
                        <p className="text-sm">
                          Blood pressure reading: 122/78, temperature: 98.6°F. All vital signs are normal.
                        </p>
                      </div>
                      
                      <div className="p-4 rounded-lg border border-dashed border-gray-300">
                        <textarea 
                          placeholder="Add a note about the session..."
                          className="w-full bg-transparent resize-none outline-none"
                          rows={3}
                        />
                        <div className="flex justify-end mt-2">
                          <Button variant="outline" size="sm">Add Note</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="timeline">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Session Timeline</h3>
                    
                    <div className="relative border-l-2 border-eldercare-lightBlue pl-6 pb-2 space-y-6">
                      <div className="relative">
                        <div className="absolute -left-[30px] w-6 h-6 rounded-full bg-eldercare-blue flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <div className="bg-eldercare-blueGray p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">Session Started</span>
                            <span className="text-sm text-muted-foreground">2:00 PM</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Caregiver arrived and checked in at the client's home
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute -left-[30px] w-6 h-6 rounded-full bg-eldercare-blue flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <div className="bg-eldercare-blueGray p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">Medication Administered</span>
                            <span className="text-sm text-muted-foreground">2:15 PM</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Daily heart medication and vitamins provided
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute -left-[30px] w-6 h-6 rounded-full bg-eldercare-blue flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <div className="bg-eldercare-blueGray p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">Meal Prepared</span>
                            <span className="text-sm text-muted-foreground">2:30 PM</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Prepared lunch according to dietary guidelines
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute -left-[30px] w-6 h-6 rounded-full bg-eldercare-lightBlue flex items-center justify-center">
                          <Clock className="h-3 w-3 text-eldercare-blue" />
                        </div>
                        <div className="bg-eldercare-blueGray p-4 rounded-lg border-2 border-eldercare-lightBlue">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">Current Activity</span>
                            <span className="text-sm text-muted-foreground">{currentTime.toLocaleTimeString()}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Light housekeeping and companionship activities
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative opacity-50">
                        <div className="absolute -left-[30px] w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                          <Clock className="h-3 w-3 text-gray-500" />
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">Afternoon Walk</span>
                            <span className="text-sm text-muted-foreground">4:00 PM</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Scheduled short walk in the garden, weather permitting
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative opacity-50">
                        <div className="absolute -left-[30px] w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                          <Clock className="h-3 w-3 text-gray-500" />
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">Session End</span>
                            <span className="text-sm text-muted-foreground">5:00 PM</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Scheduled completion of care session
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Client Information</h3>
                
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                    alt="Robert Smith" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium">Robert Smith</h4>
                    <p className="text-sm text-muted-foreground">Age: 78</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Home className="h-4 w-4 text-eldercare-blue mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">Address</div>
                      <div className="text-sm text-muted-foreground">123 Eldercare Ave, Brooklyn, NY 11201</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-4 w-4 text-eldercare-blue mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">Medical Conditions</div>
                      <div className="text-sm text-muted-foreground">Hypertension, Mild Arthritis</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <User className="h-4 w-4 text-eldercare-blue mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">Emergency Contact</div>
                      <div className="text-sm text-muted-foreground">Jennifer Smith (Daughter)</div>
                      <div className="text-sm text-muted-foreground">(555) 123-4567</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Caregiver
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  
                  <Button variant="destructive" className="w-full justify-start">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Report Issue
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Upcoming Sessions</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Sarah Johnson</div>
                      <div className="text-sm text-muted-foreground">Tomorrow, 2:00 PM - 5:00 PM</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Michael Chen</div>
                      <div className="text-sm text-muted-foreground">May 24, 10:00 AM - 12:00 PM</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                  
                  <Link to="/caregivers">
                    <Button variant="outline" className="w-full mt-2">
                      Book New Session
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LiveTracking;
