// src/components/ui/ScrollReveal.tsx
import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  animation?: "fade" | "slide-up" | "slide-left" | "slide-right" | "zoom";
  delay?: number;
  duration?: number;
  threshold?: number;
  stagger?: number;
  distance?: number;
  childrenSelector?: string;
  once?: boolean;
  id?: string;
}

const ScrollReveal = ({
  children,
  animation = "fade",
  delay = 0,
  duration = 0.8,
  threshold = 0.2,
  stagger = 0.1,
  distance = 50,
  childrenSelector,
  once = true,
  id,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let targets = childrenSelector 
      ? element.querySelectorAll(childrenSelector) 
      : [element];
    
    let initialProps = {};
    let animatedProps = {};
    
    // Set animation based on type
    switch (animation) {
      case "fade":
        initialProps = { autoAlpha: 0, y: distance };
        animatedProps = { autoAlpha: 1, y: 0 };
        break;
      case "slide-up":
        initialProps = { autoAlpha: 0, y: distance };
        animatedProps = { autoAlpha: 1, y: 0 };
        break;
      case "slide-left":
        initialProps = { autoAlpha: 0, x: -distance };
        animatedProps = { autoAlpha: 1, x: 0 };
        break;
      case "slide-right":
        initialProps = { autoAlpha: 0, x: distance };
        animatedProps = { autoAlpha: 1, x: 0 };
        break;
      case "zoom":
        initialProps = { autoAlpha: 0, scale: 0.9 };
        animatedProps = { autoAlpha: 1, scale: 1 };
        break;
    }
    
    gsap.set(targets, initialProps);
    
    ScrollTrigger.batch(targets, {
      interval: 0.1,
      batchMax: 3,
      id: id || undefined,
      onEnter: (batch) => 
        gsap.to(batch, {
          ...animatedProps,
          stagger: stagger,
          duration: duration,
          delay: delay,
          ease: "power3.out",
          overwrite: true
        }),
      onEnterBack: (batch) => 
        gsap.to(batch, {
          ...animatedProps,
          stagger: stagger,
          duration: duration,
          ease: "power3.out",
          overwrite: true
        }),
      onLeave: !once ? 
        (batch) => gsap.set(batch, initialProps) : undefined,
      onLeaveBack: !once ? 
        (batch) => gsap.set(batch, initialProps) : undefined,
      start: `top+=${threshold * 100}% bottom`,
      end: `bottom+=${threshold * 100}% top`
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.id === id) {
          trigger.kill();
        }
      });
    };
  }, [animation, delay, duration, threshold, stagger, distance, childrenSelector, once, id]);
  
  return (
    <div ref={ref} className="scroll-reveal">
      {children}
    </div>
  );
};

export default ScrollReveal;