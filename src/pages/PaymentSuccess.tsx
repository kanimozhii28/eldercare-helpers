
import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Clock, Calendar, User, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state || {
    caregiver: {
      name: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      hourlyRate: 28
    },
    booking: {
      date: "May 22, 2023",
      time: "2:00 PM",
      duration: 3,
      careType: "standard",
      total: "84.00",
      discountAmount: 0,
      finalTotal: "84.00"
    }
  };
  
  useEffect(() => {
    // Automatically redirect to tracking page after 5 seconds
    const timer = setTimeout(() => {
      navigate('/live-tracking', { state: bookingData });
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [navigate, bookingData]);
  
  const { caregiver, booking } = bookingData;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-10 max-w-2xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground">
            Your booking has been confirmed and the caregiver has been notified.
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            Redirecting to live tracking in a few seconds...
          </div>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Booking Summary</h3>
            
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={caregiver.image} 
                alt={caregiver.name} 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-medium">{caregiver.name}</div>
                <div className="text-sm text-muted-foreground">${caregiver.hourlyRate}/hour</div>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-eldercare-blue" />
                  Date
                </div>
                <div className="text-sm">{booking.date}</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-eldercare-blue" />
                  Time
                </div>
                <div className="text-sm">{booking.time}</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-eldercare-blue" />
                  Duration
                </div>
                <div className="text-sm">{booking.duration} hours</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm">
                  <User className="h-4 w-4 mr-2 text-eldercare-blue" />
                  Care Type
                </div>
                <div className="text-sm capitalize">{booking.careType}</div>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${booking.total}</span>
              </div>
              
              {booking.discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${booking.discountAmount}</span>
                </div>
              )}
              
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${booking.finalTotal}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-col md:flex-row gap-4">
          <Button 
            className="flex-1"
            variant="outline"
            onClick={() => navigate('/live-tracking', { state: bookingData })}
          >
            Track Your Caregiver
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <Link to="/profile" className="flex-1">
            <Button className="w-full bg-eldercare-blue hover:bg-blue-600">
              View Your Bookings
            </Button>
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
