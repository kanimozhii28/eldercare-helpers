
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import CaregiverSection from '../components/CaregiverCard';
import VoiceAssistant from '../components/VoiceAssistant';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <CategorySection />
        <CaregiverSection />
        
        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-eldercare-warmGray">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-eldercare-lightBlue text-eldercare-blue rounded-full mb-4">
                Simple Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How <span className="text-eldercare-blue">ElderCare</span> Works
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Our streamlined process makes it easy to find and book the perfect caregiver for your loved one's needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="glass rounded-2xl p-6 text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-eldercare-blue/10 text-eldercare-blue flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">Browse Caregivers</h3>
                <p className="text-muted-foreground">
                  Search through our verified caregivers based on your specific needs and preferences.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="glass rounded-2xl p-6 text-center animate-fade-in" style={{ animationDelay: "100ms" }}>
                <div className="w-16 h-16 rounded-full bg-eldercare-blue/10 text-eldercare-blue flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">Book a Session</h3>
                <p className="text-muted-foreground">
                  Schedule care sessions based on your availability and service requirements.
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="glass rounded-2xl p-6 text-center animate-fade-in" style={{ animationDelay: "200ms" }}>
                <div className="w-16 h-16 rounded-full bg-eldercare-blue/10 text-eldercare-blue flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">Receive Care</h3>
                <p className="text-muted-foreground">
                  Track your caregiver in real-time and enjoy peace of mind knowing your loved one is in good hands.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <a 
                href="/how-it-works" 
                className="inline-flex items-center px-6 py-3 bg-eldercare-blue text-white rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 btn-press"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-eldercare-lightBlue text-eldercare-blue rounded-full mb-4">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our <span className="text-eldercare-blue">Clients</span> Say
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Hear from families who have experienced the difference of our personalized elder care services.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="glass rounded-2xl p-6 animate-fade-in">
                <div className="flex items-center mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80" 
                    alt="Jane Smith" 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">Jane Smith</h4>
                    <p className="text-sm text-muted-foreground">Daughter of Client</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground mb-4">
                  "The caregivers from ElderCare have been a blessing for my mother. They are skilled, compassionate, and truly care about her wellbeing. The live tracking feature gives me peace of mind even when I'm far away."
                </p>
                <div className="flex text-eldercare-accent">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="glass rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
                <div className="flex items-center mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Robert Johnson" 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">Robert Johnson</h4>
                    <p className="text-sm text-muted-foreground">Son of Client</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground mb-4">
                  "Finding a reliable caregiver was challenging until we discovered ElderCare. Their vetting process is thorough, and the caregiver matching is excellent. My father looks forward to his caregiver's visits every week."
                </p>
                <div className="flex text-eldercare-accent">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>
              
              {/* Testimonial 3 */}
              <div className="glass rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
                <div className="flex items-center mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80" 
                    alt="Maria Garcia" 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">Maria Garcia</h4>
                    <p className="text-sm text-muted-foreground">Client</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground mb-4">
                  "As someone who values independence but needs occasional help, ElderCare has been perfect. I can book services when I need them, and the voice assistant feature makes it so easy to use, even for someone like me who isn't tech-savvy."
                </p>
                <div className="flex text-eldercare-accent">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${i === 4 ? 'opacity-50' : ''}`}>
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-eldercare-blue relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl mx-auto text-center text-white animate-fade-in">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Find the Perfect Caregiver?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Join thousands of families who have found peace of mind with ElderCare's trusted caregiving services.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="/caregivers" 
                  className="px-8 py-3 bg-white text-eldercare-blue rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 btn-press font-medium"
                >
                  Find a Caregiver
                </a>
                <a 
                  href="/contact" 
                  className="px-8 py-3 bg-transparent text-white border border-white/30 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 btn-press font-medium"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <VoiceAssistant />
    </div>
  );
};

export default Index;
