
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search, Filter, Star, MapPin, Clock, Calendar, Heart, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const caregivers = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.9,
    reviews: 124,
    location: "Brooklyn, NY",
    distance: "2.3 miles away",
    experience: "8 years",
    specialties: ["Dementia Care", "Meal Preparation", "Medication Management"],
    hourlyRate: 28,
    availability: "Weekdays, Evenings",
    verified: true,
    topRated: true
  },
  {
    id: 2,
    name: "Michael Chen",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.7,
    reviews: 89,
    location: "Queens, NY",
    distance: "3.8 miles away",
    experience: "5 years",
    specialties: ["Alzheimer's Care", "Personal Care", "Companionship"],
    hourlyRate: 25,
    availability: "Weekends, Nights",
    verified: true,
    topRated: false
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.8,
    reviews: 156,
    location: "Manhattan, NY",
    distance: "1.5 miles away",
    experience: "10 years",
    specialties: ["Parkinson's Care", "Physical Therapy Support", "Health Monitoring"],
    hourlyRate: 32,
    availability: "Full-time",
    verified: true,
    topRated: true
  },
  {
    id: 4,
    name: "James Wilson",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.6,
    reviews: 78,
    location: "Bronx, NY",
    distance: "5.2 miles away",
    experience: "4 years",
    specialties: ["Post-Hospital Care", "Mobility Assistance", "Medication Management"],
    hourlyRate: 26,
    availability: "Mornings, Afternoons",
    verified: true,
    topRated: false
  }
];

const CaregiverCard = ({ caregiver }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-1/3">
            <img 
              src={caregiver.image} 
              alt={caregiver.name} 
              className="w-full h-60 md:h-full object-cover"
            />
            {caregiver.topRated && (
              <Badge className="absolute top-3 left-3 bg-eldercare-blue">
                <Award className="h-3 w-3 mr-1" /> Top Rated
              </Badge>
            )}
            <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
              <Heart className="h-4 w-4 text-gray-500 hover:text-red-500" />
            </button>
          </div>
          
          <div className="p-6 md:w-2/3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-1">{caregiver.name}</h3>
                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                  <span className="font-medium">{caregiver.rating}</span>
                  <span className="text-muted-foreground ml-1">({caregiver.reviews})</span>
                </div>
              </div>
              <span className="font-bold text-lg">${caregiver.hourlyRate}/hr</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <span>{caregiver.distance}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span>{caregiver.experience} experience</span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span>{caregiver.availability}</span>
              </div>
              {caregiver.verified && (
                <div className="flex items-center text-sm text-eldercare-blue">
                  <Badge variant="outline" className="border-eldercare-blue text-eldercare-blue">
                    Verified
                  </Badge>
                </div>
              )}
            </div>
            
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {caregiver.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="bg-eldercare-lightBlue text-eldercare-blue">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mt-4">
              <Link to={`/caregivers/booking/${caregiver.id}`}>
                <Button className="w-full md:w-auto bg-eldercare-blue hover:bg-blue-600">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Caregivers = () => {
  const [priceRange, setPriceRange] = useState([20, 50]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-10 bg-eldercare-blueGray">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Find Your Perfect Caregiver</h1>
          
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  placeholder="Search by location, specialty..." 
                  className="pl-10"
                />
              </div>
              
              <div className="w-full md:w-48">
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Specialties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    <SelectItem value="dementia">Dementia Care</SelectItem>
                    <SelectItem value="alzheimers">Alzheimer's Care</SelectItem>
                    <SelectItem value="parkinsons">Parkinson's Care</SelectItem>
                    <SelectItem value="post-hospital">Post-Hospital Care</SelectItem>
                    <SelectItem value="meal-prep">Meal Preparation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full md:w-48">
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Time</SelectItem>
                    <SelectItem value="weekdays">Weekdays</SelectItem>
                    <SelectItem value="weekends">Weekends</SelectItem>
                    <SelectItem value="mornings">Mornings</SelectItem>
                    <SelectItem value="evenings">Evenings</SelectItem>
                    <SelectItem value="nights">Overnight</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="bg-eldercare-blue hover:bg-blue-600">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm" className="text-eldercare-blue hover:text-blue-700">
                    Reset
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Price Range ($/hour)</h4>
                    <div className="px-2">
                      <Slider 
                        defaultValue={[20, 50]} 
                        max={100}
                        min={10}
                        step={1}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Distance</h4>
                    <Select defaultValue="5">
                      <SelectTrigger>
                        <SelectValue placeholder="Select distance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Within 1 mile</SelectItem>
                        <SelectItem value="5">Within 5 miles</SelectItem>
                        <SelectItem value="10">Within 10 miles</SelectItem>
                        <SelectItem value="20">Within 20 miles</SelectItem>
                        <SelectItem value="50">Within 50 miles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Experience</h4>
                    <Select defaultValue="any">
                      <SelectTrigger>
                        <SelectValue placeholder="Years of experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any experience</SelectItem>
                        <SelectItem value="1">1+ years</SelectItem>
                        <SelectItem value="3">3+ years</SelectItem>
                        <SelectItem value="5">5+ years</SelectItem>
                        <SelectItem value="10">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Rating</h4>
                    <Select defaultValue="any">
                      <SelectTrigger>
                        <SelectValue placeholder="Minimum rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any rating</SelectItem>
                        <SelectItem value="4">4+ stars</SelectItem>
                        <SelectItem value="4.5">4.5+ stars</SelectItem>
                        <SelectItem value="4.8">4.8+ stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full bg-eldercare-blue hover:bg-blue-600">
                    <Filter className="h-4 w-4 mr-2" />
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">24 caregivers available</h2>
                <p className="text-muted-foreground">Find your ideal match</p>
              </div>
              
              <Select defaultValue="recommended">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="rating-high">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Lowest Price</SelectItem>
                  <SelectItem value="price-high">Highest Price</SelectItem>
                  <SelectItem value="experience">Most Experienced</SelectItem>
                  <SelectItem value="distance">Closest to You</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-6">
              {caregivers.map((caregiver) => (
                <CaregiverCard key={caregiver.id} caregiver={caregiver} />
              ))}
            </div>
            
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Caregivers;
