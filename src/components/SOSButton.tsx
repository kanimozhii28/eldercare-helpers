
import React, { useState } from 'react';
import { AlertCircle, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const SOSButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  const handleSOSClick = () => {
    setIsExpanded(!isExpanded);
  };
  
  const handleEmergencyCall = () => {
    toast({
      title: "Emergency call activated",
      description: "Contacting emergency services and your emergency contact.",
      variant: "destructive",
    });
    
    // Simulate emergency call (in a real app, this would connect to emergency services)
    setTimeout(() => {
      toast({
        title: "Emergency responders notified",
        description: "Help is on the way. Stay calm and follow emergency instructions.",
      });
    }, 2000);
  };

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 left-6 z-50 bg-white rounded-xl shadow-lg p-4 w-64"
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-600 mb-2">Emergency Assistance</h3>
              <p className="text-sm text-gray-600 mb-4">
                Press the button below to contact emergency services and notify your emergency contact.
              </p>
              <button
                onClick={handleEmergencyCall}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>Contact Emergency Services</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={handleSOSClick}
        className="fixed bottom-6 left-6 z-50 p-4 bg-red-600 text-white rounded-full shadow-lg btn-press"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="SOS Emergency Button"
      >
        {isExpanded ? (
          <X className="h-6 w-6" />
        ) : (
          <AlertCircle className="h-6 w-6" />
        )}
      </motion.button>
    </>
  );
};

export default SOSButton;
