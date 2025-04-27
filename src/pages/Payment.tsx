
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { IndianRupee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handlePayment = () => {
    toast({
      title: "Payment Confirmed",
      description: "Your booking has been confirmed. Redirecting to live tracking...",
    });
    
    setTimeout(() => {
      navigate('/live-tracking');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Payment Details</h1>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Service Fee</span>
                <div className="flex items-center">
                  <IndianRupee className="h-4 w-4 mr-1" />
                  <span className="font-medium">1,500</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Platform Fee</span>
                <div className="flex items-center">
                  <IndianRupee className="h-4 w-4 mr-1" />
                  <span className="font-medium">100</span>
                </div>
              </div>
              
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="font-semibold">Total Amount</span>
                <div className="flex items-center">
                  <IndianRupee className="h-5 w-5 mr-1" />
                  <span className="font-bold text-lg">1,600</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold text-lg mb-4">Payment Method</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 flex items-center space-x-4">
                <input
                  type="radio"
                  id="cod"
                  name="payment"
                  className="h-4 w-4"
                  checked
                  readOnly
                />
                <label htmlFor="cod" className="flex-grow">
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-sm text-muted-foreground">Pay after the service is completed</p>
                </label>
              </div>
              
              <Button 
                onClick={handlePayment}
                className="w-full bg-eldercare-blue hover:bg-blue-600"
              >
                Confirm Booking
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Payment;
