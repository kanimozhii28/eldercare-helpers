
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Clock, Star, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define the service data (in a real app, this would come from an API)
const servicesData = {
  'companionship': {
    title: 'Companionship',
    description: 'Our companionship services provide social interaction, conversation, and emotional support for your loved ones, helping to prevent loneliness and isolation.',
    image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    benefits: [
      'Regular social interaction',
      'Engaging conversation',
      'Emotional support',
      'Recreational activities',
      'Cognitive stimulation',
      'Reduced feelings of isolation'
    ],
    includes: [
      'Regular visits from a dedicated caregiver',
      'Engaging activities tailored to interests',
      'Assistance with reading and correspondence',
      'Accompaniment on walks and outings',
      'Transportation to social events',
      'Setup and assistance with video calls to family'
    ],
    pricing: {
      hourly: 25,
      daily: 175,
      weekly: 1050
    }
  },
  'meal-preparation': {
    title: 'Meal Preparation',
    description: 'Our meal preparation services ensure nutritious, healthy meals tailored to dietary needs and preferences, making mealtime enjoyable and stress-free.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    benefits: [
      'Customized meal plans',
      'Nutritionally balanced meals',
      'Special diet accommodation',
      'Reduced grocery shopping stress',
      'Fresh, home-cooked food',
      'Assistance with eating if needed'
    ],
    includes: [
      'Meal planning based on preferences',
      'Grocery shopping',
      'Food preparation and cooking',
      'Special diet accommodation',
      'Kitchen cleanup after cooking',
      'Meal packaging for future consumption'
    ],
    pricing: {
      hourly: 28,
      daily: 195,
      weekly: 1175
    }
  },
  'personal-care': {
    title: 'Personal Care',
    description: 'Our personal care services provide dignified assistance with daily living activities, supporting independence while ensuring comfort and wellbeing.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    benefits: [
      'Dignified assistance',
      'Enhanced personal hygiene',
      'Improved self-esteem',
      'Reduced risk of skin issues',
      'Personalized care routine',
      'Maintaining independence'
    ],
    includes: [
      'Bathing and shower assistance',
      'Dressing and grooming help',
      'Toileting and incontinence care',
      'Mobility assistance',
      'Medication reminders',
      'Positioning and transfer support'
    ],
    pricing: {
      hourly: 30,
      daily: 210,
      weekly: 1260
    }
  },
  'health-support': {
    title: 'Health Support',
    description: 'Our health support services include medication reminders, vital signs monitoring, and assistance with health management for peace of mind.',
    image: 'https://images.unsplash.com/photo-1576671081843-a35ecc5af3d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    benefits: [
      'Medication management',
      'Health monitoring',
      'Early issue detection',
      'Reduced hospital visits',
      'Health record keeping',
      'Coordination with healthcare providers'
    ],
    includes: [
      'Medication reminders and monitoring',
      'Vital signs checking',
      'Coordination with healthcare providers',
      'Assistance with medical equipment',
      'Health record maintenance',
      'Telemedicine appointment support'
    ],
    pricing: {
      hourly: 32,
      daily: 225,
      weekly: 1350
    }
  },
  'emergency-support': {
    title: 'Emergency Support',
    description: 'Our emergency support services ensure immediate assistance during emergencies, with quick response protocols and trained caregivers.',
    image: 'https://images.unsplash.com/photo-1612776572997-76cc592ee7a3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    benefits: [
      'Immediate response',
      'Trained emergency personnel',
      'Medical alert systems',
      'Family notification',
      'Hospital coordination',
      'Post-emergency support'
    ],
    includes: [
      'Immediate assessment of emergency situations',
      'First aid and medical assistance',
      'Emergency service coordination',
      'Family notification protocol',
      'Hospital transportation coordination',
      'Emergency preparedness planning'
    ],
    pricing: {
      hourly: 35,
      daily: 245,
      weekly: 1470
    }
  },
  'specialized-care': {
    title: 'Specialized Care',
    description: 'Our specialized care services provide focused support for specific conditions like dementia, Parkinson\'s, and more, with tailored care plans.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    benefits: [
      'Condition-specific support',
      'Specialized training',
      'Personalized care plans',
      'Improved quality of life',
      'Reduced caregiver stress',
      'Specialized equipment knowledge'
    ],
    includes: [
      'Care from specialized trained caregivers',
      'Condition-specific care techniques',
      'Therapeutic activities',
      'Specialized equipment assistance',
      'Environmental adaptation support',
      'Ongoing condition monitoring'
    ],
    pricing: {
      hourly: 38,
      daily: 265,
      weekly: 1590
    }
  }
};

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  
  if (!serviceId || !servicesData[serviceId as keyof typeof servicesData]) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-16">
          <h1 className="text-2xl font-bold">Service not found</h1>
          <p className="mt-4">The service you're looking for doesn't exist or has been removed.</p>
          <Link to="/services" className="mt-6 inline-block">
            <Button>View All Services</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const service = servicesData[serviceId as keyof typeof servicesData];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-eldercare-blueGray pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/services" className="inline-flex items-center text-eldercare-blue mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h1>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-eldercare-lightBlue flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <Clock className="h-5 w-5 text-eldercare-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium">Flexible Scheduling</h3>
                    <p className="text-sm text-muted-foreground">Available 24/7 with options for hourly, daily, or continuous care.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-eldercare-lightBlue flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <Star className="h-5 w-5 text-eldercare-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium">Vetted Professionals</h3>
                    <p className="text-sm text-muted-foreground">All caregivers undergo extensive background checks and training.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-eldercare-lightBlue flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <Calendar className="h-5 w-5 text-eldercare-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium">Customized Care Plans</h3>
                    <p className="text-sm text-muted-foreground">Personalized care plans tailored to specific needs and preferences.</p>
                  </div>
                </div>
              </div>
              
              <Link to="/caregivers">
                <Button size="lg" className="bg-eldercare-blue hover:bg-blue-600">
                  Find a Caregiver
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            <div className="relative rounded-xl overflow-hidden h-[300px] md:h-auto">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full mb-8 flex justify-center">
              <TabsTrigger value="overview" className="text-base">Overview</TabsTrigger>
              <TabsTrigger value="includes" className="text-base">What's Included</TabsTrigger>
              <TabsTrigger value="pricing" className="text-base">Pricing</TabsTrigger>
              <TabsTrigger value="faq" className="text-base">FAQ</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Benefits of Our {service.title} Service</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-eldercare-lightBlue flex items-center justify-center mr-3 flex-shrink-0">
                        <Check className="h-3.5 w-3.5 text-eldercare-blue" />
                      </div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-6">Why Choose Our {service.title} Service</h2>
                  <div className="prose max-w-none">
                    <p className="mb-4">We understand that each person's needs are unique, which is why our {service.title.toLowerCase()} services are fully customizable to meet individual requirements and preferences.</p>
                    <p className="mb-4">Our caregivers are not only professionally trained but also selected for their compassionate nature and dedication to improving the lives of seniors. They build meaningful relationships with clients, becoming trusted companions who provide both practical assistance and emotional support.</p>
                    <p>With our {service.title.toLowerCase()} services, families gain peace of mind knowing their loved ones are receiving attentive, high-quality care that enhances their quality of life while respecting their dignity and independence.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="includes">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">What's Included in Our {service.title} Service</h2>
                <div className="space-y-4">
                  {service.includes.map((item, index) => (
                    <Card key={index} className="border-none shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-eldercare-lightBlue flex items-center justify-center mr-4 flex-shrink-0">
                            <Check className="h-4 w-4 text-eldercare-blue" />
                          </div>
                          <p>{item}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="pricing">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Pricing for {service.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-medium mb-2">Hourly Rate</h3>
                      <div className="text-3xl font-bold text-eldercare-blue mb-4">${service.pricing.hourly}</div>
                      <p className="text-sm text-muted-foreground">Perfect for occasional support</p>
                      <div className="mt-6">
                        <Link to={`/caregivers?service=${serviceId}&rate=hourly`}>
                          <Button className="w-full bg-eldercare-blue hover:bg-blue-600">
                            Book Now
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="text-center ring-2 ring-eldercare-blue">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-medium mb-2">Daily Rate</h3>
                      <div className="text-3xl font-bold text-eldercare-blue mb-4">${service.pricing.daily}</div>
                      <p className="text-sm text-muted-foreground">8-hour day of continuous care</p>
                      <div className="mt-6">
                        <Link to={`/caregivers?service=${serviceId}&rate=daily`}>
                          <Button className="w-full bg-eldercare-blue hover:bg-blue-600">
                            Book Now
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-medium mb-2">Weekly Rate</h3>
                      <div className="text-3xl font-bold text-eldercare-blue mb-4">${service.pricing.weekly}</div>
                      <p className="text-sm text-muted-foreground">Full weekly coverage (40 hours)</p>
                      <div className="mt-6">
                        <Link to={`/caregivers?service=${serviceId}&rate=weekly`}>
                          <Button className="w-full bg-eldercare-blue hover:bg-blue-600">
                            Book Now
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-8 bg-eldercare-lightBlue p-6 rounded-xl">
                  <h3 className="font-medium mb-2">Custom Care Packages</h3>
                  <p className="text-sm mb-4">Need a customized care plan? We can create a personalized package based on your specific needs.</p>
                  <Link to="/contact">
                    <Button variant="outline" className="border-eldercare-blue text-eldercare-blue hover:bg-eldercare-blue hover:text-white">
                      Contact Us for Custom Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="faq">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-medium mb-2">How quickly can you start providing {service.title.toLowerCase()} services?</h3>
                      <p className="text-sm text-muted-foreground">We can typically begin services within 24-48 hours of an approved care plan. For urgent situations, we offer expedited start options.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-medium mb-2">Can I choose the same caregiver for all visits?</h3>
                      <p className="text-sm text-muted-foreground">Yes, we prioritize consistency in care. We assign a primary caregiver to each client and provide backup caregivers for occasions when the primary caregiver is unavailable.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-medium mb-2">Are your {service.title.toLowerCase()} services covered by insurance?</h3>
                      <p className="text-sm text-muted-foreground">Some long-term care insurance policies may cover our services. We can provide documentation to help you apply for reimbursement from your insurance provider.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-medium mb-2">Can I change or adjust the care plan after it starts?</h3>
                      <p className="text-sm text-muted-foreground">Absolutely. We understand that care needs may change over time. We regularly review care plans and make adjustments as needed to ensure they continue to meet your loved one's needs.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <div className="bg-eldercare-blue py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Get Started with Our {service.title} Service?</h2>
          <p className="max-w-2xl mx-auto mb-8">Our team is ready to help you find the perfect caregiver for your loved one's needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/caregivers">
              <Button size="lg" variant="secondary">
                Browse Caregivers
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-eldercare-blue">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ServiceDetail;
