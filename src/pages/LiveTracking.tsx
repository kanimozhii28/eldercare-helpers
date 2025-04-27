import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MapPin, Clock, Phone, Navigation, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

type LngLat = [number, number];

const LiveTracking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [caregiverLocation, setCaregiverLocation] = useState<LngLat>([-74.006, 40.7128]);
  const [userLocation, setUserLocation] = useState<LngLat>([-74.0105, 40.7152]);
  const [estimatedTime, setEstimatedTime] = useState("12 minutes");
  const [mapInitialized, setMapInitialized] = useState(false);
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
    if (!mapboxToken || mapInitialized || !mapContainer.current) return;
    
    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: caregiverLocation,
        zoom: 13
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      map.current.on('load', () => {
        new mapboxgl.Marker({ color: "#3b82f6" })
          .setLngLat(caregiverLocation)
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${caregiverData.name}</h3><p>On the way</p>`))
          .addTo(map.current);
        
        new mapboxgl.Marker({ color: "#10b981" })
          .setLngLat(userLocation)
          .setPopup(new mapboxgl.Popup().setHTML("<h3>Your Location</h3>"))
          .addTo(map.current);
        
        map.current.addSource('route', {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'LineString',
              'coordinates': [caregiverLocation, userLocation]
            }
          }
        });
        
        map.current.addLayer({
          'id': 'route',
          'type': 'line',
          'source': 'route',
          'layout': {
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': {
            'line-color': '#3b82f6',
            'line-width': 4,
            'line-dasharray': [2, 1]
          }
        });
      });
      
      setMapInitialized(true);
    } catch (error) {
      console.error('Map initialization error:', error);
      toast({
        title: "Map Error",
        description: "There was an error loading the map. Please check your Mapbox token.",
        variant: "destructive"
      });
    }
  }, [mapboxToken, mapInitialized, caregiverData.name]);

  useEffect(() => {
    if (!map.current) return;
    
    const markers = document.getElementsByClassName('mapboxgl-marker');
    if (markers[0]) {
      markers[0].remove();
      
      new mapboxgl.Marker({ color: "#3b82f6" })
        .setLngLat(caregiverLocation)
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${caregiverData.name}</h3><p>On the way</p>`))
        .addTo(map.current);
    }
    
    if (map.current.getSource('route')) {
      map.current.getSource('route').setData({
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': [
            caregiverLocation,
            userLocation
          ]
        }
      });
    }
  }, [caregiverLocation, caregiverData.name]);
  
  const handleCompleteService = () => {
    navigate('/review-booking');
  };

  if (!mapInitialized) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-10 max-w-2xl">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Map Configuration Required</h2>
              <p className="mb-4 text-muted-foreground">Please enter your Mapbox public token to initialize the map:</p>
              <Input
                type="text"
                placeholder="Enter your Mapbox token"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="mb-4"
              />
              <p className="text-sm text-muted-foreground mb-4">
                You can get your public token from{" "}
                <a href="https://www.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-eldercare-blue hover:underline">
                  Mapbox.com
                </a>
              </p>
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
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={caregiverData.image} 
                      alt={caregiverData.name} 
                      className="w-16 h-16 rounded-full object-cover"
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
                        <p className="font-medium">{estimatedTime}</p>
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
                  
                  <Button className="w-full bg-eldercare-blue hover:bg-blue-600">
                    Call Caregiver
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
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
                    className="w-full border-eldercare-blue text-eldercare-blue hover:bg-eldercare-lightBlue"
                    onClick={handleCompleteService}
                  >
                    Complete Service & Review
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="w-full md:w-2/3">
              <div 
                ref={mapContainer} 
                className="h-[600px] rounded-xl overflow-hidden shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LiveTracking;
