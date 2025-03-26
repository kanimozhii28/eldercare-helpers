
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Check, ArrowRight, Clock, Calendar, User, Shield, Heart,
  Clipboard, Settings, Activity, Chef, Coffee, FileText
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import VoiceAssistant from '@/components/VoiceAssistant';

const CarePlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  
  const standardPlans = [
    {
      id: 1,
      name: "Basic Care",
      description: "Essential care services for seniors who need minimal assistance.",
      price: 29,
      features: [
        "Companionship",
        "Light housekeeping",
        "Meal preparation",
        "Medication reminders",
        "Transportation"
      ],
      icon: Coffee,
      popular: false
    },
    {
      id: 2,
      name: "Standard Care",
      description: "Comprehensive care services for seniors who need moderate assistance.",
      price: 49,
      features: [
        "All Basic Care features",
        "Personal care assistance",
        "Mobility assistance",
        "Exercise assistance",
        "Shopping & errands",
        "24/7 on-call support"
      ],
      icon: Heart,
      popular: true
    },
    {
      id: 3,
      name: "Premium Care",
      description: "Complete care services for seniors who need significant assistance.",
      price: 79,
      features: [
        "All Standard Care features",
        "Skilled nursing care",
        "Specialized care for conditions",
        "Medication administration",
        "Care coordination",
        "Regular health assessments",
        "Personalized care plan"
      ],
      icon: Shield,
      popular: false
    }
  ];
  
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-eldercare-blueGray py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Personalized Elder Care Plans
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Choose from our standard care plans or customize a plan to meet your specific needs.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="standard" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="standard">Standard Plans</TabsTrigger>
            <TabsTrigger value="customized">Customized Plan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="standard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {standardPlans.map(plan => (
                <Card 
                  key={plan.id} 
                  className={`relative ${
                    selectedPlan?.id === plan.id 
                      ? 'border-eldercare-blue ring-2 ring-eldercare-blue/20' 
                      : ''
                  } ${
                    plan.popular 
                      ? 'shadow-lg' 
                      : ''
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-eldercare-blue">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-eldercare-lightBlue rounded-full flex items-center justify-center mx-auto mb-4">
                      <plan.icon className="h-6 w-6 text-eldercare-blue" />
                    </div>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/hour</span>
                    </div>
                    <Separator className="mb-6" />
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={`w-full ${
                        selectedPlan?.id === plan.id 
                          ? 'bg-eldercare-blue' 
                          : (plan.popular ? 'bg-eldercare-blue' : '')
                      }`}
                      variant={selectedPlan?.id === plan.id || plan.popular ? 'default' : 'outline'}
                      onClick={() => handleSelectPlan(plan)}
                    >
                      {selectedPlan?.id === plan.id ? 'Selected' : 'Select Plan'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {selectedPlan && (
              <div className="mt-10 text-center">
                <h3 className="text-xl font-semibold mb-2">
                  You've selected the {selectedPlan.name} plan
                </h3>
                <p className="text-muted-foreground mb-6">
                  Find a caregiver who specializes in this type of care.
                </p>
                <Link to="/caregivers">
                  <Button className="bg-eldercare-blue hover:bg-blue-600">
                    Find Caregivers
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="customized">
            <Card>
              <CardHeader>
                <CardTitle>Build Your Customized Care Plan</CardTitle>
                <CardDescription>
                  Select the services you need to create a personalized care plan.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Care Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <CareServiceCheckbox
                        icon={<Coffee className="h-5 w-5" />}
                        title="Companionship"
                        description="Conversation, activities, and social engagement"
                      />
                      <CareServiceCheckbox
                        icon={<Chef className="h-5 w-5" />}
                        title="Meal Preparation"
                        description="Cooking meals according to dietary needs"
                      />
                      <CareServiceCheckbox
                        icon={<User className="h-5 w-5" />}
                        title="Personal Care"
                        description="Bathing, grooming, and dressing assistance"
                      />
                      <CareServiceCheckbox
                        icon={<Activity className="h-5 w-5" />}
                        title="Mobility Assistance"
                        description="Help with walking, transfers, and positioning"
                      />
                      <CareServiceCheckbox
                        icon={<Clipboard className="h-5 w-5" />}
                        title="Medication Reminders"
                        description="Reminders to take medications on schedule"
                      />
                      <CareServiceCheckbox
                        icon={<Shield className="h-5 w-5" />}
                        title="Specialized Care"
                        description="Care for specific conditions like dementia"
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Schedule</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Care Hours</label>
                        <select className="w-full h-10 px-3 border rounded-md">
                          <option>2 hours</option>
                          <option>4 hours</option>
                          <option>6 hours</option>
                          <option>8 hours</option>
                          <option>12 hours</option>
                          <option>24 hours</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Frequency</label>
                        <select className="w-full h-10 px-3 border rounded-md">
                          <option>One-time</option>
                          <option>Daily</option>
                          <option>Weekly</option>
                          <option>Bi-weekly</option>
                          <option>Monthly</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Start Date</label>
                        <input 
                          type="date" 
                          className="w-full h-10 px-3 border rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Additional Information</h3>
                    <textarea 
                      className="w-full px-3 py-2 border rounded-md h-32" 
                      placeholder="Please provide any additional information about your care needs..."
                    ></textarea>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-center">
                <p className="text-muted-foreground text-sm mb-4">
                  Your custom care plan will be priced based on the services selected and schedule.
                </p>
                <Button className="bg-eldercare-blue hover:bg-blue-600">
                  Create Custom Plan
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-20 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">
            How Our Care Plans Work
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-eldercare-lightBlue flex items-center justify-center mx-auto mb-4">
                <FileText className="h-7 w-7 text-eldercare-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">1. Choose Your Plan</h3>
              <p className="text-muted-foreground">
                Select from our standard plans or customize a plan to meet your specific needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-eldercare-lightBlue flex items-center justify-center mx-auto mb-4">
                <User className="h-7 w-7 text-eldercare-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">2. Match with Caregivers</h3>
              <p className="text-muted-foreground">
                We'll match you with caregivers who specialize in the services you need.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-eldercare-lightBlue flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-7 w-7 text-eldercare-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">3. Start Receiving Care</h3>
              <p className="text-muted-foreground">
                Schedule your care sessions and start receiving quality care from our professionals.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-20 bg-eldercare-blueGray rounded-2xl p-8 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-2xl font-bold mb-3">
                Need Help Choosing the Right Plan?
              </h2>
              <p className="text-muted-foreground mb-4">
                Our care advisors can help you determine the best care plan based on your specific needs.
              </p>
              <Button className="bg-eldercare-blue hover:bg-blue-600">
                Schedule a Consultation
              </Button>
            </div>
            <div className="md:w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                alt="Care advisor" 
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
      
      <VoiceAssistant />
      <Footer />
    </div>
  );
};

const CareServiceCheckbox = ({ icon, title, description }) => {
  const [checked, setChecked] = useState(false);
  
  return (
    <label className={`block p-4 border rounded-md cursor-pointer transition-colors ${
      checked ? 'border-eldercare-blue bg-eldercare-lightBlue/20' : 'hover:bg-gray-50'
    }`}>
      <div className="flex items-start">
        <input
          type="checkbox"
          className="rounded text-eldercare-blue focus:ring-eldercare-blue mt-1"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <div className="ml-3">
          <div className="flex items-center">
            <span className="text-eldercare-blue mr-2">{icon}</span>
            <span className="font-medium">{title}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </label>
  );
};

export default CarePlans;
