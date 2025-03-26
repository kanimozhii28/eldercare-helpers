
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle, DollarSign, Calendar, User, Clock, Check, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
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
      total: "84.00"
    }
  };
  
  const { caregiver, booking } = bookingData;
  
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  
  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "welcome15") {
      const discount = parseFloat(booking.total) * 0.15;
      setDiscountAmount(parseFloat(discount.toFixed(2)));
      setPromoApplied(true);
      toast({
        title: "Promo code applied!",
        description: "15% discount applied to your booking.",
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please enter a valid promo code.",
        variant: "destructive"
      });
    }
  };
  
  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/payment-success", { 
        state: { 
          caregiver,
          booking: {
            ...booking,
            discountAmount,
            finalTotal: (parseFloat(booking.total) - discountAmount).toFixed(2)
          }
        } 
      });
      
      // For demo purposes, we'll just show a success toast
      toast({
        title: "Payment successful!",
        description: "Your booking has been confirmed.",
      });
    }, 2000);
  };
  
  const getFinalTotal = () => {
    return (parseFloat(booking.total) - discountAmount).toFixed(2);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-10 bg-eldercare-blueGray">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Payment</h1>
          <p className="text-muted-foreground">Complete your booking</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={setPaymentMethod}
                  className="space-y-4"
                >
                  <div className={`border rounded-lg p-4 ${paymentMethod === 'card' ? 'border-eldercare-blue bg-eldercare-lightBlue/20' : ''}`}>
                    <div className="flex items-center">
                      <RadioGroupItem value="card" id="card" className="mr-3" />
                      <Label htmlFor="card" className="flex items-center cursor-pointer">
                        <CreditCard className="h-5 w-5 mr-2 text-eldercare-blue" />
                        Credit / Debit Card
                      </Label>
                    </div>
                    
                    {paymentMethod === 'card' && (
                      <div className="mt-4 space-y-4 pl-8">
                        <div>
                          <Label htmlFor="cardNumber" className="mb-1 block text-sm">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate" className="mb-1 block text-sm">Expiry Date</Label>
                            <Input id="expiryDate" placeholder="MM / YY" />
                          </div>
                          <div>
                            <Label htmlFor="cvv" className="mb-1 block text-sm">CVV</Label>
                            <Input id="cvv" placeholder="123" />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="cardName" className="mb-1 block text-sm">Name on Card</Label>
                          <Input id="cardName" placeholder="John Smith" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className={`border rounded-lg p-4 ${paymentMethod === 'paypal' ? 'border-eldercare-blue bg-eldercare-lightBlue/20' : ''}`}>
                    <div className="flex items-center">
                      <RadioGroupItem value="paypal" id="paypal" className="mr-3" />
                      <Label htmlFor="paypal" className="flex items-center cursor-pointer">
                        <div className="text-[#0070ba] font-bold text-lg mr-2">Pay</div>
                        <div className="text-[#0070ba] font-bold text-lg" style={{ color: '#003087' }}>Pal</div>
                      </Label>
                    </div>
                    
                    {paymentMethod === 'paypal' && (
                      <div className="mt-4 space-y-4 pl-8">
                        <p className="text-sm text-muted-foreground">
                          You will be redirected to PayPal to complete your payment securely.
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className={`border rounded-lg p-4 ${paymentMethod === 'insurance' ? 'border-eldercare-blue bg-eldercare-lightBlue/20' : ''}`}>
                    <div className="flex items-center">
                      <RadioGroupItem value="insurance" id="insurance" className="mr-3" />
                      <Label htmlFor="insurance" className="flex items-center cursor-pointer">
                        <Shield className="h-5 w-5 mr-2 text-eldercare-blue" />
                        Insurance Coverage
                      </Label>
                    </div>
                    
                    {paymentMethod === 'insurance' && (
                      <div className="mt-4 space-y-4 pl-8">
                        <div>
                          <Label htmlFor="insuranceProvider" className="mb-1 block text-sm">Insurance Provider</Label>
                          <Input id="insuranceProvider" placeholder="Provider name" />
                        </div>
                        
                        <div>
                          <Label htmlFor="policyNumber" className="mb-1 block text-sm">Policy Number</Label>
                          <Input id="policyNumber" placeholder="Enter policy number" />
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          Our team will verify your insurance coverage and contact you if any additional information is needed.
                        </p>
                      </div>
                    )}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Billing Information</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="mb-1 block text-sm">First Name</Label>
                      <Input id="firstName" />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="mb-1 block text-sm">Last Name</Label>
                      <Input id="lastName" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="mb-1 block text-sm">Email Address</Label>
                    <Input id="email" type="email" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="mb-1 block text-sm">Phone Number</Label>
                    <Input id="phone" />
                  </div>
                  
                  <div>
                    <Label htmlFor="address" className="mb-1 block text-sm">Billing Address</Label>
                    <Input id="address" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city" className="mb-1 block text-sm">City</Label>
                      <Input id="city" />
                    </div>
                    <div>
                      <Label htmlFor="state" className="mb-1 block text-sm">State</Label>
                      <Input id="state" />
                    </div>
                    <div>
                      <Label htmlFor="zipCode" className="mb-1 block text-sm">ZIP Code</Label>
                      <Input id="zipCode" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <div className="sticky top-24 space-y-6">
              <Card>
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
                  
                  <button 
                    className="flex items-center justify-between w-full text-sm font-medium text-eldercare-blue mb-4"
                    onClick={() => setShowPromoCode(!showPromoCode)}
                  >
                    <span>Add Promo Code</span>
                    {showPromoCode ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  
                  {showPromoCode && (
                    <div className="flex items-center gap-2 mb-4">
                      <Input 
                        placeholder="Enter promo code" 
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={promoApplied}
                      />
                      <Button 
                        variant="outline" 
                        onClick={handleApplyPromo}
                        disabled={promoApplied || !promoCode}
                        className="shrink-0"
                      >
                        {promoApplied ? <Check className="h-4 w-4" /> : "Apply"}
                      </Button>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${booking.total}</span>
                    </div>
                    
                    {promoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (15%)</span>
                        <span>-${discountAmount}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${getFinalTotal()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Button 
                className="w-full bg-eldercare-blue hover:bg-blue-600 h-12"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Lock className="h-4 w-4 mr-2" />
                    Pay ${getFinalTotal()}
                  </div>
                )}
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                By completing this payment, you agree to our{" "}
                <a href="#" className="text-eldercare-blue hover:underline">Terms of Service</a> and{" "}
                <a href="#" className="text-eldercare-blue hover:underline">Privacy Policy</a>
              </p>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="text-muted-foreground">
                  <Lock className="h-4 w-4 inline-block mr-1" />
                  <span className="text-xs">Secure Payment</span>
                </div>
                <div className="text-muted-foreground">
                  <Shield className="h-4 w-4 inline-block mr-1" />
                  <span className="text-xs">Encrypted Data</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

// Define Shield component since it's not imported from lucide-react
const Shield = ({ className = "", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export default PaymentPage;
