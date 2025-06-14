
import { useEffect, useState } from "react";
import TypewriterEffect from "./ui/TypewriterEffect";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowArrow(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col justify-center relative"
      style={{
        background: 'linear-gradient(135deg, rgba(254,250,224,0.95) 0%, rgba(221,161,94,0.8) 100%)',
      }}
    >
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="text-sm md:text-base uppercase tracking-wider text-dark-moss font-semibold">
              Saleh Al-Jaberi
            </span>
            <div className="h-1 w-24 bg-tiger mx-auto mt-2"></div>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <TypewriterEffect 
              text="From Sales Strategies to Scalable Code—I Build Products That Look Good & Work Well." 
              speed={40}
              delay={500}
              onComplete={() => {}}
            />
          </h1>
          
          <p className="text-lg md:text-xl text-pakistan/80 mt-6 mb-10 animate-fade-in">
            Computer Engineering Student & Export Sales Manager. 
            Full Stack Developer & UX Designer in Türkiye.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in">
            <a 
              href="#projects" 
              className="bg-pakistan text-cornsilk px-6 py-3 rounded-md hover:bg-dark-moss transition-colors"
            >
              View My Projects
            </a>
            <a 
              href="#about" 
              className="border border-pakistan text-pakistan px-6 py-3 rounded-md hover:bg-pakistan hover:text-cornsilk transition-colors"
            >
              Learn More About Me
            </a>
          </div>
        </div>
      </div>
      
      {showArrow && (
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={scrollToAbout}
        >
          <ArrowDown className="text-pakistan" size={32} />
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-radial opacity-10" aria-hidden="true"></div>
    </section>
  );
};

export default Hero;
