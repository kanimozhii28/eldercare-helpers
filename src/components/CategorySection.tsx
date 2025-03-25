
import React from 'react';
import { Heart, Utensils, Users, First, ShieldAlert, CalendarClock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  delay: number;
}

const CategoryCard = ({ icon, title, description, link, delay }: CategoryCardProps) => {
  return (
    <Link 
      to={link}
      className="glass rounded-2xl p-6 card-hover"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-14 h-14 rounded-xl bg-eldercare-lightBlue flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </Link>
  );
};

const categories = [
  {
    icon: <Heart className="w-6 h-6 text-eldercare-blue" />,
    title: "Companionship",
    description: "Social interaction, conversation, and emotional support for your loved ones.",
    link: "/services/companionship"
  },
  {
    icon: <Utensils className="w-6 h-6 text-eldercare-blue" />,
    title: "Meal Preparation",
    description: "Nutritious meal planning and preparation based on dietary needs.",
    link: "/services/meal-preparation"
  },
  {
    icon: <Users className="w-6 h-6 text-eldercare-blue" />,
    title: "Personal Care",
    description: "Assistance with personal hygiene, mobility, and daily living activities.",
    link: "/services/personal-care"
  },
  {
    icon: <First className="w-6 h-6 text-eldercare-blue" />,
    title: "Health Support",
    description: "Medication reminders, vital signs monitoring, and health assistance.",
    link: "/services/health-support"
  },
  {
    icon: <ShieldAlert className="w-6 h-6 text-eldercare-blue" />,
    title: "Emergency Support",
    description: "Immediate assistance during emergencies and crisis situations.",
    link: "/services/emergency-support"
  },
  {
    icon: <CalendarClock className="w-6 h-6 text-eldercare-blue" />,
    title: "Specialized Care",
    description: "Specialized support for conditions like dementia, Parkinson's, and more.",
    link: "/services/specialized-care"
  }
];

const CategorySection = () => {
  return (
    <section className="py-16 md:py-24 bg-eldercare-blueGray relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-eldercare-blueGray"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-eldercare-lightBlue text-eldercare-blue rounded-full mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive Care <span className="text-eldercare-blue">Categories</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Browse through our range of elder care services designed to meet various needs and preferences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <CategoryCard 
              key={category.title}
              icon={category.icon}
              title={category.title}
              description={category.description}
              link={category.link}
              delay={index * 100}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link
            to="/services"
            className="inline-flex items-center px-6 py-3 text-eldercare-blue border border-eldercare-blue/20 rounded-full shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 btn-press"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
