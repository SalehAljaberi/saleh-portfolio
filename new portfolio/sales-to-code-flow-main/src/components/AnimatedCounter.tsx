
import { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  threshold?: number;
}

const AnimatedCounter = ({
  value,
  duration = 2000,
  prefix = "",
  suffix = "",
  threshold = 0.5,
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            const start = 0;
            const end = value;
            const range = end - start;
            const increment = end > start ? 1 : -1;
            const stepTime = Math.abs(Math.floor(duration / range));
            
            let current = start;
            const timer = setInterval(() => {
              current += increment;
              setCount(current);
              
              if (current === end) {
                clearInterval(timer);
              }
            }, stepTime);
            
            return () => clearInterval(timer);
          }
        });
      },
      { threshold }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [value, duration, threshold]);

  return (
    <div ref={counterRef} className="font-bold text-3xl md:text-4xl">
      {prefix}
      {count}
      {suffix}
    </div>
  );
};

export default AnimatedCounter;
