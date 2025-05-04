
import React, { useState, useEffect } from 'react';
import { Mic, X, MessageSquare, Loader, MicOff, Command, Info, HelpCircle, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const VoiceAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCommandsHelp, setShowCommandsHelp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Create a recognition object if the browser supports it
  const [recognition, setRecognition] = useState(null);

  // Suggested commands and their descriptions for better user guidance
  const suggestedCommands = [
    { command: "Find a cooking caregiver", description: "Search for caregivers specialized in meal preparation" },
    { command: "How do I book a caregiver?", description: "Get guidance on the booking process" },
    { command: "Show me medical caregivers", description: "View available medical care specialists" },
    { command: "Tell me about personal care", description: "Learn about personal care services" },
    { command: "Track my booking", description: "Go to live tracking page" },
    { command: "Show payment options", description: "View available payment methods" },
    { command: "I need overnight care", description: "Find overnight care specialists" },
    { command: "How does rating work?", description: "Learn about the review system" }
  ];

  // Define caregiver categories with more detailed descriptions
  const caregiverCategories = {
    'cooking': {
      name: 'Cooking and Meal Preparation',
      description: 'Specialists in preparing nutritious meals and following dietary requirements',
      path: '/caregivers?category=cooking'
    },
    'personal': {
      name: 'Personal Care',
      description: 'Assistance with bathing, dressing, grooming, and other personal needs',
      path: '/caregivers?category=personal'
    },
    'medical': {
      name: 'Medical Care',
      description: 'Skilled care for medical conditions and health monitoring',
      path: '/caregivers?category=medical'
    },
    'companion': {
      name: 'Companion Care',
      description: 'Social interaction, conversation, and companionship for emotional wellbeing',
      path: '/caregivers?category=companion'
    },
    'alzheimer': {
      name: 'Alzheimer\'s and Dementia Care',
      description: 'Specialized care for seniors with memory-related conditions',
      path: '/caregivers?category=alzheimer'
    },
    'housekeeping': {
      name: 'Housekeeping and Cleaning',
      description: 'Help with keeping the home clean, organized, and safe',
      path: '/caregivers?category=housekeeping'
    },
    'mobility': {
      name: 'Mobility Assistance',
      description: 'Support with walking, transferring, and preventing falls',
      path: '/caregivers?category=mobility'
    },
    'overnight': {
      name: 'Overnight Care',
      description: '24-hour supervision and assistance during the night',
      path: '/caregivers?category=overnight'
    },
    'respite': {
      name: 'Respite Care',
      description: 'Temporary relief for family caregivers who need a break',
      path: '/caregivers?category=respite'
    },
    'medication': {
      name: 'Medication Management',
      description: 'Ensuring medications are taken correctly and on schedule',
      path: '/caregivers?category=medication'
    },
    'transportation': {
      name: 'Transportation and Errands',
      description: 'Help with appointments, shopping, and other outings',
      path: '/caregivers?category=transportation'
    },
    'therapy': {
      name: 'Physical Therapy Support',
      description: 'Assistance with exercises prescribed by physical therapists',
      path: '/caregivers?category=therapy'
    },
    'transitional': {
      name: 'Transitional Care',
      description: 'Support when returning home after hospitalization',
      path: '/caregivers?category=transitional'
    }
  };

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
      
      // Show commands help when opening
      setShowCommandsHelp(true);
      
      // Auto-hide commands help after 5 seconds
      setTimeout(() => {
        setShowCommandsHelp(false);
      }, 5000);
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

  const findCategoryMatch = (query) => {
    query = query.toLowerCase();
    
    // Check for direct category mentions
    for (const [key, value] of Object.entries(caregiverCategories)) {
      if (query.includes(key.toLowerCase())) {
        return { key, value };
      }
      
      // Also check for plural forms or variations
      if (key === 'cooking' && (query.includes('cook') || query.includes('chef') || query.includes('meal'))) {
        return { key, value };
      }
      if (key === 'medical' && (query.includes('nurse') || query.includes('doctor') || query.includes('health'))) {
        return { key, value };
      }
      if (key === 'mobility' && (query.includes('movement') || query.includes('walking'))) {
        return { key, value };
      }
      if (key === 'housekeeping' && (query.includes('cleaning') || query.includes('cleaner') || query.includes('house'))) {
        return { key, value };
      }
      if (key === 'transportation' && (query.includes('drive') || query.includes('car') || query.includes('errands'))) {
        return { key, value };
      }
      if (key === 'alzheimer' && (query.includes('dementia') || query.includes('memory') || query.includes('alzheimer'))) {
        return { key, value };
      }
      if (key === 'overnight' && (query.includes('night') || query.includes('24 hour') || query.includes('sleep'))) {
        return { key, value };
      }
    }
    
    return null;
  };

  const handleQueryResponse = (query) => {
    // Add user's query to chat history
    setChatHistory(prev => [...prev, { type: 'user', text: query }]);
    
    setIsProcessing(true);
    
    // Hide commands help when user starts a conversation
    setShowCommandsHelp(false);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      
      let botResponse = "";
      let actions = [];
      
      // Check for category matches first
      const categoryMatch = findCategoryMatch(query);
      if (categoryMatch) {
        botResponse = `I can help you find caregivers specializing in ${categoryMatch.value.name}. ${categoryMatch.value.description}. Would you like to see caregivers with this expertise?`;
        
        actions = [
          { 
            label: `View ${categoryMatch.value.name} Caregivers`, 
            path: categoryMatch.value.path
          },
          { label: 'View All Caregivers', path: '/caregivers' }
        ];
      }
      // Pattern matching for other common eldercare queries
      else if (query.toLowerCase().includes("caregiver") || query.toLowerCase().includes("care giver")) {
        botResponse = "I can help you find a caregiver. Would you like to see available caregivers or learn about our caregiving services?";
        
        actions = [
          { label: 'Find Caregivers', path: '/caregivers' },
          { label: 'Learn About Services', path: '/services' }
        ];
      } else if (query.toLowerCase().includes("service") || query.toLowerCase().includes("services")) {
        botResponse = "We offer a variety of eldercare services including personal care, companion care, specialized care, and home health care. Would you like to learn more about any specific service?";
        
        actions = [
          { label: 'View All Services', path: '/services' },
          { label: 'View Care Plans', path: '/care-plans' }
        ];
      } else if (query.toLowerCase().includes("book") || query.toLowerCase().includes("booking") || query.toLowerCase().includes("appointment")) {
        botResponse = "I can help you book a caregiver. You can view available caregivers and schedule an appointment.";
        
        actions = [
          { label: 'Book a Caregiver', path: '/caregivers' }
        ];
      } else if (query.toLowerCase().includes("login") || query.toLowerCase().includes("account") || query.toLowerCase().includes("sign in")) {
        botResponse = "You can log in to your account to manage your bookings, view your profile, and more.";
        
        actions = [
          { label: 'Login', path: '/login' },
          { label: 'View Profile', path: '/profile' }
        ];
      } else if (query.toLowerCase().includes("track") || query.toLowerCase().includes("tracking") || query.toLowerCase().includes("where")) {
        botResponse = "You can track your caregiver's location in real-time during active bookings.";
        
        actions = [
          { label: 'Live Tracking', path: '/live-tracking' }
        ];
      } else if (query.toLowerCase().includes("care plan") || query.toLowerCase().includes("care plans") || query.toLowerCase().includes("plan")) {
        botResponse = "We offer standard and customized care plans to meet your specific needs.";
        
        actions = [
          { label: 'View Care Plans', path: '/care-plans' }
        ];
      } else if (query.toLowerCase().includes("payment") || query.toLowerCase().includes("pay") || query.toLowerCase().includes("cost")) {
        botResponse = "You can make secure payments for your caregiver services through our platform.";
        
        actions = [
          { label: 'Go to Payment', path: '/payment' }
        ];
      } else if (query.toLowerCase().includes("profile") || query.toLowerCase().includes("my account") || query.toLowerCase().includes("my bookings")) {
        botResponse = "You can view your profile to see your personal information, bookings, and favorite caregivers.";
        
        actions = [
          { label: 'View Profile', path: '/profile' }
        ];
      } else if (query.toLowerCase().includes("review") || query.toLowerCase().includes("feedback") || query.toLowerCase().includes("rate")) {
        botResponse = "You can review and rate your caregivers after your service is complete.";
        
        actions = [
          { label: 'Write a Review', path: '/review-booking' }
        ];
      } else if (query.toLowerCase().includes("go home") || query.toLowerCase().includes("home page") || query.toLowerCase().includes("main page")) {
        botResponse = "I'll navigate you to the home page right away.";
        
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        botResponse = "I'm here to help with questions about our eldercare services, caregivers, bookings, and more. How can I assist you today?";
        
        actions = [
          { label: 'Browse Services', path: '/services' },
          { label: 'Find Caregivers', path: '/caregivers' },
          { label: 'How It Works', path: '/how-it-works' }
        ];
      }
      
      setChatHistory(prev => [
        ...prev, 
        { 
          type: 'assistant', 
          text: botResponse,
          actions: actions
        }
      ]);
      
      setResponse(botResponse);
    }, 1000);
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

  const handleCommandClick = (command) => {
    setTranscript(command);
    handleQueryResponse(command);
  };

  return (
    <>
      {/* Voice Assistant Button */}
      <motion.button
        onClick={toggleAssistant}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all btn-press ${
          isOpen ? 'bg-red-500 text-white' : 'bg-eldercare-blue text-white'
        }`}
        aria-label={isOpen ? 'Close voice assistant' : 'Open voice assistant'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
      </motion.button>

      {/* Voice Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-full max-w-md z-50 glass rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-4 bg-eldercare-blue text-white">
              <div className="flex items-center justify-between">
                <h3 className="font-medium flex items-center">
                  <Command className="h-4 w-4 mr-2" /> Voice Assistant
                </h3>
                <div className="flex items-center">
                  <button
                    onClick={() => setShowCommandsHelp(!showCommandsHelp)}
                    className="p-1 rounded-full hover:bg-white/10 transition-colors mr-2"
                    aria-label="Show commands help"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={toggleAssistant}
                    className="p-1 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Close voice assistant"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-xs opacity-80">
                Speak or type your question about elder care services
              </p>
            </div>
            
            <div className="p-6 max-h-96 overflow-y-auto bg-white">
              {showCommandsHelp && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 bg-blue-50 rounded-lg p-4"
                >
                  <div className="flex items-center mb-2 text-eldercare-blue">
                    <Info className="h-4 w-4 mr-2" />
                    <h4 className="font-medium">Try these commands</h4>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {suggestedCommands.slice(0, 4).map((item, index) => (
                      <button
                        key={index}
                        className="text-left p-2 hover:bg-blue-100 rounded-md text-sm transition-colors flex justify-between items-center"
                        onClick={() => handleCommandClick(item.command)}
                      >
                        <span className="font-medium">{item.command}</span>
                        <span className="text-xs text-gray-500">{item.description}</span>
                      </button>
                    ))}
                  </div>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-eldercare-blue p-0 h-auto mt-2"
                    onClick={() => setShowCommandsHelp(false)}
                  >
                    Hide suggestions
                  </Button>
                </motion.div>
              )}

              {chatHistory.length > 0 ? (
                <div className="space-y-4">
                  {chatHistory.map((message, index) => (
                    <motion.div 
                      key={index} 
                      className="mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
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
                                  className="px-3 py-1 text-xs bg-eldercare-blue text-white rounded-full hover:bg-blue-600 transition-colors shadow-sm"
                                >
                                  {action.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isProcessing && (
                    <motion.div 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
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
                    </motion.div>
                  )}
                </div>
              ) : (
                <motion.div 
                  className="text-center py-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-eldercare-lightBlue flex items-center justify-center">
                    <Mic className="w-8 h-8 text-eldercare-blue" />
                  </div>
                  <p className="text-gray-700 mb-4">
                    How can I help you today?
                  </p>
                  <p className="text-xs text-muted-foreground mb-6">
                    Try saying: "Find a cooking caregiver" or "I need help with medical care"
                  </p>
                  
                  <div className="flex flex-col gap-2 max-w-xs mx-auto">
                    {suggestedCommands.slice(0, 3).map((item, index) => (
                      <button
                        key={index}
                        className="text-left p-2 border border-gray-200 hover:border-eldercare-blue hover:bg-eldercare-lightBlue rounded-md text-sm transition-colors"
                        onClick={() => handleCommandClick(item.command)}
                      >
                        {item.command}
                      </button>
                    ))}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/')}
                      className="mt-2"
                    >
                      <Home className="h-4 w-4 mr-2" /> Go to Home
                    </Button>
                  </div>
                </motion.div>
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
                  <motion.button
                    type="button"
                    onClick={handleStopListening}
                    className="p-3 rounded-full btn-press bg-red-500 text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MicOff className="w-5 h-5" />
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    onClick={handleListen}
                    className="p-3 rounded-full btn-press bg-eldercare-blue text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mic className="w-5 h-5" />
                  </motion.button>
                )}
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceAssistant;
