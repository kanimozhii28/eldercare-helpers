
import React from 'react';
import { Star, Heart, Clock, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CaregiverCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  price: number;
  available: boolean;
  featured?: boolean;
  delay?: number;
}

const CaregiverCard = ({ 
  id, 
  name, 
  image, 
  rating, 
  reviewCount, 
  specialties, 
  price, 
  available, 
  featured = false,
  delay = 0
}: CaregiverCardProps) => {
  return (
    <div 
      className={`glass rounded-3xl overflow-hidden card-hover animate-fade-in ${featured ? 'ring-2 ring-eldercare-blue/20' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {featured && (
        <div className="bg-eldercare-blue/10 text-eldercare-blue text-xs font-medium py-1 px-4 text-center">
          Highly Rated
        </div>
      )}
      
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover"
        />
        <button 
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
          aria-label="Add to favorites"
        >
          <Heart className="w-5 h-5 text-eldercare-blue" />
        </button>
      </div>
      
      <div className="p-5">
        <Link to={`/caregivers/${id}`}>
          <h3 className="text-xl font-semibold mb-2 hover:text-eldercare-blue transition-colors">{name}</h3>
        </Link>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-eldercare-accent fill-eldercare-accent" />
            <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
          </div>
          <span className="mx-2 text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">{reviewCount} reviews</span>
          {available && (
            <>
              <span className="mx-2 text-muted-foreground">•</span>
              <span className="text-sm flex items-center text-emerald-600">
                <Check className="w-3 h-3 mr-1" /> Available
              </span>
            </>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {specialties.map((specialty) => (
            <span 
              key={specialty} 
              className="px-2 py-1 bg-eldercare-blueGray text-xs font-medium rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold">${price}</span>
            <span className="text-muted-foreground text-sm ml-1">/hour</span>
          </div>
          
          <Link 
            to={`/book/${id}`}
            className="px-4 py-2 bg-eldercare-blue text-white rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 btn-press"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

const CaregiverSection = () => {
  const caregivers = [
    {
      id: "1",
      name: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      rating: 4.9,
      reviewCount: 127,
      specialties: ["Companionship", "Meal Preparation", "Personal Care"],
      price: 28,
      available: true,
      featured: true
    },
    {
      id: "2",
      name: "Michael Chen",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      rating: 4.7,
      reviewCount: 98,
      specialties: ["Health Support", "Specialized Care"],
      price: 32,
      available: true
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80",
      rating: 4.8,
      reviewCount: 113,
      specialties: ["Companionship", "Emergency Support"],
      price: 30,
      available: false
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 md:flex md:items-end md:justify-between animate-fade-in">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-medium bg-eldercare-lightBlue text-eldercare-blue rounded-full mb-4">
              Our Caregivers
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our <span className="text-eldercare-blue">Expert</span> Caregivers
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Skilled, compassionate professionals dedicated to providing exceptional care for your loved ones.
            </p>
          </div>
          
          <Link
            to="/caregivers"
            className="hidden md:inline-flex items-center mt-6 md:mt-0 px-6 py-3 text-eldercare-blue border border-eldercare-blue/20 rounded-full shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 btn-press"
          >
            View All Caregivers
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caregivers.map((caregiver, index) => (
            <CaregiverCard 
              key={caregiver.id}
              {...caregiver}
              delay={index * 100}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link
            to="/caregivers"
            className="inline-flex items-center px-6 py-3 text-eldercare-blue border border-eldercare-blue/20 rounded-full shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 btn-press"
          >
            View All Caregivers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CaregiverSection;
