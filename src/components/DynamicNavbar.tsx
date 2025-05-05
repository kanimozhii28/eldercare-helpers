
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from './Navbar';
import AuthNavbar from './AuthNavbar';

const DynamicNavbar = () => {
  const { user } = useAuth();
  
  return user ? <AuthNavbar /> : <Navbar />;
};

export default DynamicNavbar;
