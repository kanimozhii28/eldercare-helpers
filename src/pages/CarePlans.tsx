
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Shield, Activity, Clock, Check, User, Users, Puzzle } from 'lucide-react';

const CarePlans = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-10 bg-eldercare-blueGray">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Care Plans</h1>
          <p className="text-muted-foreground">Choose the right level of care for your loved ones</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Care Plans Tailored to Your Needs</h2>
            <p className="text-muted-foreground">
              We offer a variety of care plans designed to provide the right level of support for your loved ones.
              Every plan can be customized to meet specific needs and preferences.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Standard Care Plan */}
          <Card className="border-eldercare-blue/20 hover:border-eldercare-blue transition-all">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold">Standard Care</CardTitle>
                <Badge variant="outline" className="bg-eldercare-lightBlue text-eldercare-blue">
                  Most Popular
                </Badge>
              </div>
              <CardDescription>Essential care services</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="mb-4">
                <div className="text-3xl font-bold">$25-35<span className="text-base font-normal text-muted-foreground">/hour</span></div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-eldercare-lightBlue/40 p-1 rounded-full">
                    <Check className="h-4 w-4 text-eldercare-blue" />
                  </div>
                  <div>
                    <span className="font-medium">Companion Care</span>
                    <p className="text-sm text-muted-foreground">Conversation, companionship and social engagement</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-eldercare-lightBlue/40 p-1 rounded-full">
                    <Check className="h-4 w-4 text-eldercare-blue" />
                  </div>
                  <div>
                    <span className="font-medium">Light Housekeeping</span>
                    <p className="text-sm text-muted-foreground">Maintaining a clean and safe environment</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-eldercare-lightBlue/40 p-1 rounded-full">
                    <Check className="h-4 w-4 text-eldercare-blue" />
                  </div>
                  <div>
                    <span className="font-medium">Meal Preparation</span>
                    <p className="text-sm text-muted-foreground">Nutritious meal planning and preparation</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-eldercare-lightBlue/40 p-1 rounded-full">
                    <Check className="h-4 w-4 text-eldercare-blue" />
                  </div>
                  <div>
                    <span className="font-medium">Medication Reminders</span>
                    <p className="text-sm text-muted-foreground">Reminders to take medications as prescribed</p>
                  </div>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-eldercare-blue hover:bg-blue-600">
                Choose This Plan
              </Button>
            </CardFooter>
          </Card>

          {/* Premium Care Plan */}
          <Card className="border-eldercare-blue/20 hover:border-eldercare-blue transition-all">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold">Premium Care</CardTitle>
              <CardDescription>Advanced care with personal assistance</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="mb-4">
                <div className="text-3xl font-bold">$35-45<span className="text-base font-normal text-muted-foreground">/hour</span></div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-eldercare-lightBlue/40 p-1 rounded-full">
                    <Check className="h-4 w-4 text-eldercare-blue" />
                  </div>
                  <div>
                    <span className="font-medium">All Standard Care Services</span>
                    <p className="text-sm text-muted-foreground">Everything included in the Standard plan</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-eldercare-lightBlue/40 p-1 rounded-full">
                    <Check className="h-4 w-4 text-eldercare-blue" />
                  </div>
                  <div>
                    <span className="font-medium">Personal Care Assistance</span>
                    <p className="text-sm text-muted-foreground">Bathing, dressing, and grooming assistance</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-eldercare-lightBlue/40 p-1 rounded-full">
                    <Check className="h-4 w-4 text-eldercare-blue" />
                  </div>
                  <div>
                    <span className="font-medium">Mobility Assistance</span>
                    <p className="text-sm text-muted-foreground">Help with walking, transfers, and positioning</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-eldercare-lightBlue/40 p-1 rounded-full">
                    <Check className="h-4 w-4 text-eldercare-blue" />
                  </div>
                  <div>
                    <span className="font-medium">Transportation</span>
                    <p className="text-sm text-muted-foreground">Doctor appointments and social outings</p>
                  </div>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-eldercare-blue hover:bg-blue-600">
                Choose This Plan
              </Button>
            </CardFooter>
          </Card>

          {/* Specialized Care Plan */}
          <Card className="border-eldercare-blue/20 hover:border-eldercare-blue transition-all">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold">Specialized Care</CardTitle>
              <CardDescription>Expert care for specific conditions</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="mb-4">
                <div className="text-3xl font-bold">$45-65<span className="text-base font-normal text-muted-foreground">/hour</span></div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-eldercare-lightBlue/40 p-1 rounded-full">
                    <Check className="h-4 w-4 text-eldercare-blue" />
                  </div>
                  <div>
                    <span className="font-medium">All Premium Care Services</span>
                    <p className="text-sm text-muted-foreground">Everything included in the Premium plan</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-eldercare-lightBlue/40 p-1 rounded-full">
                    <Check className="h-4 w-4 text-eldercare-blue" />
                  </div>
                  <div>
                    <span className="font-medium">Dementia & Alzheimer's Care</span>
                    <p className="text-sm text-muted-foreground">Specialized support for memory care needs</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-eldercare-lightBlue/40 p-1 rounded-full">
                    <Check className="h-4 w-4 text-eldercare-blue" />
                  </div>
                  <div>
                    <span className="font-medium">Post-Hospital Care</span>
                    <p className="text-sm text-muted-foreground">Recovery support after hospital discharge</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-eldercare-lightBlue/40 p-1 rounded-full">
                    <Check className="h-4 w-4 text-eldercare-blue" />
                  </div>
                  <div>
                    <span className="font-medium">Chronic Condition Management</span>
                    <p className="text-sm text-muted-foreground">Specialized care for ongoing health conditions</p>
                  </div>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-eldercare-blue hover:bg-blue-600">
                Choose This Plan
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Custom Care Plan Section */}
        <div className="bg-eldercare-lightBlue/20 rounded-xl p-8 border border-eldercare-blue/20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold mb-3">Customized Care Plan</h3>
              <p className="mb-4 text-muted-foreground">
                We understand that every care situation is unique. Our customized care plans are designed 
                to address specific needs and preferences that may not be covered by our standard offerings.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex items-start">
                  <div className="mr-3 mt-1 bg-eldercare-blue/10 p-1 rounded-full">
                    <User className="h-4 w-4 text-eldercare-blue" />
                  </div>
                  <div>
                    <span className="font-medium">Personalized Assessment</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 mt-1 bg-eldercare-blue/10 p-1 rounded-full">
                    <Puzzle className="h-4 w-4 text-eldercare-blue" />
                  </div>
                  <div>
                    <span className="font-medium">Tailored Care Solutions</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 mt-1 bg-eldercare-blue/10 p-1 rounded-full">
                    <Users className="h-4 w-4 text-eldercare-blue" />
                  </div>
                  <div>
                    <span className="font-medium">Family Collaboration</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 mt-1 bg-eldercare-blue/10 p-1 rounded-full">
                    <Activity className="h-4 w-4 text-eldercare-blue" />
                  </div>
                  <div>
                    <span className="font-medium">Ongoing Adjustments</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <Button className="w-full h-12 text-base bg-eldercare-blue hover:bg-blue-600">
                Request Custom Plan
              </Button>
              <p className="text-center text-sm text-muted-foreground mt-3">
                Our care specialists will contact you within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CarePlans;
