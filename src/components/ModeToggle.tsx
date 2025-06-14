import { useEffect, useRef, useState } from "react";
import { TrendingUp, Code, ChevronRight } from "lucide-react";
import { gsap } from "gsap";

interface ModeToggleProps {
  currentMode: "sales" | "technical";
  onModeChange: (mode: "sales" | "technical") => void;
}

const ModeToggle = ({ currentMode, onModeChange }: ModeToggleProps) => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const tabsRef = useRef(null);
  const indicatorRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Apply technical mode class to document element
  useEffect(() => {
    if (currentMode === "technical") {
      document.documentElement.classList.add("technical-mode");
    } else {
      document.documentElement.classList.remove("technical-mode");
    }
  }, [currentMode]);

  // Initialize animations
  useEffect(() => {
    // Entrance animation
    gsap.fromTo(
      containerRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    gsap.fromTo(
      headingRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.2 }
    );
    
    gsap.fromTo(
      tabsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.4 }
    );

    gsap.fromTo(
      descriptionRef.current,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.6 }
    );
  }, []);

  const handleToggle = (mode: "sales" | "technical") => {
    if (isAnimating || currentMode === mode) return;
    
    setIsAnimating(true);
    
    // Animate the indicator
    gsap.to(indicatorRef.current, {
      x: mode === "technical" ? "100%" : "0%",
      duration: 0.5,
      ease: "power2.inOut"
    });
    
    // Animate the description text change
    gsap.to(descriptionRef.current, {
      y: 10,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        onModeChange(mode);
        setTimeout(() => {
          gsap.to(descriptionRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.4,
          });
          setIsAnimating(false);
        }, 100);
      }
    });
  };

  return (
    <div ref={containerRef} className="py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-earth/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-dark-moss/5 blur-3xl -z-10"></div>
      
      <div className="container-custom max-w-4xl mx-auto">
        <div className="text-center" ref={headingRef}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-dark-moss to-tiger dark:from-cornsilk dark:to-earth">
            Professional Focus
          </h2>
          <p className="text-lg text-foreground/80 mb-12">
            Explore my dual expertise in business and technology
          </p>
        </div>
        
        <div ref={tabsRef} className="relative mb-12 max-w-sm mx-auto">
          {/* Custom tabs design */}
          <div className="flex rounded-lg p-1 bg-muted/20 backdrop-blur-sm relative">
            {/* Moving indicator */}
            <div 
              ref={indicatorRef}
              className="absolute top-1 left-1 w-[calc(50%-2px)] h-[calc(100%-2px)] bg-white dark:bg-pakistan rounded-md shadow-md transition-all duration-500"
              style={{ transform: currentMode === "technical" ? "translateX(100%)" : "translateX(0)" }}
            ></div>
            
            {/* Tab buttons */}
            <button
              onClick={() => handleToggle("sales")}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-md transition-colors ${
                currentMode === "sales" ? "text-tiger" : "text-foreground/70"
              }`}
            >
              <TrendingUp size={18} />
              <span>Sales & Business</span>
            </button>
            <button
              onClick={() => handleToggle("technical")}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-md transition-colors ${
                currentMode === "technical" ? "text-indigo-500 dark:text-indigo-400" : "text-foreground/70"
              }`}
            >
              <Code size={18} />
              <span>Technical</span>
            </button>
          </div>
        </div>
        
        {/* Mode description card */}
        <div ref={descriptionRef} className="max-w-2xl mx-auto">
          <div
            className={`relative p-8 rounded-xl shadow-md backdrop-blur-sm overflow-hidden
              ${currentMode === "sales" 
                ? "bg-gradient-to-br from-teal-50/80 to-white dark:from-teal-900/20 dark:to-pakistan/80" 
                : "bg-gradient-to-br from-indigo-50/80 to-white dark:from-indigo-900/20 dark:to-pakistan/80"
              }`}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pattern-dots pattern-size-4 pattern-bg-transparent"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <ChevronRight 
                  className={currentMode === "sales" ? "text-teal-500" : "text-indigo-500"} 
                  size={20}
                />
                <h3 className="text-xl font-semibold">
                  {currentMode === "sales" ? "Business Expertise" : "Technical Skills"}
                </h3>
              </div>
              <p className="text-foreground/90 leading-relaxed">
                {currentMode === "sales" 
                  ? "Export Sales Management • B2B Growth • MENA Markets • CRM Strategy • Sales Analytics • International Trade"
                  : "Full-Stack Development • UX Design • React/Node.js • AI Integration • UI/UX • TypeScript"
                }
              </p>
              
              <div className="mt-6 flex justify-end">
                <button 
                  className={`text-sm font-medium flex items-center gap-1 transition-all hover:gap-2 
                    ${currentMode === "sales" ? "text-teal-600 dark:text-teal-400" : "text-indigo-600 dark:text-indigo-400"}`}
                >
                  <span>Learn more</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeToggle;