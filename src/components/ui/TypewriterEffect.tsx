
import { useState, useEffect } from "react";

interface TypewriterEffectProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

const TypewriterEffect = ({
  text,
  speed = 50,
  delay = 0,
  onComplete,
}: TypewriterEffectProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setStartTyping(true);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!startTyping) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, startTyping, onComplete]);

  return (
    <div className="relative inline-block">
      <span>{displayedText}</span>
      <span className="absolute inline-block w-1 h-full bg-secondary ml-1 animate-cursor-blink"></span>
    </div>
  );
};

export default TypewriterEffect;
