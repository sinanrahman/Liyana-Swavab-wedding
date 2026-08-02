import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  delay?: number;
  showCursor?: boolean;
}

export function Typewriter({ text, speed = 150, className = '', delay = 0, showCursor = false }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, started, text, speed]);

  return (
    <div className={`inline-flex items-center ${className}`}>
      <span>{displayedText}</span>
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          className="inline-block w-[2px] h-[1em] bg-current ml-1"
          style={{ transform: 'translateY(10%)' }}
        />
      )}
    </div>
  );
}
