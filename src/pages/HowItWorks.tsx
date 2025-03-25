
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, UserCheck, Calendar, HeartHandshake, Star, CreditCard, Clock, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-16 bg-eldercare-blueGray">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How ElderCare Works</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Simple, reliable care for your loved ones in just a few easy steps.
            </p>
            <Tabs defaultValue="families" className="max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="families">For Families</TabsTrigger>
                <TabsTrigger value="caregivers">For Caregivers</TabsTrigger>
              </TabsList>
              <TabsContent value="families" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow animate-fade-in">
                    <div className="w-16 h-16 bg-eldercare-lightBlue rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-7 w-7 text-eldercare-blue" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">1. Search</h3>
                    <p className="text-muted-foreground">
                      Browse through our qualified caregivers and filter based on your specific needs.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow animate-fade-in" style={{ animationDelay: "150ms" }}>
                    <div className="w-16 h-16 bg-eldercare-lightBlue rounded-full flex items-center justify-center mx-auto mb-4">
                      <UserCheck className="h-7 w-7 text-eldercare-blue" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">2. Select</h3>
                    <p className="text-muted-foreground">
                      Choose the perfect caregiver based on experience, specialties, and reviews.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow animate-fade-in" style={{ animationDelay: "300ms" }}>
                    <div className="w-16 h-16 bg-eldercare-lightBlue rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-7 w-7 text-eldercare-blue" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">3. Schedule</h3>
                    <p className="text-muted-foreground">
                      Book care sessions that fit your schedule, from one-time visits to recurring care.
                    </p>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <Link to="/caregivers">
                    <Button size="lg" className="bg-eldercare-blue hover:bg-blue-600">
                      Find a Caregiver Now
                    </Button>
                  </Link>
                </div>
              </TabsContent>
              <TabsContent value="caregivers" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow animate-fade-in">
                    <div className="w-16 h-16 bg-eldercare-lightBlue rounded-full flex items-center justify-center mx-auto mb-4">
                      <UserCheck className="h-7 w-7 text-eldercare-blue" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">1. Apply</h3>
                    <p className="text-muted-foreground">
                      Create your profile with your experience, specialties, and availability.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow animate-fade-in" style={{ animationDelay: "150ms" }}>
                    <div className="w-16 h-16 bg-eldercare-lightBlue rounded-full flex items-center justify-center mx-auto mb-4">
                      <HeartHandshake className="h-7 w-7 text-eldercare-blue" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">2. Connect</h3>
                    <p className="text-muted-foreground">
                      Get matched with families seeking care services in your area.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow animate-fade-in" style={{ animationDelay: "300ms" }}>
                    <div className="w-16 h-16 bg-eldercare-lightBlue rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="h-7 w-7 text-eldercare-blue" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">3. Grow</h3>
                    <p className="text-muted-foreground">
                      Build your reputation with great reviews and expand your client base.
                    </p>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <Link to="/caregivers/apply">
                    <Button size="lg" className="bg-eldercare-blue hover:bg-blue-600">
                      Join as a Caregiver
                    </Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Care Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've simplified finding and managing elder care to give you peace of mind.
            </p>
          </div>
          
          <div className="relative">
            {/* Process timeline connector */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-eldercare-lightBlue transform -translate-x-1/2 hidden md:block"></div>
            
            <div className="space-y-12 md:space-y-0">
              {/* Step 1 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                    <h3 className="text-xl font-semibold mb-2">Initial Consultation</h3>
                    <p className="text-muted-foreground mb-4">
                      We start with understanding your loved one's needs, preferences, and care requirements through a comprehensive assessment.
                    </p>
                    <ul className="space-y-2 text-sm list-disc list-inside md:list-outside">
                      <li>Detailed needs assessment</li>
                      <li>Family involvement in care planning</li>
                      <li>Personalized care recommendation</li>
                    </ul>
                  </div>
                  <div className="order-1 md:order-2 md:w-1/2 flex justify-center md:justify-start">
                    <div className="w-16 h-16 bg-eldercare-blue rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 md:mb-0 relative z-10">
                      1
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative mt-12">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pl-12 order-2">
                    <h3 className="text-xl font-semibold mb-2">Caregiver Matching</h3>
                    <p className="text-muted-foreground mb-4">
                      We carefully match your loved one with caregivers who have the right skills, experience, and personality to provide exceptional care.
                    </p>
                    <ul className="space-y-2 text-sm list-disc list-inside md:list-outside">
                      <li>Caregiver selection based on specific needs</li>
                      <li>Option to interview potential caregivers</li>
                      <li>Background-checked and verified professionals</li>
                    </ul>
                  </div>
                  <div className="order-1 md:w-1/2 flex justify-center md:justify-end">
                    <div className="w-16 h-16 bg-eldercare-blue rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 md:mb-0 relative z-10">
                      2
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative mt-12">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                    <h3 className="text-xl font-semibold mb-2">Care Delivery</h3>
                    <p className="text-muted-foreground mb-4">
                      Our caregivers provide compassionate, professional care while keeping you informed about your loved one's wellbeing.
                    </p>
                    <ul className="space-y-2 text-sm list-disc list-inside md:list-outside">
                      <li>Transparent care logging</li>
                      <li>Real-time updates and check-ins</li>
                      <li>Adherence to personalized care plan</li>
                    </ul>
                  </div>
                  <div className="order-1 md:order-2 md:w-1/2 flex justify-center md:justify-start">
                    <div className="w-16 h-16 bg-eldercare-blue rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 md:mb-0 relative z-10">
                      3
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="relative mt-12">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pl-12 order-2">
                    <h3 className="text-xl font-semibold mb-2">Ongoing Support</h3>
                    <p className="text-muted-foreground mb-4">
                      We continuously monitor and adjust care as needed, ensuring your loved one receives the best possible support.
                    </p>
                    <ul className="space-y-2 text-sm list-disc list-inside md:list-outside">
                      <li>Regular care plan reviews</li>
                      <li>Quick response to changing needs</li>
                      <li>24/7 support for families and clients</li>
                    </ul>
                  </div>
                  <div className="order-1 md:w-1/2 flex justify-center md:justify-end">
                    <div className="w-16 h-16 bg-eldercare-blue rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 md:mb-0 relative z-10">
                      4
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-eldercare-blueGray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose ElderCare?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing exceptional care with features designed for your peace of mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-eldercare-lightBlue flex items-center justify-center mb-4">
                <UserCheck className="h-6 w-6 text-eldercare-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Caregivers</h3>
              <p className="text-muted-foreground text-sm">
                All caregivers undergo rigorous background checks, credential verification, and interview processes.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-eldercare-lightBlue flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-eldercare-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Simple Payments</h3>
              <p className="text-muted-foreground text-sm">
                Secure, transparent billing with no hidden fees. Pay only for the care you receive.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-eldercare-lightBlue flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-eldercare-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-Time Tracking</h3>
              <p className="text-muted-foreground text-sm">
                Monitor care visits, tasks completed, and get instant updates through our mobile app.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-eldercare-lightBlue flex items-center justify-center mb-4">
                <Headphones className="h-6 w-6 text-eldercare-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground text-sm">
                Our care team is available around the clock to assist with any questions or concerns.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-eldercare-blueGray p-8 md:p-12 rounded-2xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-muted-foreground mb-8">
              Find the perfect caregiver for your loved one in minutes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/caregivers">
                <Button size="lg" className="bg-eldercare-blue hover:bg-blue-600 w-full sm:w-auto">
                  Find a Caregiver
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
