
import React from 'react';
import DynamicNavbar from '@/components/DynamicNavbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Heart, Medal, ShieldCheck, Star } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <DynamicNavbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Categories Section */}
        <CategorySection />
        
        {/* Features Section */}
        <section className="py-16 bg-eldercare-blueGray">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose ElderCare</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our platform provides the best care for your loved ones with trustworthy caregivers and comprehensive services.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-full bg-eldercare-lightBlue flex items-center justify-center mb-4 mx-auto">
                    <ShieldCheck className="h-6 w-6 text-eldercare-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">Vetted Professionals</h3>
                  <p className="text-center text-muted-foreground">
                    All our caregivers undergo thorough background checks and qualification verification to ensure your loved ones are in safe hands.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-full bg-eldercare-lightBlue flex items-center justify-center mb-4 mx-auto">
                    <Heart className="h-6 w-6 text-eldercare-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">Personalized Care</h3>
                  <p className="text-center text-muted-foreground">
                    We offer customized care plans tailored to the specific needs and preferences of your elderly family members.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-full bg-eldercare-lightBlue flex items-center justify-center mb-4 mx-auto">
                    <Clock className="h-6 w-6 text-eldercare-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">24/7 Support</h3>
                  <p className="text-center text-muted-foreground">
                    Our customer service team is available around the clock to address any concerns or emergencies.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We pride ourselves on exceptional service that makes a difference in the lives of seniors and their families.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                          alt="Client"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">Robert Johnson</h4>
                        <p className="text-sm text-muted-foreground">Son of client</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">
                    "The caregiver ElderCare assigned to my father has been nothing short of amazing. Her patience, compassion, and professionalism have made a huge difference in my father's daily life and our peace of mind."
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                          alt="Client"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">Emily Thompson</h4>
                        <p className="text-sm text-muted-foreground">Daughter of client</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">
                    "Finding ElderCare has been a blessing. My mother needs specialized care for her Alzheimer's, and their caregiver is experienced, attentive, and has formed a wonderful bond with her."
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                          alt="Client"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">Michael Lewis</h4>
                        <p className="text-sm text-muted-foreground">Client</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                      <Star className="h-4 w-4 text-gray-300" />
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">
                    "As someone who values my independence but needs a little help with daily tasks, ElderCare has been the perfect solution. My caregiver respects my autonomy while providing the support I need."
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-12">
              <Button className="bg-eldercare-blue hover:bg-blue-600">
                Read More Reviews
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-eldercare-blue">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Find the Perfect Caregiver?</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Join thousands of families who have found peace of mind with ElderCare's qualified and compassionate caregivers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" className="bg-white text-eldercare-blue hover:bg-gray-100">
                Find a Caregiver
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Explore Services
              </Button>
            </div>
          </div>
        </section>
        
        {/* Quality Service Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                  alt="Elderly care"
                  className="rounded-lg shadow-lg w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Our Quality Promise</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  At ElderCare, we are committed to providing exceptional care that enhances the quality of life for seniors while giving families peace of mind.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <CheckCircle className="h-5 w-5 text-eldercare-blue" />
                    </div>
                    <div>
                      <p className="font-medium">Rigorous Caregiver Selection</p>
                      <p className="text-sm text-muted-foreground">We select only the top 10% of applicants who pass our thorough screening process.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <CheckCircle className="h-5 w-5 text-eldercare-blue" />
                    </div>
                    <div>
                      <p className="font-medium">Personalized Matching</p>
                      <p className="text-sm text-muted-foreground">We carefully match caregivers with clients based on needs, preferences, and personalities.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <CheckCircle className="h-5 w-5 text-eldercare-blue" />
                    </div>
                    <div>
                      <p className="font-medium">Continuous Training</p>
                      <p className="text-sm text-muted-foreground">Our caregivers receive ongoing education and skill development to provide the best care.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <CheckCircle className="h-5 w-5 text-eldercare-blue" />
                    </div>
                    <div>
                      <p className="font-medium">Quality Assurance</p>
                      <p className="text-sm text-muted-foreground">Regular check-ins and assessments ensure consistently high-quality care.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button className="bg-eldercare-blue hover:bg-blue-600">
                    Learn About Our Standards
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
