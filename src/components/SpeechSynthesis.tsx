import React from 'react';
import { Volume } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SpeechSynthesisProps {
  text: string;
  label?: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost'; 
  size?: 'default' | 'sm' | 'lg';
  iconOnly?: boolean;
}

export const useSpeechSynthesis = () => {
  // Keep track of current utterance
  const utteranceRef = React.useRef<SpeechSynthesisUtterance | null>(null);
  
  const speak = (text: string, rate: number = 0.9) => {
    if (!window.speechSynthesis) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create a new utterance
    utteranceRef.current = new SpeechSynthesisUtterance(text);
    utteranceRef.current.rate = rate;
    
    // Speak the text
    window.speechSynthesis.speak(utteranceRef.current);
  };
  
  const cancel = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };
  
  const pause = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.pause();
    }
  };
  
  const resume = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.resume();
    }
  };
  
  const isSpeaking = () => {
    return window.speechSynthesis ? window.speechSynthesis.speaking : false;
  };
  
  return { speak, cancel, pause, resume, isSpeaking };
};

export const SpeakButton: React.FC<SpeechSynthesisProps> = ({
  text,
  label = "Read Aloud",
  className = "",
  variant = "ghost",
  size = "sm",
  iconOnly = false
}) => {
  const { speak } = useSpeechSynthesis();
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  
  const handleClick = () => {
    speak(text);
    setIsSpeaking(true);
    
    // Reset speaking state when speech ends
    const checkSpeechEnd = setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        setIsSpeaking(false);
        clearInterval(checkSpeechEnd);
      }
    }, 100);
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={`${className} ${isSpeaking ? 'bg-blue-100 text-blue-700' : ''}`}
      onClick={handleClick}
      aria-label={`Read ${label} aloud`}
    >
      <Volume className={`h-4 w-4 ${isSpeaking ? 'animate-pulse text-blue-700' : ''}`} />
      {!iconOnly && <span className={iconOnly ? "sr-only" : "ml-1"}>{label}</span>}
    </Button>
  );
};

export default SpeakButton;
