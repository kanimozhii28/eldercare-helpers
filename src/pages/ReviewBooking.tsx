
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Star, Clock, Calendar, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const ReviewBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const bookingData = location.state || {
    caregiver: {
      name: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    booking: {
      date: "May 22, 2023",
      time: "2:00 PM",
      duration: 3,
    }
  };
  
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { caregiver, booking } = bookingData;
  
  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };
  
  const handleSubmitReview = () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please provide a star rating before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      });
      
      // Redirect to home page instead of profile
      navigate('/');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-10 max-w-2xl">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-muted-foreground mb-6 hover:text-black transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </button>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Rate Your Experience</h1>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={caregiver.image} 
                alt={caregiver.name} 
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">{caregiver.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-3">{booking.date}</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{booking.time} ({booking.duration} hours)</span>
                </div>
              </div>
            </div>
            
            <Separator className="mb-6" />
            
            <div className="mb-6">
              <h4 className="font-medium mb-3">Rate your caregiver</h4>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    className="p-1 focus:outline-none focus:ring-0"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        rating >= star
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium mb-3">Write a review</h4>
              <Textarea
                placeholder="Share your experience with this caregiver..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={5}
                className="resize-none"
              />
            </div>
            
            <Button 
              onClick={handleSubmitReview}
              className="w-full bg-eldercare-blue hover:bg-blue-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default ReviewBooking;
