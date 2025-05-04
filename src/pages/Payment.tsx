
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { IndianRupee, Clock, MapPin, User, CreditCard, CheckCircle, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Payment details - in a real app, this would come from the previous page
  const bookingDetails = location.state?.bookingDetails || {
    serviceFee: 1500,
    platformFee: 100,
    totalAmount: 1600,
    serviceType: 'Personal Care',
    caregiverName: 'Sarah Johnson',
    caregiverImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    date: 'June 15, 2023',
    time: '2:00 PM',
    duration: '3 hours'
  };

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      toast({
        title: "Payment Confirmed",
        description: "Your booking has been confirmed. Redirecting to live tracking...",
      });
      
      setTimeout(() => {
        navigate('/live-tracking');
      }, 2000);
    }, 1500);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Complete Your Payment</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="shadow-lg overflow-hidden">
                <CardHeader className="bg-eldercare-blue text-white py-6">
                  <CardTitle className="text-xl flex items-center">
                    <CreditCard className="mr-2" /> Payment Details
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>
                      <div className="space-y-4">
                        <div className="border rounded-lg p-4 flex items-center space-x-4 bg-white shadow-sm hover:shadow-md transition cursor-pointer">
                          <input
                            type="radio"
                            id="cod"
                            name="payment"
                            className="h-4 w-4 text-eldercare-blue focus:ring-eldercare-blue"
                            checked
                            readOnly
                          />
                          <label htmlFor="cod" className="flex-grow">
                            <p className="font-medium">Cash on Delivery</p>
                            <p className="text-sm text-muted-foreground">Pay after the service is completed</p>
                          </label>
                        </div>

                        <div className="border rounded-lg p-4 flex items-center space-x-4 bg-gray-100 text-gray-500">
                          <input
                            type="radio"
                            id="online"
                            name="payment"
                            className="h-4 w-4"
                            disabled
                          />
                          <label htmlFor="online" className="flex-grow">
                            <p className="font-medium">Online Payment</p>
                            <p className="text-sm text-muted-foreground">Coming soon</p>
                          </label>
                          <Badge variant="outline">Coming Soon</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
                      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                        <div className="flex items-center">
                          <User className="h-5 w-5 text-eldercare-blue mr-2" />
                          <span className="text-muted-foreground mr-2">Caregiver:</span>
                          <span className="font-medium">{bookingDetails.caregiverName}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-eldercare-blue mr-2" />
                          <span className="text-muted-foreground mr-2">Service Type:</span>
                          <span className="font-medium">{bookingDetails.serviceType}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-eldercare-blue mr-2" />
                          <span className="text-muted-foreground mr-2">Duration:</span>
                          <span className="font-medium">{bookingDetails.duration} ({bookingDetails.date}, {bookingDetails.time})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-1">
              <Card className="shadow-lg">
                <CardHeader className="bg-gray-50 py-4">
                  <CardTitle className="text-lg">Price Details</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Service Fee</span>
                      <div className="flex items-center">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        <span className="font-medium">{bookingDetails.serviceFee.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Platform Fee</span>
                      <div className="flex items-center">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        <span className="font-medium">{bookingDetails.platformFee.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Amount</span>
                      <div className="flex items-center">
                        <IndianRupee className="h-5 w-5 mr-1" />
                        <span className="font-bold text-lg">{bookingDetails.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 p-6">
                  <Button 
                    onClick={handlePayment}
                    className="w-full bg-eldercare-blue hover:bg-blue-600 shadow-md"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <span className="animate-pulse mr-2">Processing</span>
                        <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                      </>
                    ) : (
                      <>
                        Confirm Booking <CheckCircle className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="mt-4 text-center text-sm text-muted-foreground">
                By confirming, you agree to our 
                <a href="#" className="text-eldercare-blue hover:underline"> Terms of Service</a> and
                <a href="#" className="text-eldercare-blue hover:underline"> Privacy Policy</a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <div className="flex flex-col items-center text-center max-w-md">
              <div className="bg-blue-50 p-4 rounded-full mb-4">
                <ArrowRight className="h-6 w-6 text-eldercare-blue" />
              </div>
              <h3 className="font-semibold mb-2">What's Next?</h3>
              <p className="text-muted-foreground">
                After confirming your booking, you'll be redirected to our live tracking page where you can monitor your caregiver's location and estimated arrival time.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Payment;
