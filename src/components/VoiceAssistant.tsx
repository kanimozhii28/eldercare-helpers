
import React, { useState } from 'react';
import { Mic, X, MessageSquare } from 'lucide-react';

const VoiceAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Reset states when opening
      setTranscript('');
      setResponse('');
    }
  };

  const handleListen = () => {
    // In a real app, we would implement actual speech recognition here
    setIsListening(true);
    
    // Mock speech recognition for demo
    setTimeout(() => {
      setIsListening(false);
      setTranscript('I need help finding a caregiver for my mother who needs assistance with meals.');
      
      // Mock response
      setTimeout(() => {
        setResponse("I can help you find a caregiver specialized in meal preparation. Would you like me to search for available caregivers in your area?");
      }, 1000);
    }, 2000);
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
          
          <div className="p-6 max-h-96 overflow-y-auto">
            {transcript && (
              <div className="mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-eldercare-warmGray flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="glass p-3 rounded-2xl rounded-tl-none">
                    <p className="text-sm">{transcript}</p>
                  </div>
                </div>
              </div>
            )}
            
            {response && (
              <div className="mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-eldercare-blue/10 flex items-center justify-center flex-shrink-0">
                    <Mic className="w-4 h-4 text-eldercare-blue" />
                  </div>
                  <div className="bg-eldercare-lightBlue p-3 rounded-2xl rounded-tl-none">
                    <p className="text-sm">{response}</p>
                  </div>
                </div>
              </div>
            )}
            
            {!transcript && !response && (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-eldercare-lightBlue flex items-center justify-center">
                  <Mic className="w-8 h-8 text-eldercare-blue" />
                </div>
                <p className="text-muted-foreground mb-4">
                  How can I help you today?
                </p>
                <p className="text-xs text-muted-foreground mb-6">
                  Try saying: "Find a caregiver for my mother" or "What services do you offer?"
                </p>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your question..."
                className="flex-1 px-4 py-2 rounded-full bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-eldercare-blue/20"
              />
              <button
                onClick={handleListen}
                className={`p-3 rounded-full btn-press ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-eldercare-blue text-white'
                }`}
                disabled={isListening}
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceAssistant;
