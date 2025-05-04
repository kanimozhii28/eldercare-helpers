import React, { useState, useEffect } from 'react';
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
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

// Expanded caregivers array with more profiles and proper categories
const allCaregivers = [
  // Cooking and Meal Preparation specialists
  {
    id: 1,
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.9,
    reviews: 124,
    location: "Brooklyn, NY",
    distance: "2.3 miles away",
    experience: "8 years",
    specialties: ["Meal Preparation", "Special Diets", "Nutritional Planning"],
    hourlyRate: 2800,
    availability: "Weekdays, Evenings",
    verified: true,
    topRated: true,
    category: "cooking"
  },
  {
    id: 5,
    name: "Olivia Thompson",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.9,
    reviews: 112,
    location: "Staten Island, NY",
    distance: "7.1 miles away",
    experience: "9 years",
    specialties: ["Meal Preparation", "Nutrition Planning", "Special Diets"],
    hourlyRate: 3000,
    availability: "Weekdays, Weekends",
    verified: true,
    topRated: true,
    category: "cooking"
  },
  {
    id: 9,
    name: "Carlos Rodriguez",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.8,
    reviews: 87,
    location: "Queens, NY",
    distance: "3.7 miles away",
    experience: "7 years",
    specialties: ["Cultural Cuisines", "Meal Preparation", "Grocery Shopping"],
    hourlyRate: 2600,
    availability: "Weekends, Evenings",
    verified: true,
    topRated: false,
    category: "cooking"
  },
  
  // Personal Care specialists
  {
    id: 10,
    name: "Jessica Wang",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.9,
    reviews: 98,
    location: "Manhattan, NY",
    distance: "1.8 miles away",
    experience: "6 years",
    specialties: ["Personal Care", "Grooming", "Hygiene Assistance"],
    hourlyRate: 2900,
    availability: "Weekdays, Mornings",
    verified: true,
    topRated: true,
    category: "personal"
  },
  {
    id: 11,
    name: "Daniel Smith",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.7,
    reviews: 76,
    location: "Bronx, NY",
    distance: "5.9 miles away",
    experience: "5 years",
    specialties: ["Personal Care", "Bathing Assistance", "Dressing Assistance"],
    hourlyRate: 2700,
    availability: "Full-time",
    verified: true,
    topRated: false,
    category: "personal"
  },
  
  // Medical Care specialists
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
    hourlyRate: 3200,
    availability: "Full-time",
    verified: true,
    topRated: true,
    category: "medical"
  },
  {
    id: 12,
    name: "Dr. Rachel Green",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 5.0,
    reviews: 142,
    location: "Manhattan, NY",
    distance: "2.2 miles away",
    experience: "12 years",
    specialties: ["Wound Care", "Medication Management", "Vital Monitoring"],
    hourlyRate: 3500,
    availability: "Weekdays, On-call",
    verified: true,
    topRated: true,
    category: "medical"
  },
  {
    id: 13,
    name: "Michael Fraser",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.9,
    reviews: 134,
    location: "Brooklyn, NY",
    distance: "3.1 miles away",
    experience: "9 years",
    specialties: ["Diabetes Care", "Cardiac Monitoring", "Post-Surgery Care"],
    hourlyRate: 3100,
    availability: "Full-time",
    verified: true,
    topRated: true,
    category: "medical"
  },
  
  // Companion Care specialists
  {
    id: 14,
    name: "Martha Wilson",
    image: "https://images.unsplash.com/photo-1577565177023-d0f29c354b69?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.8,
    reviews: 89,
    location: "Queens, NY",
    distance: "4.2 miles away",
    experience: "8 years",
    specialties: ["Companionship", "Reading", "Board Games"],
    hourlyRate: 2500,
    availability: "Afternoons, Evenings",
    verified: true,
    topRated: false,
    category: "companion"
  },
  {
    id: 15,
    name: "Thomas Parker",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.7,
    reviews: 93,
    location: "Staten Island, NY",
    distance: "6.5 miles away",
    experience: "7 years",
    specialties: ["Social Interaction", "Memory Activities", "Hobbies Support"],
    hourlyRate: 2400,
    availability: "Weekends, Evenings",
    verified: true,
    topRated: false,
    category: "companion"
  },
  
  // Alzheimer's and Dementia Care specialists
  {
    id: 2,
    name: "Michael Chen",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.7,
    reviews: 89,
    location: "Queens, NY",
    distance: "3.8 miles away",
    experience: "5 years",
    specialties: ["Alzheimer's Care", "Memory Support", "Behavior Management"],
    hourlyRate: 2500,
    availability: "Weekends, Nights",
    verified: true,
    topRated: false,
    category: "alzheimer"
  },
  {
    id: 16,
    name: "Sophia Martinez",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.9,
    reviews: 107,
    location: "Brooklyn, NY",
    distance: "2.7 miles away",
    experience: "11 years",
    specialties: ["Dementia Care", "Safety Monitoring", "Communication Techniques"],
    hourlyRate: 3300,
    availability: "Full-time",
    verified: true,
    topRated: true,
    category: "alzheimer"
  },
  
  // Housekeeping specialists
  {
    id: 6,
    name: "David Kumar",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.7,
    reviews: 94,
    location: "Brooklyn, NY",
    distance: "3.4 miles away",
    experience: "6 years",
    specialties: ["Housekeeping", "Laundry", "Organization"],
    hourlyRate: 2400,
    availability: "Mornings, Afternoons",
    verified: true,
    topRated: false,
    category: "housekeeping"
  },
  {
    id: 17,
    name: "Lucy Peterson",
    image: "https://images.unsplash.com/photo-1560535733-540e0b793799?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.6,
    reviews: 78,
    location: "Manhattan, NY",
    distance: "2.1 miles away",
    experience: "4 years",
    specialties: ["Deep Cleaning", "Sanitization", "Home Organization"],
    hourlyRate: 2200,
    availability: "Weekdays",
    verified: true,
    topRated: false,
    category: "housekeeping"
  },
  
  // Mobility Assistance specialists
  {
    id: 4,
    name: "James Wilson",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.6,
    reviews: 78,
    location: "Bronx, NY",
    distance: "5.2 miles away",
    experience: "4 years",
    specialties: ["Mobility Assistance", "Transfer Support", "Fall Prevention"],
    hourlyRate: 2600,
    availability: "Mornings, Afternoons",
    verified: true,
    topRated: false,
    category: "mobility"
  },
  {
    id: 18,
    name: "Robert Daniels",
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.8,
    reviews: 92,
    location: "Queens, NY",
    distance: "4.1 miles away",
    experience: "6 years",
    specialties: ["Gait Training", "Safe Transfers", "Range of Motion Exercises"],
    hourlyRate: 2700,
    availability: "Full-time",
    verified: true,
    topRated: true,
    category: "mobility"
  },
  
  // Overnight Care specialists
  {
    id: 7,
    name: "Grace Lee",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.8,
    reviews: 132,
    location: "Manhattan, NY",
    distance: "2.2 miles away",
    experience: "11 years",
    specialties: ["Overnight Care", "Sleep Monitoring", "Evening Routines"],
    hourlyRate: 3500,
    availability: "Nights, Weekends",
    verified: true,
    topRated: true,
    category: "overnight"
  },
  {
    id: 19,
    name: "Natalie Rivera",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.7,
    reviews: 88,
    location: "Bronx, NY",
    distance: "5.6 miles away",
    experience: "5 years",
    specialties: ["Night Supervision", "Emergency Response", "Medication Reminders"],
    hourlyRate: 3200,
    availability: "Nights, On-call",
    verified: true,
    topRated: false,
    category: "overnight"
  },
  
  // Transportation specialists
  {
    id: 8,
    name: "Robert Martinez",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.5,
    reviews: 76,
    location: "Queens, NY",
    distance: "4.7 miles away",
    experience: "5 years",
    specialties: ["Transportation", "Errands", "Shopping"],
    hourlyRate: 2700,
    availability: "Weekdays, Mornings",
    verified: true,
    topRated: false,
    category: "transportation"
  },
  {
    id: 20,
    name: "Kevin Zhang",
    image: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.6,
    reviews: 82,
    location: "Brooklyn, NY",
    distance: "3.2 miles away",
    experience: "4 years",
    specialties: ["Appointment Transport", "Shopping Assistance", "Community Outings"],
    hourlyRate: 2500,
    availability: "Flexible",
    verified: true,
    topRated: false,
    category: "transportation"
  }
];

const categoryDescriptions = {
  all: "Find the perfect caregiver with the right expertise and experience for your needs.",
  cooking: "Specialists in meal preparation, nutrition planning, and dietary accommodations.",
  personal: "Experts in personal hygiene, grooming, and daily living assistance.",
  medical: "Professionally trained caregivers for health monitoring and medical support.",
  companion: "Compassionate caregivers focused on social interaction and emotional wellbeing.",
  alzheimer: "Specialized care for memory conditions with proper training and techniques.",
  housekeeping: "Help with maintaining a clean, organized, and safe living environment.",
  mobility: "Support with movement, transfers, and fall prevention.",
  overnight: "Supervision and assistance during nighttime hours for peace of mind.",
  respite: "Temporary relief care for family caregivers who need a break.",
  medication: "Professional oversight of medication schedules and administration.",
  transportation: "Safe transport to appointments, shopping, and community activities.",
  therapy: "Support for physical and occupational therapy exercise programs."
};

const CaregiverCard = ({ caregiver }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
                <span className="font-bold text-lg">₹{caregiver.hourlyRate}/hr</span>
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
                  <Button className="w-full md:w-auto bg-eldercare-blue hover:bg-blue-600 shadow-sm">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Caregivers = () => {
  const [priceRange, setPriceRange] = useState([2000, 3500]);
  const [filteredCaregivers, setFilteredCaregivers] = useState(allCaregivers);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categoryTitle, setCategoryTitle] = useState("All Caregivers");
  const [categoryDescription, setCategoryDescription] = useState(categoryDescriptions.all);
  const location = useLocation();
  
  useEffect(() => {
    // Get category from URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    
    if (category) {
      setSelectedCategory(category);
      filterCaregivers(category);
      updateCategoryInfo(category);
    }
  }, [location]);
  
  const filterCaregivers = (category) => {
    if (category === "all") {
      setFilteredCaregivers(allCaregivers);
    } else {
      const filtered = allCaregivers.filter(caregiver => caregiver.category === category);
      setFilteredCaregivers(filtered);
    }
  };
  
  const updateCategoryInfo = (category) => {
    switch(category) {
      case "cooking":
        setCategoryTitle("Cooking & Meal Preparation");
        setCategoryDescription(categoryDescriptions.cooking);
        break;
      case "personal":
        setCategoryTitle("Personal Care");
        setCategoryDescription(categoryDescriptions.personal);
        break;
      case "medical":
        setCategoryTitle("Medical Care");
        setCategoryDescription(categoryDescriptions.medical);
        break;
      case "companion":
        setCategoryTitle("Companion Care");
        setCategoryDescription(categoryDescriptions.companion);
        break;
      case "alzheimer":
        setCategoryTitle("Alzheimer's & Dementia Care");
        setCategoryDescription(categoryDescriptions.alzheimer);
        break;
      case "housekeeping":
        setCategoryTitle("Housekeeping");
        setCategoryDescription(categoryDescriptions.housekeeping);
        break;
      case "mobility":
        setCategoryTitle("Mobility Assistance");
        setCategoryDescription(categoryDescriptions.mobility);
        break;
      case "overnight":
        setCategoryTitle("Overnight Care");
        setCategoryDescription(categoryDescriptions.overnight);
        break;
      case "respite":
        setCategoryTitle("Respite Care");
        setCategoryDescription(categoryDescriptions.respite);
        break;
      case "medication":
        setCategoryTitle("Medication Management");
        setCategoryDescription(categoryDescriptions.medication);
        break;
      case "transportation":
        setCategoryTitle("Transportation");
        setCategoryDescription(categoryDescriptions.transportation);
        break;
      case "therapy":
        setCategoryTitle("Physical Therapy Support");
        setCategoryDescription(categoryDescriptions.therapy);
        break;
      default:
        setCategoryTitle("All Caregivers");
        setCategoryDescription(categoryDescriptions.all);
    }
  };
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterCaregivers(category);
    updateCategoryInfo(category);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-10 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{categoryTitle}</h1>
            <p className="text-gray-600 mb-6 max-w-3xl">{categoryDescription}</p>
          
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
                  <Select 
                    value={selectedCategory}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Specialties" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      <SelectItem value="cooking">Cooking & Meal Prep</SelectItem>
                      <SelectItem value="personal">Personal Care</SelectItem>
                      <SelectItem value="medical">Medical Care</SelectItem>
                      <SelectItem value="companion">Companion Care</SelectItem>
                      <SelectItem value="alzheimer">Alzheimer's Care</SelectItem>
                      <SelectItem value="housekeeping">Housekeeping</SelectItem>
                      <SelectItem value="mobility">Mobility Assistance</SelectItem>
                      <SelectItem value="overnight">Overnight Care</SelectItem>
                      <SelectItem value="respite">Respite Care</SelectItem>
                      <SelectItem value="medication">Medication Management</SelectItem>
                      <SelectItem value="transportation">Transportation</SelectItem>
                      <SelectItem value="therapy">Physical Therapy</SelectItem>
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
                
                <Button className="bg-eldercare-blue hover:bg-blue-600 shadow-sm">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm" className="text-eldercare-blue hover:text-blue-700">
                    Reset
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Price Range (₹/hour)</h4>
                    <div className="px-2">
                      <Slider 
                        defaultValue={[2000, 3500]} 
                        max={4000}
                        min={1000}
                        step={100}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Category</h4>
                    <Select 
                      value={selectedCategory}
                      onValueChange={handleCategoryChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="cooking">Cooking & Meal Prep</SelectItem>
                        <SelectItem value="personal">Personal Care</SelectItem>
                        <SelectItem value="medical">Medical Care</SelectItem>
                        <SelectItem value="companion">Companion Care</SelectItem>
                        <SelectItem value="alzheimer">Alzheimer's Care</SelectItem>
                        <SelectItem value="housekeeping">Housekeeping</SelectItem>
                        <SelectItem value="mobility">Mobility Assistance</SelectItem>
                        <SelectItem value="overnight">Overnight Care</SelectItem>
                        <SelectItem value="respite">Respite Care</SelectItem>
                        <SelectItem value="medication">Medication Management</SelectItem>
                        <SelectItem value="transportation">Transportation</SelectItem>
                        <SelectItem value="therapy">Physical Therapy</SelectItem>
                      </SelectContent>
                    </Select>
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
                  
                  <Button className="w-full bg-eldercare-blue hover:bg-blue-600 shadow-sm">
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
                <h2 className="text-xl font-semibold">{filteredCaregivers.length} caregivers available</h2>
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
              {filteredCaregivers.map((caregiver) => (
                <CaregiverCard key={caregiver.id} caregiver={caregiver} />
              ))}
            </div>
            
            {filteredCaregivers.length > 0 ? (
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
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No caregivers found for this category.</p>
                <Button 
                  onClick={() => handleCategoryChange("all")} 
                  variant="outline" 
                  className="mt-4"
                >
                  View All Caregivers
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Caregivers;
