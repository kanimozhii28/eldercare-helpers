
import React from 'react';
import { VolumeUp } from 'lucide-react';
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
  const speak = (text: string, rate: number = 0.9) => {
    if (!window.speechSynthesis) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
  };
  
  return { speak };
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
  
  const handleClick = () => {
    speak(text);
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={handleClick}
      aria-label={`Read ${label} aloud`}
    >
      <VolumeUp className="h-4 w-4" />
      {!iconOnly && <span className={iconOnly ? "sr-only" : "ml-1"}>{label}</span>}
    </Button>
  );
};

export default SpeakButton;
