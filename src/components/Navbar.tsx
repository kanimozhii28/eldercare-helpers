
import React, { useState, useEffect } from 'react';
import { Bell, Menu, X, Search, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 glass shadow-sm' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-semibold bg-gradient-to-r from-eldercare-blue to-blue-600 bg-clip-text text-transparent">ElderCare</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-eldercare-blue">
              Home
            </Link>
            <Link to="/services" className="text-sm font-medium transition-colors hover:text-eldercare-blue">
              Services
            </Link>
            <Link to="/caregivers" className="text-sm font-medium transition-colors hover:text-eldercare-blue">
              Find Caregivers
            </Link>
            <Link to="/how-it-works" className="text-sm font-medium transition-colors hover:text-eldercare-blue">
              How It Works
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Voice Assistant">
              <Mic className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Notifications">
              <Bell className="w-5 h-5" />
            </button>
            <Link 
              to="/login" 
              className="px-4 py-2 text-sm font-medium text-white bg-eldercare-blue rounded-full shadow-sm hover:bg-blue-600 transition-colors btn-press"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass border-t border-gray-100 animate-slide-up">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className="block px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/caregivers" 
              className="block px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Caregivers
            </Link>
            <Link 
              to="/how-it-works" 
              className="block px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <div className="flex items-center space-x-4 pt-2">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Search">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Voice Assistant">
                <Mic className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Notifications">
                <Bell className="w-5 h-5" />
              </button>
            </div>
            <Link 
              to="/login" 
              className="block w-full px-4 py-2.5 text-center text-sm font-medium text-white bg-eldercare-blue rounded-full shadow-sm hover:bg-blue-600 transition-colors btn-press"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
