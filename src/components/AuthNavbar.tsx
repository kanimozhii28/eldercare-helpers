
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserMenu from './UserMenu';
import { useAuth } from '@/contexts/AuthContext';

const AuthNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/home" className="flex items-center">
            <span className="text-2xl font-semibold bg-gradient-to-r from-eldercare-blue to-blue-600 bg-clip-text text-transparent">ElderCare</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link
              to="/home"
              className={`text-sm font-medium transition-colors hover:text-eldercare-blue ${
                location.pathname === '/home' ? 'text-eldercare-blue' : 'text-gray-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={`text-sm font-medium transition-colors hover:text-eldercare-blue ${
                location.pathname.startsWith('/services') ? 'text-eldercare-blue' : 'text-gray-600'
              }`}
            >
              Services
            </Link>
            <Link
              to="/caregivers"
              className={`text-sm font-medium transition-colors hover:text-eldercare-blue ${
                location.pathname.startsWith('/caregivers') ? 'text-eldercare-blue' : 'text-gray-600'
              }`}
            >
              Caregivers
            </Link>
            <Link
              to="/how-it-works"
              className={`text-sm font-medium transition-colors hover:text-eldercare-blue ${
                location.pathname === '/how-it-works' ? 'text-eldercare-blue' : 'text-gray-600'
              }`}
            >
              How it Works
            </Link>
            <Link
              to="/care-plans"
              className={`text-sm font-medium transition-colors hover:text-eldercare-blue ${
                location.pathname === '/care-plans' ? 'text-eldercare-blue' : 'text-gray-600'
              }`}
            >
              Care Plans
            </Link>
            <UserMenu />
          </nav>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white pt-2 pb-4 px-4">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/home"
              className={`text-sm font-medium hover:text-eldercare-blue ${
                location.pathname === '/home' ? 'text-eldercare-blue' : 'text-gray-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={`text-sm font-medium hover:text-eldercare-blue ${
                location.pathname.startsWith('/services') ? 'text-eldercare-blue' : 'text-gray-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/caregivers"
              className={`text-sm font-medium hover:text-eldercare-blue ${
                location.pathname.startsWith('/caregivers') ? 'text-eldercare-blue' : 'text-gray-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Caregivers
            </Link>
            <Link
              to="/how-it-works"
              className={`text-sm font-medium hover:text-eldercare-blue ${
                location.pathname === '/how-it-works' ? 'text-eldercare-blue' : 'text-gray-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              How it Works
            </Link>
            <Link
              to="/care-plans"
              className={`text-sm font-medium hover:text-eldercare-blue ${
                location.pathname === '/care-plans' ? 'text-eldercare-blue' : 'text-gray-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Care Plans
            </Link>
            <Link
              to="/profile"
              className={`text-sm font-medium hover:text-eldercare-blue ${
                location.pathname === '/profile' ? 'text-eldercare-blue' : 'text-gray-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
            <Button 
              variant="destructive" 
              size="sm" 
              className="justify-start" 
              onClick={() => {
                setIsOpen(false);
                signOut();
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default AuthNavbar;
