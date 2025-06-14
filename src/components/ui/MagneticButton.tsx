// src/components/ui/MagneticButton.tsx
import { useRef, useState, ReactNode } from "react";
import { gsap } from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  size?: number;
  strength?: number;
  onClick?: () => void;
  as?: "button" | "a" | "div";
  href?: string;
  target?: string;
}

const MagneticButton = ({
  children,
  className = "",
  size = 1,
  strength = 0.5,
  onClick,
  as = "button",
  href,
  target,
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const magneticStrength = isHovered ? strength : 0;
    
    gsap.to(buttonRef.current, {
      duration: 0.6,
      x: x * magneticStrength,
      y: y * magneticStrength,
      ease: "power3.out"
    });
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    gsap.to(buttonRef.current, {
      scale: size,
      duration: 0.4,
      ease: "power3.out"
    });
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    gsap.to(buttonRef.current, {
      scale: 1,
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)"
    });
  };
  
  const props = {
    className: `magnetic-button ${className}`,
    ref: buttonRef,
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick,
    style: { transformStyle: "preserve-3d" }
  };
  
  if (as === "a") {
    return (
      <a {...props} href={href} target={target}>
        {children}
      </a>
    );
  }
  
  if (as === "div") {
    return <div {...props}>{children}</div>;
  }
  
  return <button {...props}>{children}</button>;
};

export default MagneticButton;