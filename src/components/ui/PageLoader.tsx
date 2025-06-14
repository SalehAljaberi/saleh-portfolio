// src/components/ui/PageLoader.tsx
import { useEffect, useState } from "react";
import { gsap } from "gsap";

interface PageLoaderProps {
  onComplete?: () => void;
}

const PageLoader = ({ onComplete }: PageLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 150);
    
    // Clean up interval
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (progress === 100) {
      // When progress reaches 100%, animate out the loader
      setTimeout(() => {
        gsap.to(".loader-content", {
          opacity: 0,
          y: -20,
          duration: 0.5
        });
        
        gsap.to(".loader-container", {
          y: "-100%",
          duration: 1,
          delay: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            setLoadingComplete(true);
            if (onComplete) onComplete();
          }
        });
      }, 500);
    }
  }, [progress, onComplete]);
  
  if (loadingComplete) return null;
  
  return (
    <div className="loader-container fixed inset-0 z-50 bg-cornsilk dark:bg-pakistan flex flex-col items-center justify-center">
      <div className="loader-content text-center">
        <h2 className="text-3xl font-bold mb-6">Saleh Al-Jaberi</h2>
        <div className="w-64 h-2 bg-muted/20 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-dark-moss dark:bg-earth rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-muted-foreground">
          {progress < 100 ? 'Loading portfolio...' : 'Welcome to my portfolio'}
        </p>
      </div>
    </div>
  );
};

export default PageLoader;