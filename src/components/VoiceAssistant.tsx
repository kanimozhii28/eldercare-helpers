
import React, { useState, useEffect } from 'react';
import { Mic, X, MessageSquare, Loader, MicOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const VoiceAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Create a recognition object if the browser supports it
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Initialize speech recognition if supported by the browser
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      // Use the appropriate constructor based on browser support
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognitionAPI) {
        const recognitionInstance = new SpeechRecognitionAPI();
        
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'en-US';
        
        recognitionInstance.onresult = (event) => {
          const current = event.resultIndex;
          const userTranscript = event.results[current][0].transcript;
          setTranscript(userTranscript);
          handleQueryResponse(userTranscript);
        };
        
        recognitionInstance.onerror = (event) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
          toast({
            title: "Speech recognition error",
            description: "Please try again or type your question.",
            variant: "destructive"
          });
        };
        
        recognitionInstance.onend = () => {
          setIsListening(false);
        };
        
        setRecognition(recognitionInstance);
      }
    }
  }, [toast]);

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Reset states when opening
      setTranscript('');
      setResponse('');
    }
  };

  const handleListen = () => {
    if (!recognition) {
      // Speech recognition not supported
      toast({
        title: "Speech recognition not supported",
        description: "Your browser doesn't support speech recognition. Please type your question instead.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsListening(true);
      recognition.start();
    } catch (error) {
      console.error('Speech recognition error:', error);
      setIsListening(false);
    }
  };

  const handleStopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handleQueryResponse = (query) => {
    // Add user's query to chat history
    setChatHistory(prev => [...prev, { type: 'user', text: query }]);
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Pattern matching for common eldercare queries with better routing
      let botResponse = "";
      
      if (query.toLowerCase().includes("caregiver") || query.toLowerCase().includes("care giver")) {
        botResponse = "I can help you find a caregiver. Would you like to see available caregivers or learn about our caregiving services?";
        
        // Add suggestion to navigate to caregivers page
        setChatHistory(prev => [
          ...prev, 
          { 
            type: 'assistant', 
            text: botResponse,
            actions: [
              { label: 'Find Caregivers', path: '/caregivers' },
              { label: 'Learn About Services', path: '/services' }
            ]
          }
        ]);
      } else if (query.toLowerCase().includes("service") || query.toLowerCase().includes("services")) {
        botResponse = "We offer a variety of eldercare services including personal care, companion care, specialized care, and home health care. Would you like to learn more about any specific service?";
        
        setChatHistory(prev => [
          ...prev, 
          { 
            type: 'assistant', 
            text: botResponse,
            actions: [
              { label: 'View All Services', path: '/services' },
              { label: 'View Care Plans', path: '/care-plans' }
            ]
          }
        ]);
      } else if (query.toLowerCase().includes("book") || query.toLowerCase().includes("booking") || query.toLowerCase().includes("appointment")) {
        botResponse = "I can help you book a caregiver. You can view available caregivers and schedule an appointment.";
        
        setChatHistory(prev => [
          ...prev, 
          { 
            type: 'assistant', 
            text: botResponse,
            actions: [
              { label: 'Book a Caregiver', path: '/caregivers' }
            ]
          }
        ]);
      } else if (query.toLowerCase().includes("login") || query.toLowerCase().includes("account") || query.toLowerCase().includes("sign in")) {
        botResponse = "You can log in to your account to manage your bookings, view your profile, and more.";
        
        setChatHistory(prev => [
          ...prev, 
          { 
            type: 'assistant', 
            text: botResponse,
            actions: [
              { label: 'Login', path: '/login' },
              { label: 'View Profile', path: '/profile' }
            ]
          }
        ]);
      } else if (query.toLowerCase().includes("track") || query.toLowerCase().includes("tracking") || query.toLowerCase().includes("where")) {
        botResponse = "You can track your caregiver's location in real-time during active bookings.";
        
        setChatHistory(prev => [
          ...prev, 
          { 
            type: 'assistant', 
            text: botResponse,
            actions: [
              { label: 'Live Tracking', path: '/live-tracking' }
            ]
          }
        ]);
      } else if (query.toLowerCase().includes("care plan") || query.toLowerCase().includes("care plans") || query.toLowerCase().includes("plan")) {
        botResponse = "We offer standard and customized care plans to meet your specific needs.";
        
        setChatHistory(prev => [
          ...prev, 
          { 
            type: 'assistant', 
            text: botResponse,
            actions: [
              { label: 'View Care Plans', path: '/care-plans' }
            ]
          }
        ]);
      } else if (query.toLowerCase().includes("payment") || query.toLowerCase().includes("pay") || query.toLowerCase().includes("cost")) {
        botResponse = "You can make secure payments for your caregiver services through our platform.";
        
        setChatHistory(prev => [
          ...prev, 
          { 
            type: 'assistant', 
            text: botResponse,
            actions: [
              { label: 'Go to Payment', path: '/payment' }
            ]
          }
        ]);
      } else if (query.toLowerCase().includes("profile") || query.toLowerCase().includes("my account") || query.toLowerCase().includes("my bookings")) {
        botResponse = "You can view your profile to see your personal information, bookings, and favorite caregivers.";
        
        setChatHistory(prev => [
          ...prev, 
          { 
            type: 'assistant', 
            text: botResponse,
            actions: [
              { label: 'View Profile', path: '/profile' }
            ]
          }
        ]);
      } else if (query.toLowerCase().includes("review") || query.toLowerCase().includes("feedback") || query.toLowerCase().includes("rate")) {
        botResponse = "You can review and rate your caregivers after your service is complete.";
        
        setChatHistory(prev => [
          ...prev, 
          { 
            type: 'assistant', 
            text: botResponse,
            actions: [
              { label: 'Write a Review', path: '/review-booking' }
            ]
          }
        ]);
      } else {
        botResponse = "I'm here to help with questions about our eldercare services, caregivers, bookings, and more. How can I assist you today?";
        
        setChatHistory(prev => [
          ...prev, 
          { 
            type: 'assistant', 
            text: botResponse,
            actions: [
              { label: 'Browse Services', path: '/services' },
              { label: 'Find Caregivers', path: '/caregivers' },
              { label: 'How It Works', path: '/how-it-works' }
            ]
          }
        ]);
      }
      
      setResponse(botResponse);
    }, 1500);
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!transcript.trim()) return;
    
    handleQueryResponse(transcript);
    setTranscript('');
  };

  const handleActionClick = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Voice Assistant Button */}
      <button
        onClick={toggleAssistant}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all btn-press ${
          isOpen ? 'bg-red-500 text-white rotate-90' : 'bg-eldercare-blue text-white'
        }`}
        aria-label={isOpen ? 'Close voice assistant' : 'Open voice assistant'}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
      </button>

      {/* Voice Assistant Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-md z-50 glass rounded-2xl shadow-xl overflow-hidden animate-slide-up">
          <div className="p-4 bg-eldercare-blue text-white">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Voice Assistant</h3>
              <button 
                onClick={toggleAssistant}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close voice assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs opacity-80">
              Speak or type your question about elder care services
            </p>
          </div>
          
          <div className="p-6 max-h-96 overflow-y-auto bg-white">
            {chatHistory.length > 0 ? (
              <div className="space-y-4">
                {chatHistory.map((message, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-eldercare-warmGray' 
                          : 'bg-eldercare-blue/10'
                      }`}>
                        {message.type === 'user' ? (
                          <MessageSquare className="w-4 h-4 text-white" />
                        ) : (
                          <Mic className="w-4 h-4 text-eldercare-blue" />
                        )}
                      </div>
                      <div className={`p-3 rounded-2xl rounded-tl-none ${
                        message.type === 'user' 
                          ? 'bg-eldercare-warmGray/10' 
                          : 'bg-eldercare-lightBlue'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        
                        {message.actions && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {message.actions.map((action, actionIndex) => (
                              <button
                                key={actionIndex}
                                onClick={() => handleActionClick(action.path)}
                                className="px-3 py-1 text-xs bg-eldercare-blue text-white rounded-full hover:bg-blue-600 transition-colors"
                              >
                                {action.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isProcessing && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-eldercare-blue/10 flex items-center justify-center flex-shrink-0">
                      <Loader className="w-4 h-4 text-eldercare-blue animate-spin" />
                    </div>
                    <div className="bg-eldercare-lightBlue p-3 rounded-2xl rounded-tl-none">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-eldercare-blue rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-eldercare-blue rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-eldercare-blue rounded-full animate-pulse delay-150"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-eldercare-lightBlue flex items-center justify-center">
                  <Mic className="w-8 h-8 text-eldercare-blue" />
                </div>
                <p className="text-gray-700 mb-4">
                  How can I help you today?
                </p>
                <p className="text-xs text-muted-foreground mb-6">
                  Try saying: "Find a caregiver for my mother" or "What services do you offer?"
                </p>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-border bg-white">
            <form onSubmit={handleTextSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Type your question..."
                className="flex-1 px-4 py-2 rounded-full bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-eldercare-blue/20"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
              />
              {isListening ? (
                <button
                  type="button"
                  onClick={handleStopListening}
                  className="p-3 rounded-full btn-press bg-red-500 text-white animate-pulse"
                >
                  <MicOff className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleListen}
                  className="p-3 rounded-full btn-press bg-eldercare-blue text-white"
                >
                  <Mic className="w-5 h-5" />
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceAssistant;
