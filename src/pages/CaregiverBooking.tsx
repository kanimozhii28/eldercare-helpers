import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, DollarSign, MapPin, CalendarCheck, User, Home } from 'lucide-react';
import { format, addDays } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';

// Extended caregivers data
const caregivers = {
  "1": {
    id: 1,
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.9,
    reviews: 124,
    location: "Brooklyn, NY",
    distance: "2.3 miles away",
    experience: "8 years",
    specialties: ["Dementia Care", "Meal Preparation", "Medication Management"],
    hourlyRate: 2800,
    availability: "Weekdays, Evenings",
    bio: "I've been a dedicated caregiver for over 8 years, specializing in dementia care and medication management. My approach centers on creating a safe, engaging environment where seniors can maintain their dignity and enjoy a high quality of life. I believe in fostering genuine connections with those I care for, adapting to their unique needs and preferences.",
    education: "Certified Nursing Assistant (CNA), Dementia Care Specialist",
    languages: ["English", "Spanish"],
    verified: true
  },
  "2": {
    id: 2,
    name: "Michael Chen",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.7,
    reviews: 89,
    location: "Queens, NY",
    distance: "3.8 miles away",
    experience: "5 years",
    specialties: ["Alzheimer's Care", "Personal Care", "Companionship"],
    hourlyRate: 2500,
    availability: "Weekends, Nights",
    bio: "With 5 years of experience in elder care, I specialize in Alzheimer's care and personal assistance. I'm committed to providing compassionate, patient-centered care that enhances the quality of life for seniors. I enjoy building meaningful relationships with my clients and their families, offering both professional support and genuine companionship.",
    education: "Home Health Aide Certification, Alzheimer's Care Training",
    languages: ["English", "Mandarin", "Cantonese"],
    verified: true
  },
  "3": {
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
    bio: "I bring a decade of experience in elder care, with specialized training in Parkinson's care and physical therapy support. My goal is to help seniors maintain their independence and dignity through personalized care plans that address their specific needs. I'm dedicated to providing not just physical assistance, but also emotional support and companionship.",
    education: "Licensed Practical Nurse (LPN), Physical Therapy Assistant Certification",
    languages: ["English", "Spanish"],
    verified: true
  },
  "4": {
    id: 4,
    name: "James Wilson",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.6,
    reviews: 78,
    location: "Bronx, NY",
    distance: "5.2 miles away",
    experience: "4 years",
    specialties: ["Post-Hospital Care", "Mobility Assistance", "Medication Management"],
    hourlyRate: 2600,
    availability: "Mornings, Afternoons",
    bio: "Over my 4 years as a caregiver, I've developed expertise in post-hospital care and mobility assistance. I'm passionate about helping seniors recover and maintain their independence through personalized support. I take a holistic approach to caregiving, focusing on both physical needs and emotional well-being to ensure a positive, dignified aging experience.",
    education: "Certified Nursing Assistant (CNA), Post-Acute Care Certification",
    languages: ["English"],
    verified: true
  },
  "5": {
    id: 5,
    name: "Priya Patel",
    image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.8,
    reviews: 92,
    location: "Staten Island, NY",
    distance: "6.7 miles away",
    experience: "6 years",
    specialties: ["Memory Care", "Diabetes Management", "Companionship"],
    hourlyRate: 2700,
    availability: "Weekdays, Weekends",
    bio: "With 6 years of caregiving experience, I specialize in memory care and diabetes management. I'm dedicated to creating a supportive, nurturing environment for seniors, helping them navigate health challenges while maintaining their dignity and independence. My approach combines medical knowledge with genuine compassion and respect for each individual's unique needs.",
    education: "Registered Nurse (RN), Certified Diabetes Educator",
    languages: ["English", "Hindi", "Gujarati"],
    verified: true
  },
  "6": {
    id: 6,
    name: "David Thompson",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.5,
    reviews: 67,
    location: "Brooklyn, NY",
    distance: "3.1 miles away",
    experience: "3 years",
    specialties: ["Stroke Recovery", "Physical Therapy Support", "Daily Living Assistance"],
    hourlyRate: 2400,
    availability: "Flexible Hours",
    bio: "During my 3 years as a caregiver, I've focused on helping seniors recover from strokes and other mobility challenges. I'm passionate about supporting individuals through their recovery journey, celebrating each milestone along the way. My background in physical therapy allows me to provide specialized assistance that promotes independence and improved quality of life.",
    education: "Physical Therapy Assistant, Stroke Rehabilitation Specialist",
    languages: ["English"],
    verified: true
  },
  "7": {
    id: 7,
    name: "Sophia Martinez",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.9,
    reviews: 145,
    location: "Queens, NY",
    distance: "2.9 miles away",
    experience: "9 years",
    specialties: ["Hospice Care", "Pain Management", "Emotional Support"],
    hourlyRate: 3000,
    availability: "24/7 Availability",
    bio: "With 9 years of experience in hospice and palliative care, I provide compassionate support for seniors and their families during challenging times. My approach focuses on comfort, dignity, and quality of life. I'm committed to offering not just physical care, but also emotional and spiritual support tailored to each individual's needs and preferences.",
    education: "Hospice and Palliative Care Certification, End of Life Doula",
    languages: ["English", "Spanish"],
    verified: true
  },
  "8": {
    id: 8,
    name: "Robert Kim",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.7,
    reviews: 104,
    location: "Manhattan, NY",
    distance: "1.8 miles away",
    experience: "7 years",
    specialties: ["Cardiac Care", "Medication Management", "Nutrition Support"],
    hourlyRate: 2900,
    availability: "Weekdays, Some Weekends",
    bio: "Over my 7-year career, I've specialized in cardiac care and nutrition support for seniors. My background in nursing allows me to provide comprehensive care that addresses both medical needs and overall wellness. I focus on developing personalized care plans that promote heart health, proper nutrition, and an active lifestyle tailored to each individual's capabilities.",
    education: "Licensed Practical Nurse (LPN), Cardiac Care Specialist",
    languages: ["English", "Korean"],
    verified: true
  },
  "9": {
    id: 9,
    name: "Amara Okafor",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.8,
    reviews: 118,
    location: "Bronx, NY",
    distance: "4.5 miles away",
    experience: "6 years",
    specialties: ["Respiratory Care", "Post-Surgery Recovery", "Wound Care"],
    hourlyRate: 2800,
    availability: "Full-time",
    bio: "With 6 years of specialized experience in respiratory and post-surgical care, I help seniors recover safely and comfortably. My nursing background gives me the expertise to manage complex medical needs while providing compassionate, personalized care. I'm dedicated to supporting my clients through their recovery journey with patience, skill, and genuine concern for their wellbeing.",
    education: "Registered Nurse (RN), Wound Care Certification",
    languages: ["English", "Igbo"],
    verified: true
  },
  "10": {
    id: 10,
    name: "Thomas Greene",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.6,
    reviews: 83,
    location: "Staten Island, NY",
    distance: "7.3 miles away",
    experience: "5 years",
    specialties: ["Parkinson's Care", "Mobility Assistance", "Meal Preparation"],
    hourlyRate: 2600,
    availability: "Weekdays, Evenings",
    bio: "During my 5 years as a caregiver, I've developed expertise in supporting seniors with Parkinson's disease and other mobility challenges. I focus on creating a safe, supportive environment that promotes independence and dignity. My approach combines practical assistance with encouragement, helping clients maintain their quality of life and continue engaging in activities they enjoy.",
    education: "Parkinson's Disease Care Certification, Home Health Aide",
    languages: ["English"],
    verified: true
  },
  "11": {
    id: 11,
    name: "Aisha Mahmood",
    image: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.9,
    reviews: 137,
    location: "Queens, NY",
    distance: "3.2 miles away",
    experience: "8 years",
    specialties: ["Diabetes Management", "Nutrition Guidance", "Personal Care"],
    hourlyRate: 2900,
    availability: "Flexible Hours",
    bio: "With 8 years of experience in elder care, I specialize in diabetes management and nutrition support. My background in dietetics allows me to create personalized meal plans that support health goals while accommodating preferences and restrictions. I'm passionate about empowering seniors to take an active role in managing their health through education and practical support.",
    education: "Certified Diabetes Educator, Registered Dietitian",
    languages: ["English", "Urdu", "Hindi"],
    verified: true
  },
  "12": {
    id: 12,
    name: "Daniel Cohen",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.7,
    reviews: 95,
    location: "Manhattan, NY",
    distance: "2.0 miles away",
    experience: "6 years",
    specialties: ["Memory Care", "Cognitive Exercises", "Emotional Support"],
    hourlyRate: 2700,
    availability: "Full-time",
    bio: "Over my 6 years in memory care, I've developed expertise in supporting seniors with Alzheimer's and other forms of dementia. I focus on creating a calm, structured environment that reduces anxiety and confusion while encouraging cognitive engagement. My approach combines practical assistance with activities that stimulate memory and promote emotional wellbeing.",
    education: "Dementia Care Specialist, Psychology Degree",
    languages: ["English", "Hebrew"],
    verified: true
  },
  "13": {
    id: 13,
    name: "Grace Liu",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.8,
    reviews: 112,
    location: "Brooklyn, NY",
    distance: "2.7 miles away",
    experience: "7 years",
    specialties: ["Traditional Chinese Medicine", "Arthritis Care", "Fall Prevention"],
    hourlyRate: 2800,
    availability: "Weekdays, Weekends",
    bio: "With 7 years of caregiving experience, I integrate traditional Chinese wellness practices with modern care techniques. I specialize in arthritis management and fall prevention, helping seniors maintain mobility and reduce pain. My approach focuses on holistic wellness, addressing physical needs while also supporting emotional and spiritual wellbeing.",
    education: "Traditional Chinese Medicine Practitioner, Certified Nursing Assistant (CNA)",
    languages: ["English", "Mandarin", "Cantonese"],
    verified: true
  },
  "14": {
    id: 14,
    name: "Marcus Johnson",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.6,
    reviews: 87,
    location: "Bronx, NY",
    distance: "5.1 miles away",
    experience: "4 years",
    specialties: ["Physical Therapy Support", "Strength Training", "Rehabilitation"],
    hourlyRate: 2600,
    availability: "Mornings, Afternoons",
    bio: "During my 4 years as a caregiver, I've focused on helping seniors regain and maintain physical strength and mobility. My background in sports medicine informs my approach to senior fitness and rehabilitation. I create personalized exercise programs that are safe, effective, and adaptable to each individual's abilities, helping them stay active and independent.",
    education: "Physical Therapy Assistant, Exercise Science Degree",
    languages: ["English"],
    verified: true
  },
  "15": {
    id: 15,
    name: "Fatima Al-Farsi",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.9,
    reviews: 129,
    location: "Queens, NY",
    distance: "3.9 miles away",
    experience: "9 years",
    specialties: ["Post-Stroke Care", "Language Therapy Support", "Mobility Assistance"],
    hourlyRate: 3000,
    availability: "Full-time",
    bio: "With 9 years of experience in post-stroke care, I specialize in supporting seniors through their recovery journey. My training in speech therapy allows me to provide exercises that help regain communication skills, while my expertise in mobility assistance promotes physical recovery. I'm dedicated to patient, compassionate care that celebrates every step of progress.",
    education: "Speech Therapy Assistant, Stroke Rehabilitation Specialist",
    languages: ["English", "Arabic"],
    verified: true
  },
  "16": {
    id: 16,
    name: "William Patel",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.7,
    reviews: 91,
    location: "Staten Island, NY",
    distance: "6.5 miles away",
    experience: "5 years",
    specialties: ["Respiratory Care", "COPD Management", "Oxygen Therapy"],
    hourlyRate: 2700,
    availability: "Weekdays, Some Weekends",
    bio: "Over my 5 years as a respiratory care specialist, I've helped seniors manage conditions like COPD, asthma, and other breathing difficulties. I provide support with oxygen therapy, breathing exercises, and medication management. My approach focuses on improving quality of life through better breathing, allowing seniors to engage more fully in daily activities and enjoy greater independence.",
    education: "Respiratory Therapy Technician, Pulmonary Rehabilitation Specialist",
    languages: ["English", "Gujarati"],
    verified: true
  },
  "17": {
    id: 17,
    name: "Carmen Diaz",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.8,
    reviews: 108,
    location: "Brooklyn, NY",
    distance: "2.9 miles away",
    experience: "7 years",
    specialties: ["Diabetes Care", "Wound Management", "Nutrition Support"],
    hourlyRate: 2800,
    availability: "Flexible Hours",
    bio: "With 7 years of specialized experience in diabetes care, I help seniors manage their condition through proper monitoring, medication management, and lifestyle support. My nursing background gives me expertise in wound care and diabetes-related complications. I focus on education and empowerment, helping clients understand their condition and take an active role in their health.",
    education: "Registered Nurse (RN), Certified Diabetes Educator",
    languages: ["English", "Spanish"],
    verified: true
  },
  "18": {
    id: 18,
    name: "Jonathan Kim",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.6,
    reviews: 82,
    location: "Manhattan, NY",
    distance: "1.7 miles away",
    experience: "4 years",
    specialties: ["Technology Assistance", "Companionship", "Mental Stimulation"],
    hourlyRate: 2500,
    availability: "Weekdays, Evenings",
    bio: "During my 4 years as a caregiver, I've specialized in helping seniors bridge the technology gap, teaching them to use devices to connect with loved ones and access information. Beyond tech support, I focus on providing companionship and mental stimulation through conversation, games, and activities. I believe in fostering independence and lifelong learning for enhanced quality of life.",
    education: "Computer Science Degree, Elder Care Certification",
    languages: ["English", "Korean"],
    verified: true
  },
  "19": {
    id: 19,
    name: "Nicole Williams",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.9,
    reviews: 142,
    location: "Bronx, NY",
    distance: "4.8 miles away",
    experience: "8 years",
    specialties: ["Hospice Care", "End-of-Life Support", "Family Counseling"],
    hourlyRate: 3000,
    availability: "24/7 Availability",
    bio: "With 8 years in hospice care, I provide compassionate support for seniors and their families during life's most challenging transition. My approach focuses on comfort, dignity, and quality of life, addressing physical, emotional, and spiritual needs. I work closely with families, offering guidance and support while creating space for meaningful moments and connections in final days.",
    education: "Hospice and Palliative Care Nurse, Grief Counselor",
    languages: ["English"],
    verified: true
  },
  "20": {
    id: 20,
    name: "Raj Singh",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.7,
    reviews: 97,
    location: "Queens, NY",
    distance: "3.4 miles away",
    experience: "6 years",
    specialties: ["Medication Management", "Chronic Disease Care", "Personal Assistance"],
    hourlyRate: 2700,
    availability: "Full-time",
    bio: "Over my 6 years as a caregiver, I've developed expertise in medication management and chronic disease care. My pharmacy background allows me to provide informed support with complex medication regimens, ensuring safety and effectiveness. I focus on creating comprehensive care plans that address all aspects of health and wellness, promoting independence and quality of life.",
    education: "Pharmacy Technician, Chronic Disease Management Certification",
    languages: ["English", "Hindi", "Punjabi"],
    verified: true
  },
  "21": {
    id: 21,
    name: "Olivia Thompson",
    image: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.8,
    reviews: 115,
    location: "Brooklyn, NY",
    distance: "2.6 miles away",
    experience: "7 years",
    specialties: ["Music Therapy", "Dementia Care", "Emotional Support"],
    hourlyRate: 2800,
    availability: "Weekdays, Weekends",
    bio: "With 7 years in elder care, I integrate music therapy into dementia care, using familiar songs to evoke memories and improve mood. My approach combines creative engagement with practical assistance, creating a nurturing environment where seniors feel safe and valued. I'm passionate about connecting with each individual's unique personality and preferences to provide truly personalized care.",
    education: "Music Therapy Certification, Dementia Care Specialist",
    languages: ["English"],
    verified: true
  },
  "22": {
    id: 22,
    name: "Benjamin Lee",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.6,
    reviews: 85,
    location: "Manhattan, NY",
    distance: "1.9 miles away",
    experience: "5 years",
    specialties: ["Rehabilitation Support", "Transfer Assistance", "Exercise Guidance"],
    hourlyRate: 2600,
    availability: "Mornings, Afternoons",
    bio: "During my 5 years as a rehabilitation assistant, I've helped seniors recover from surgeries, injuries, and health setbacks. I provide safe transfer assistance and personalized exercise guidance to improve strength and mobility. My approach focuses on gradual progress with consistent encouragement, helping clients regain confidence in their abilities and move toward greater independence.",
    education: "Occupational Therapy Assistant, Rehabilitation Aide Certification",
    languages: ["English", "Vietnamese"],
    verified: true
  },
  "23": {
    id: 23,
    name: "Maria Gonzalez",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.9,
    reviews: 131,
    location: "Bronx, NY",
    distance: "4.3 miles away",
    experience: "8 years",
    specialties: ["Alzheimer's Care", "Behavior Management", "Family Support"],
    hourlyRate: 2900,
    availability: "Full-time",
    bio: "With 8 years specializing in Alzheimer's care, I provide compassionate support for seniors experiencing cognitive decline. I use evidence-based approaches to manage challenging behaviors while preserving dignity and quality of life. My experience includes guiding families through the journey of cognitive decline, offering both practical advice and emotional support during difficult transitions.",
    education: "Alzheimer's Disease and Dementia Care Specialist, Psychology Degree",
    languages: ["English", "Spanish"],
    verified: true
  },
  "24": {
    id: 24,
    name: "Anthony Miller",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.7,
    reviews: 93,
    location: "Staten Island, NY",
    distance: "7.1 miles away",
    experience: "6 years",
    specialties: ["Palliative Care", "Pain Management", "Comfort Measures"],
    hourlyRate: 2700,
    availability: "Flexible Hours",
    bio: "Over my 6 years in palliative care, I've focused on enhancing quality of life for seniors with serious illnesses. My approach centers on comprehensive pain management and comfort measures while supporting emotional and spiritual needs. I work closely with healthcare teams and families to ensure care plans align with the individual's wishes, values, and goals for their care journey.",
    education: "Palliative Care Certification, Pain Management Specialist",
    languages: ["English"],
    verified: true
  }
};

const timeSlots = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", 
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", 
  "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"
];

const CaregiverBooking = () => {
  const { caregiverId } = useParams<{ caregiverId: string }>();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [duration, setDuration] = useState<string>("2");
  const [careType, setCareType] = useState<string>("standard");
  
  if (!caregiverId || !caregivers[caregiverId as keyof typeof caregivers]) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-16">
          <h1 className="text-2xl font-bold">Caregiver not found</h1>
          <p className="mt-4">The caregiver you're looking for doesn't exist or has been removed.</p>
          <Link to="/caregivers" className="mt-6 inline-block">
            <Button>Browse Caregivers</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const caregiver = caregivers[caregiverId as keyof typeof caregivers];
  
  const handleBooking = () => {
    if (!date || !timeSlot) {
      toast({
        title: "Missing information",
        description: "Please select a date and time for your appointment.",
        variant: "destructive"
      });
      return;
    }
    
    navigate("/payment", { 
      state: { 
        caregiver,
        booking: {
          date: format(date, "MMMM d, yyyy"),
          time: timeSlot,
          duration: parseInt(duration),
          careType,
          total: calculateTotal()
        }
      } 
    });
  };
  
  const calculateTotal = () => {
    const hourlyRate = caregiver.hourlyRate;
    const hours = parseInt(duration);
    let multiplier = 1;
    
    if (careType === "premium") {
      multiplier = 1.25;
    } else if (careType === "basic") {
      multiplier = 0.9;
    }
    
    return (hourlyRate * hours * multiplier).toFixed(2);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-10 bg-eldercare-blueGray">
        <div className="container mx-auto px-4">
          <Link to="/caregivers" className="inline-flex items-center text-eldercare-blue mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Caregivers
          </Link>
          
          <h1 className="text-3xl font-bold mb-2">Book an Appointment with {caregiver.name}</h1>
          <p className="text-muted-foreground">Select your preferred date, time, and service details</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-eldercare-blue" />
                  Select Date & Time
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <Label className="mb-2 block">Select Date</Label>
                    <div className="border rounded-md p-4">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date()}
                        className="rounded-md border"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Select Time</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant={timeSlot === time ? "default" : "outline"}
                          className={`text-sm ${timeSlot === time ? 'bg-eldercare-blue' : ''}`}
                          onClick={() => setTimeSlot(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-eldercare-blue" />
                  Care Details
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="duration" className="mb-2 block">Session Duration</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger id="duration" className="w-full">
                        <SelectValue placeholder="Select hours" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="6">6 hours</SelectItem>
                        <SelectItem value="8">8 hours (Full day)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Care Type</Label>
                    <RadioGroup value={careType} onValueChange={setCareType} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className={`border rounded-lg p-4 cursor-pointer ${careType === 'basic' ? 'border-eldercare-blue bg-eldercare-lightBlue/20' : ''}`}>
                        <RadioGroupItem value="basic" id="basic" className="sr-only" />
                        <Label htmlFor="basic" className="cursor-pointer">
                          <div className="font-medium mb-1">Basic Care</div>
                          <div className="text-sm text-muted-foreground">Essential support services</div>
                          <div className="mt-2 text-sm text-eldercare-blue">10% discount</div>
                        </Label>
                      </div>
                      <div className={`border rounded-lg p-4 cursor-pointer ${careType === 'standard' ? 'border-eldercare-blue bg-eldercare-lightBlue/20' : ''}`}>
                        <RadioGroupItem value="standard" id="standard" className="sr-only" />
                        <Label htmlFor="standard" className="cursor-pointer">
                          <div className="font-medium mb-1">Standard Care</div>
                          <div className="text-sm text-muted-foreground">Comprehensive personal care</div>
                          <div className="mt-2 text-sm text-eldercare-blue">Regular price</div>
                        </Label>
                      </div>
                      <div className={`border rounded-lg p-4 cursor-pointer ${careType === 'premium' ? 'border-eldercare-blue bg-eldercare-lightBlue/20' : ''}`}>
                        <RadioGroupItem value="premium" id="premium" className="sr-only" />
                        <Label htmlFor="premium" className="cursor-pointer">
                          <div className="font-medium mb-1">Premium Care</div>
                          <div className="text-sm text-muted-foreground">Advanced specialized care</div>
                          <div className="mt-2 text-sm text-eldercare-blue">25% premium</div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label htmlFor="address" className="mb-2 block">Care Location</Label>
                    <div className="flex gap-4">
                      <div className="w-full">
                        <Input id="address" placeholder="Enter address for care" />
                      </div>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline" className="shrink-0">
                            <MapPin className="h-4 w-4 mr-2" />
                            Map
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[90vw] sm:w-[540px]">
                          <SheetHeader>
                            <SheetTitle>Select Location</SheetTitle>
                            <SheetDescription>
                              Choose the exact location where care will be provided.
                            </SheetDescription>
                          </SheetHeader>
                          <div className="mt-6 h-[70vh] bg-gray-100 rounded-md flex items-center justify-center">
                            <p className="text-muted-foreground text-center">
                              Map integration would be implemented here
                              <br />
                              (Google Maps, Mapbox, etc.)
                            </p>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="notes" className="mb-2 block">Special Instructions (Optional)</Label>
                    <textarea 
                      id="notes" 
                      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-eldercare-blue/20 min-h-[100px]"
                      placeholder="Any specific needs, preferences, or instructions for the caregiver..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={caregiver.image} 
                  alt={caregiver.name} 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{caregiver.name}</h3>
                  <div className="text-sm text-muted-foreground">{caregiver.experience} experience</div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{date ? format(date, "MMMM d, yyyy") : "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">{timeSlot || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{duration} hour{parseInt(duration) > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Care Type:</span>
                  <span className="font-medium capitalize">{careType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rate:</span>
                  <span className="font-medium">₹{caregiver.hourlyRate}/hour</span>
                </div>
                
                <Separator className="my-2" />
                
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span className="text-eldercare-blue">₹{calculateTotal()}</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6 bg-eldercare-blue hover:bg-blue-600"
                onClick={handleBooking}
              >
                Proceed to Payment
              </Button>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                By booking, you agree to our Terms of Service and Cancellation Policy
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CaregiverBooking;
