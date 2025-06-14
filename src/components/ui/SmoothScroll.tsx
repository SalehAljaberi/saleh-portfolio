// src/components/ui/SmoothScroll.tsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupSmoothScrolling } from "@/lib/scrollUtils";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
  speed?: number;
  smooth?: number;
}

const SmoothScroll = ({ children, speed = 1, smooth = 0.8 }: SmoothScrollProps) => {
  const smootherRef = useRef<any>(null);

  useEffect(() => {
    // Create the ScrollSmoother instance
    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: smooth,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });

    // Setup smooth scrolling for hash links
    const cleanup = setupSmoothScrolling();
    
    // Fix for iOS/Safari touch events
    const touchHandler = () => {
      if (smootherRef.current) {
        smootherRef.current.paused(false);
      }
    };
    
    document.addEventListener("touchstart", touchHandler, { passive: true });
    
    // Handle focus states for keyboard navigation
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
      }
    };
    
    const handleMouseDown = () => {
      document.body.classList.remove('using-keyboard');
    };
    
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      // Clean up all event listeners and plugins
      if (smootherRef.current) {
        smootherRef.current.kill();
      }
      cleanup();
      document.removeEventListener("touchstart", touchHandler);
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [smooth]);

  return (
    <div id="smooth-wrapper" className="smooth-wrapper">
      <div id="smooth-content" className="smooth-content" style={{ speed: speed }}>
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll;