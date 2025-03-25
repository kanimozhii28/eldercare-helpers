
import React from 'react';
import { ChevronRight, Clock, Heart, Map, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 -translate-x-1/4 translate-y-1/4 w-96 h-96 bg-eldercare-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/4 w-96 h-96 bg-eldercare-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          <div className="w-full max-w-2xl animate-fade-in">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-eldercare-lightBlue text-eldercare-blue rounded-full">
                Trusted Elder Care Services
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Helping Seniors Live with <span className="text-eldercare-blue">Dignity</span> and <span className="text-eldercare-blue">Comfort</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Connect with skilled caregivers who provide personalized care based on your loved one's needs, from companionship to specialized health services.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link 
                to="/caregivers" 
                className="px-6 py-3 bg-eldercare-blue text-white rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 btn-press"
              >
                Find a Caregiver
                <ChevronRight className="inline-block ml-1 w-4 h-4" />
              </Link>
              
              <Link 
                to="/services" 
                className="px-6 py-3 bg-white text-eldercare-blue border border-eldercare-blue/20 rounded-full shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 btn-press"
              >
                Explore Services
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-eldercare-lightBlue flex items-center justify-center">
                  <Clock className="w-5 h-5 text-eldercare-blue" />
                </div>
                <span className="text-sm font-medium">24/7 Care</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-eldercare-lightBlue flex items-center justify-center">
                  <Map className="w-5 h-5 text-eldercare-blue" />
                </div>
                <span className="text-sm font-medium">Live Tracking</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-eldercare-lightBlue flex items-center justify-center">
                  <Heart className="w-5 h-5 text-eldercare-blue" />
                </div>
                <span className="text-sm font-medium">Favorite Caregivers</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-eldercare-lightBlue flex items-center justify-center">
                  <Mic className="w-5 h-5 text-eldercare-blue" />
                </div>
                <span className="text-sm font-medium">Voice Assistant</span>
              </div>
            </div>
          </div>
          
          <div className="w-full max-w-lg">
            <div className="relative">
              {/* Main image with glass effect */}
              <div className="glass rounded-3xl overflow-hidden shadow-xl animate-fade-in">
                <img 
                  src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" 
                  alt="Elder with caregiver" 
                  className="w-full h-auto object-cover rounded-3xl aspect-[4/3]"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -bottom-6 -left-6 glass p-4 rounded-2xl shadow-lg max-w-[200px] animate-float">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-eldercare-blue/10 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-eldercare-blue" fill="currentColor" />
                  </div>
                  <span className="font-medium text-sm">Trusted Care</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  All caregivers are thoroughly vetted and trained
                </p>
              </div>
              
              <div className="absolute -top-6 -right-6 glass p-4 rounded-2xl shadow-lg max-w-[200px] animate-float" style={{animationDelay: "0.5s"}}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-eldercare-accent/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-eldercare-accent" />
                  </div>
                  <span className="font-medium text-sm">Flexible Timing</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Book caregivers hourly, daily, or for longer periods
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
