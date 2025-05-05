
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MapPin, Clock, Phone, Navigation, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';

type LatLng = {
  lat: number;
  lng: number;
};

const containerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '0.75rem'
};

const LiveTracking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState('');
  const [caregiverLocation, setCaregiverLocation] = useState<LatLng>({lat: 40.7128, lng: -74.006});
  const [userLocation, setUserLocation] = useState<LatLng>({lat: 40.7152, lng: -74.0105});
  const [estimatedTime, setEstimatedTime] = useState("12 minutes");
  const [mapInitialized, setMapInitialized] = useState(false);
  const [directions, setDirections] = useState<any>(null);
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [caregiverData, setCaregiverData] = useState({
    name: "Sarah Johnson",
    phone: "555-123-4567",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.9,
    status: "On the way",
    bookingTime: "2:00 PM",
    vehicle: "Toyota Prius, White"
  });

  useEffect(() => {
    // Simulating caregiver movement every 5 seconds
    if (mapInitialized && isApiLoaded) {
      const interval = setInterval(() => {
        // Move caregiver slightly closer to user
        setCaregiverLocation(prev => {
          const newLat = prev.lat + (userLocation.lat - prev.lat) * 0.1;
          const newLng = prev.lng + (userLocation.lng - prev.lng) * 0.1;
          
          // Update estimated time based on distance
          const distance = Math.sqrt(
            Math.pow(userLocation.lat - newLat, 2) + 
            Math.pow(userLocation.lng - newLng, 2)
          );
          
          // Rough estimation of time in minutes
          const timeInMinutes = Math.round(distance * 100);
          setEstimatedTime(`${timeInMinutes} minutes`);
          
          return { lat: newLat, lng: newLng };
        });
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [mapInitialized, isApiLoaded, userLocation]);

  const directionsCallback = (
    result: any | null, 
    status: any
  ) => {
    if (result !== null && status === 'OK') {
      setDirections(result);
      if (result.routes[0]?.legs[0]?.duration) {
        setEstimatedTime(result.routes[0].legs[0].duration.text);
      }
    }
  };
  
  const handleCompleteService = () => {
    navigate('/review-booking');
  };

  const handleApiLoaded = () => {
    console.log("Google Maps API loaded successfully");
    setIsApiLoaded(true);
  };

  if (!mapInitialized) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-10 max-w-2xl">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Map Configuration Required</h2>
              <p className="mb-4 text-muted-foreground">Please enter your Google Maps API key to initialize the map:</p>
              <Input
                type="text"
                placeholder="Enter your Google Maps API key"
                value={googleMapsApiKey}
                onChange={(e) => setGoogleMapsApiKey(e.target.value)}
                className="mb-4"
              />
              <p className="text-sm text-muted-foreground mb-4">
                You can get your API key from{" "}
                <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" className="text-eldercare-blue hover:underline">
                  Google Cloud Console
                </a>
              </p>
              <Button 
                className="w-full bg-eldercare-blue hover:bg-blue-600"
                onClick={() => setMapInitialized(true)}
              >
                Initialize Map
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <Card className="mb-6 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={caregiverData.image} 
                      alt={caregiverData.name} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-eldercare-blue"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{caregiverData.name}</h3>
                      <div className="flex items-center text-sm">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span>{caregiverData.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="bg-eldercare-lightBlue p-2 rounded-full">
                        <Clock className="h-5 w-5 text-eldercare-blue" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Booking Time</p>
                        <p className="font-medium">{caregiverData.bookingTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="bg-eldercare-lightBlue p-2 rounded-full">
                        <MapPin className="h-5 w-5 text-eldercare-blue" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p className="font-medium">{caregiverData.status}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="bg-eldercare-lightBlue p-2 rounded-full">
                        <Navigation className="h-5 w-5 text-eldercare-blue" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Estimated Arrival</p>
                        <p className="font-medium text-green-600">{estimatedTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="bg-eldercare-lightBlue p-2 rounded-full">
                        <Phone className="h-5 w-5 text-eldercare-blue" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Contact Number</p>
                        <p className="font-medium">{caregiverData.phone}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-eldercare-blue hover:bg-blue-600 shadow-md">
                    Call Caregiver
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Service Details</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service Type</span>
                      <span className="font-medium">Personal Care</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">3 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Vehicle</span>
                      <span className="font-medium">{caregiverData.vehicle}</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-eldercare-blue text-eldercare-blue hover:bg-eldercare-lightBlue shadow-md"
                    onClick={handleCompleteService}
                  >
                    Complete Service & Review
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="w-full md:w-2/3">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <LoadScript
                  googleMapsApiKey={googleMapsApiKey}
                  onLoad={handleApiLoaded}
                >
                  {isApiLoaded && (
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={caregiverLocation}
                      zoom={14}
                      options={{
                        zoomControl: true,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                      }}
                    >
                      <Marker
                        position={caregiverLocation}
                        icon={{
                          url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                          scaledSize: window.google?.maps?.Size ? new window.google.maps.Size(40, 40) : undefined
                        }}
                      />
                      <Marker
                        position={userLocation}
                        icon={{
                          url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
                          scaledSize: window.google?.maps?.Size ? new window.google.maps.Size(40, 40) : undefined
                        }}
                      />

                      {isApiLoaded && window.google?.maps?.TravelMode && (
                        <DirectionsService
                          options={{
                            destination: userLocation,
                            origin: caregiverLocation,
                            travelMode: window.google.maps.TravelMode.DRIVING
                          }}
                          callback={directionsCallback}
                        />
                      )}
                      
                      {directions && (
                        <DirectionsRenderer
                          options={{
                            directions: directions,
                            suppressMarkers: true
                          }}
                        />
                      )}
                    </GoogleMap>
                  )}
                </LoadScript>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LiveTracking;
