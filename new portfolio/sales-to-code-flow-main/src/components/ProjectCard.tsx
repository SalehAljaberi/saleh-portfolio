
import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
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
  link,
}: ProjectCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="h-72 w-full preserve-3d cursor-pointer card-shadow"
      onClick={toggleFlip}
    >
      <div 
        className={`flip-card-inner ${isFlipped ? "animate-flip-card" : "animate-unflip-card"}`}
      >
        {/* Front of card */}
        <div 
          className="flip-card-front rounded-lg overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(40, 54, 24, 0.7), rgba(40, 54, 24, 0.7)), url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="flex flex-col justify-between h-full p-6 text-cornsilk">
            <div>
              <span className="bg-tiger/80 text-cornsilk text-xs uppercase font-bold px-2 py-1 rounded">
                {category}
              </span>
              <h3 className="text-xl md:text-2xl font-bold mt-4">{title}</h3>
            </div>
            <div className="flex items-center text-sm font-medium">
              <span>View Details</span>
              <ArrowRight size={16} className="ml-2" />
            </div>
          </div>
        </div>
        
        {/* Back of card */}
        <div className="flip-card-back bg-cornsilk dark:bg-pakistan rounded-lg p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-sm">{description}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-2">Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="text-xs bg-dark-moss text-cornsilk py-1 px-2 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {link && (
              <a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-secondary hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                View Project <ArrowRight size={14} className="inline ml-1" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
