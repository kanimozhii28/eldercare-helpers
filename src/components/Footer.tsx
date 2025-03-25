
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-eldercare-warmGray pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <span className="text-xl font-semibold bg-gradient-to-r from-eldercare-blue to-blue-600 bg-clip-text text-transparent">ElderCare</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Connecting families with trusted caregivers to provide exceptional care for elderly loved ones.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all btn-press" aria-label="Facebook">
                <Facebook className="w-5 h-5 text-eldercare-blue" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all btn-press" aria-label="Twitter">
                <Twitter className="w-5 h-5 text-eldercare-blue" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all btn-press" aria-label="Instagram">
                <Instagram className="w-5 h-5 text-eldercare-blue" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all btn-press" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 text-eldercare-blue" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services/companionship" className="text-muted-foreground hover:text-eldercare-blue transition-colors">
                  Companionship
                </Link>
              </li>
              <li>
                <Link to="/services/meal-preparation" className="text-muted-foreground hover:text-eldercare-blue transition-colors">
                  Meal Preparation
                </Link>
              </li>
              <li>
                <Link to="/services/personal-care" className="text-muted-foreground hover:text-eldercare-blue transition-colors">
                  Personal Care
                </Link>
              </li>
              <li>
                <Link to="/services/health-support" className="text-muted-foreground hover:text-eldercare-blue transition-colors">
                  Health Support
                </Link>
              </li>
              <li>
                <Link to="/services/emergency-support" className="text-muted-foreground hover:text-eldercare-blue transition-colors">
                  Emergency Support
                </Link>
              </li>
              <li>
                <Link to="/services/specialized-care" className="text-muted-foreground hover:text-eldercare-blue transition-colors">
                  Specialized Care
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-eldercare-blue transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/caregivers" className="text-muted-foreground hover:text-eldercare-blue transition-colors">
                  Find Caregivers
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-eldercare-blue transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-eldercare-blue transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-eldercare-blue transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-eldercare-blue transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-3">
              <li className="text-muted-foreground">
                123 Care Lane, Elder City, EC 12345
              </li>
              <li>
                <a href="mailto:support@eldercare.com" className="text-muted-foreground hover:text-eldercare-blue transition-colors">
                  support@eldercare.com
                </a>
              </li>
              <li>
                <a href="tel:+1-800-123-4567" className="text-muted-foreground hover:text-eldercare-blue transition-colors">
                  +1 (800) 123-4567
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <a 
                href="#" 
                className="inline-block px-5 py-2.5 text-sm font-medium text-white bg-eldercare-blue rounded-full shadow-sm hover:shadow-md transition-all btn-press"
              >
                Become a Caregiver
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border">
          <div className="md:flex md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} ElderCare. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <Link to="/terms" className="hover:text-eldercare-blue transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="hover:text-eldercare-blue transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="hover:text-eldercare-blue transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-muted-foreground">
            <p>Made with <Heart className="inline-block w-3 h-3 text-red-500 mx-0.5" /> for the wellbeing of seniors everywhere</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
