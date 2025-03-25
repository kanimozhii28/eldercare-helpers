
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategorySection from '@/components/CategorySection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicePlans = () => {
  const plans = [
    {
      title: "Basic Care",
      price: "$25",
      description: "Essential care services for independent seniors",
      features: [
        "Weekly check-ins",
        "Medication reminders",
        "Light housekeeping",
        "Grocery shopping assistance"
      ]
    },
    {
      title: "Standard Care",
      price: "$45",
      description: "Comprehensive support for daily living needs",
      features: [
        "Daily visits",
        "Meal preparation",
        "Personal hygiene assistance",
        "Transportation to appointments",
        "Medication management"
      ],
      highlighted: true
    },
    {
      title: "Premium Care",
      price: "$75",
      description: "Complete care solution with specialized support",
      features: [
        "Multiple daily visits",
        "Specialized medical assistance",
        "24/7 emergency support",
        "Companionship activities",
        "Coordination with healthcare providers",
        "Family updates and reports"
      ]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Care Plans That Fit Your Needs</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from our range of flexible care options designed to provide the right level of support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card key={plan.title} className={`flex flex-col ${plan.highlighted ? 'ring-2 ring-eldercare-blue shadow-lg' : ''}`}>
              <CardHeader>
                <CardTitle>{plan.title}</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/hour</span>
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-eldercare-blue mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-eldercare-blue hover:bg-blue-600">
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-16 bg-eldercare-blueGray">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Elder Care Services</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive care solutions designed to enhance quality of life and maintain independence for your loved ones.
            </p>
          </div>
        </div>
      </div>
      
      <CategorySection />
      
      <ServicePlans />
      
      <section className="py-16 bg-eldercare-blueGray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Need a Customized Care Plan?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Every senior has unique needs. Contact us to discuss a personalized care solution that works for your family.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-eldercare-blue hover:bg-blue-600">
                Request Consultation <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;
