// src/components/ProjectCard.tsx - Enhanced version
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  category: "development" | "ux" | "sales";
  image: string;
  technologies: string[];
  link?: string;
}

const ProjectCard = ({
  title,
  description,
  category,
  image,
  technologies,
  link
}: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Get category display name
  const getCategoryName = () => {
    switch(category) {
      case "development": return "Development";
      case "ux": return "UX Design";
      case "sales": return "Sales";
      default: return category;
    }
  };
  
  // Get category color class
  const getCategoryColor = () => {
    switch(category) {
      case "development": return "bg-indigo-500 dark:bg-indigo-600";
      case "ux": return "bg-teal-500 dark:bg-teal-600";
      case "sales": return "bg-amber-500 dark:bg-amber-600";
      default: return "bg-gray-500 dark:bg-gray-600";
    }
  };
  
  // 3D tilt effect on hover
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (y - centerY) / 10;
    const tiltY = (centerX - x) / 10;
    
    gsap.to(card, {
      rotationX: tiltX,
      rotationY: tiltY,
      duration: 0.5,
      ease: "power2.out"
    });
    
    // Subtle image movement
    gsap.to(imageRef.current, {
      scale: 1.05,
      x: (x - centerX) / 15,
      y: (y - centerY) / 15,
      duration: 0.5,
      ease: "power2.out"
    });
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    
    gsap.to(cardRef.current, {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      duration: 0.3,
      ease: "power2.out"
    });
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    
    gsap.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      duration: 0.5,
      ease: "power2.out"
    });
    
    gsap.to(imageRef.current, {
      scale: 1,
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <div 
      ref={cardRef}
      className="rounded-xl overflow-hidden bg-card shadow-sm transition-all duration-300 h-full flex flex-col transform-gpu"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="h-48 relative overflow-hidden">
        <div 
          ref={imageRef}
          className="absolute inset-0 bg-cover bg-center transition-transform"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className={`absolute top-0 right-0 m-3 px-2 py-1 rounded text-xs font-medium text-white ${getCategoryColor()}`}>
          {getCategoryName()}
        </div>
        
        {/* Gradient overlay */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}
        ></div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex-grow">{description}</p>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => (
              <span 
                key={index} 
                className="text-xs bg-muted/30 px-2 py-1 rounded transition-all duration-300 hover:bg-muted/50"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {link && (
            <a
              href={link}
              className={`inline-flex items-center text-sm font-medium transition-all duration-300 
                ${isHovered ? 'text-tiger' : 'text-dark-moss dark:text-earth'}`}
            >
              View Project
              <ArrowUpRight size={16} className={`ml-1 transition-all duration-300 ${isHovered ? 'translate-x-1 -translate-y-1' : ''}`} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;