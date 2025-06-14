// src/components/About.tsx - Enhanced version
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedCounter from "./AnimatedCounter";
import ScrollReveal from "./ui/ScrollReveal";
import MagneticButton from "./ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

interface RoleInfo {
  title: string;
  description: string;
}

const About = () => {
  const [selectedRole, setSelectedRole] = useState<RoleInfo | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const roleDescriptionRef = useRef<HTMLDivElement>(null);
  
  const metrics = [
    { value: 40, suffix: "%", label: "Brand Awareness ↑" },
    { value: 5, label: "Distributor Partnerships" },
    { value: 300, suffix: "+", label: "Cold Calls" },
    { value: 25, suffix: "%", label: "Sales ↑" },
  ];
  
  const roles: Record<string, RoleInfo> = {
    sales: {
      title: "Export Sales Manager",
      description: "Leading B2B sales strategies for global markets with a data-driven approach. Specialized in developing distributor networks and creating scalable sales processes that consistently exceed targets."
    },
    developer: {
      title: "Full Stack Developer",
      description: "Building responsive web applications and digital experiences using modern frameworks like React and Node.js. Creating maintainable codebases with a focus on performance and user experience."
    },
    designer: {
      title: "UX Designer",
      description: "Crafting intuitive user experiences through careful research and thoughtful design. Using principles from my Google UX certification to turn complex problems into simple, elegant solutions."
    },
    student: {
      title: "Computer Engineering Student",
      description: "Pursuing a comprehensive education in computer systems, algorithms, and software development. Combining academic knowledge with real-world applications in my professional career."
    }
  };

  useEffect(() => {
    // Title animation
    gsap.fromTo(headingRef.current,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        }
      }
    );
    
    // Staggered entrance for metrics cards
    const metricItems = metricsRef.current?.querySelectorAll('.metric-item');
    if (metricItems) {
      gsap.fromTo(metricItems,
        { scale: 0.8, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          stagger: 0.15,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: metricsRef.current,
            start: "top 75%",
          }
        }
      );
    }
    
    // Content parallax effect
    gsap.fromTo(contentRef.current,
      { y: 50 },
      {
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5
        }
      }
    );
    
    // Clean up ScrollTriggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const handleRoleHover = (role: string) => {
    setSelectedRole(roles[role]);
    
    // Animate role description change
    gsap.fromTo(roleDescriptionRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  };

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="section-padding bg-cornsilk dark:bg-pakistan/95 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-earth/5 blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-dark-moss/5 blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="h-1 w-24 bg-tiger mx-auto transform transition-all duration-500 hover:w-32"></div>
        </div>
        
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal animation="slide-right" threshold={0.2}>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                I'm a multilingual professional blending data-driven B2B sales expertise with 
                technical development skills. Based in Türkiye, I specialize in creating strategic sales 
                processes and building user-friendly digital experiences.
              </p>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">My Roles</h3>
                <div className="flex flex-wrap gap-3">
                  {Object.keys(roles).map((role) => (
                    <MagneticButton
                      key={role}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                        ${selectedRole?.title === roles[role].title 
                          ? "bg-dark-moss text-cornsilk" 
                          : "bg-earth/30 hover:bg-earth/50"}`}
                      onClick={() => handleRoleHover(role)}
                      strength={0.3}
                      size={1.05}
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </MagneticButton>
                  ))}
                </div>
                
                <div 
                  ref={roleDescriptionRef}
                  className="mt-6 bg-white/50 dark:bg-pakistan-green/30 p-6 rounded-lg shadow-sm min-h-[120px]"
                >
                  {selectedRole ? (
                    <div>
                      <h4 className="font-bold text-lg">{selectedRole.title}</h4>
                      <p className="mt-2">{selectedRole.description}</p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      Hover over a role to learn more about my experience.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-left" threshold={0.2}>
            <div ref={metricsRef} className="bg-white/50 dark:bg-pakistan-green/30 rounded-xl p-8 shadow-lg transform hover:translate-y-[-5px] transition-transform duration-500">
              <h3 className="text-xl font-bold mb-6 text-center">Key Achievements</h3>
              <div className="grid grid-cols-2 gap-8">
                {metrics.map((metric, index) => (
                  <div 
                    key={index}
                    className="text-center metric-item"
                  >
                    <div className="relative inline-flex items-center justify-center">
                      <div className="absolute inset-0 bg-earth/20 rounded-full scale-[1.2] blur-sm"></div>
                      <div className="relative">
                        <AnimatedCounter 
                          value={metric.value}
                          prefix={metric.prefix}
                          suffix={metric.suffix}
                          className="text-2xl md:text-3xl font-bold text-dark-moss"
                        />
                      </div>
                    </div>
                    <p className="text-sm mt-3 font-medium">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;