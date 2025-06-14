// src/contexts/TransitionContext.tsx
import { createContext, useState } from "react";
import { gsap } from "gsap";

export const TransitionContext = createContext({
  enterPage: (callback) => {},
  exitPage: (callback) => {}
});

export const TransitionProvider = ({ children }) => {
  const [timeline] = useState(() => gsap.timeline());
  
  const enterPage = (callback) => {
    timeline.fromTo(
      ".page-transition-overlay",
      { y: 0 },
      {
        y: "-100%",
        duration: 1,
        ease: "power3.inOut",
        onComplete: () => callback && callback()
      }
    );
  };
  
  const exitPage = (callback) => {
    timeline.fromTo(
      ".page-transition-overlay",
      { y: "100%" },
      {
        y: 0,
        duration: 0.8, 
        ease: "power3.inOut",
        onComplete: () => callback && callback()
      }
    );
  };
  
  return (
    <TransitionContext.Provider value={{ enterPage, exitPage }}>
      <div className="page-transition-overlay fixed inset-0 z-50 bg-pakistan transform translate-y-[-100%]"></div>
      {children}
    </TransitionContext.Provider>
  );
};