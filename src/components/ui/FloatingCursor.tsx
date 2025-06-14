// src/components/ui/FloatingCursor.tsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const FloatingCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    const posX = { current: 0 };
    const posY = { current: 0 };
    const mouseX = { current: 0 };
    const mouseY = { current: 0 };
    
    gsap.to({}, 0.016, {
      repeat: -1,
      onRepeat: () => {
        posX.current += (mouseX.current - posX.current) / 9;
        posY.current += (mouseY.current - posY.current) / 9;
        
        gsap.set(follower, {
          css: {
            left: posX.current - 12,
            top: posY.current - 12
          }
        });
        
        gsap.set(cursor, {
          css: {
            left: mouseX.current,
            top: mouseY.current
          }
        });
      }
    });
    
    const handleMouseMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Add hover effects for clickable elements
    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 1.5, opacity: 0.8, duration: 0.3 });
      gsap.to(follower, { scale: 3, opacity: 0, duration: 0.3 });
    };
    
    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(follower, { scale: 1, opacity: 0.5, duration: 0.3 });
    };
    
    const clickables = document.querySelectorAll('a, button, [role="button"]');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
  
  return (
    <div className="cursor-container pointer-events-none fixed z-50 top-0 left-0 w-full h-full">
      <div 
        ref={cursorRef} 
        className="cursor rounded-full w-6 h-6 border-2 border-teal-500 fixed top-0 left-0 transform -translate-x-1/2 -translate-y-1/2"
      ></div>
      <div 
        ref={followerRef} 
        className="cursor-follower bg-teal-500 opacity-50 rounded-full w-24 h-24 fixed top-0 left-0 transform -translate-x-1/2 -translate-y-1/2"
      ></div>
    </div>
  );
};

export default FloatingCursor;