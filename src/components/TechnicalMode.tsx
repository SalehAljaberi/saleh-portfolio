import { useRef, useEffect } from "react";
import { Code, Palette, Database, Globe, Smartphone, Zap, ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "./ui/ScrollReveal";
import MagneticButton from "./ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const TechnicalMode = () => {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const techStackRef = useRef(null);
  const projectsRef = useRef(null);
  const processRef = useRef(null);
  
  const techStack = [
    {
      category: "Frontend",
      icon: Code,
      technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Framer Motion"],
      color: "indigo"
    },
    {
      category: "Backend",
      icon: Database,
      technologies: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis"],
      color: "purple"
    },
    {
      category: "UX/Design",
      icon: Palette,
      technologies: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems"],
      color: "pink"
    },
    {
      category: "Tools & Services",
      icon: Zap,
      technologies: ["Git", "Docker", "AWS", "Twilio", "Stripe", "Vercel"],
      color: "blue"
    }
  ];

  const projects = [
    {
      title: "Workintech Learning Platform",
      description: "Comprehensive e-learning platform for coding bootcamp students with interactive courses, progress tracking, and real-time collaboration features.",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      features: ["Interactive Code Editor", "Real-time Collaboration", "Progress Analytics", "Responsive Design"],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500",
      liveDemo: "#",
      github: "#"
    },
    {
      title: "Medical Clinic Management System",
      description: "Full-stack web application for managing patient records, appointments, and billing with secure authentication and data encryption.",
      technologies: ["React", "Express", "PostgreSQL", "JWT"],
      features: ["Patient Management", "Appointment Scheduling", "Billing System", "Secure Authentication"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500",
      liveDemo: "#",
      github: "#"
    },
    {
      title: "Headless CMS with Twilio Integration",
      description: "Custom content management system with SMS notification capabilities for automated customer communication workflows.",
      technologies: ["Node.js", "React", "Twilio API", "MongoDB"],
      features: ["Content Management", "SMS Automation", "API Integration", "Admin Dashboard"],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500",
      liveDemo: "#",
      github: "#"
    }
  ];
  
  useEffect(() => {
    // Hero section animation
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top 80%",
      }
    });
    
    heroTl.fromTo(".hero-icon", 
      { scale: 0, opacity: 0, rotation: -45 },
      { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" }
    );
    
    heroTl.fromTo(".hero-title", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      "-=0.3"
    );
    
    heroTl.fromTo(".hero-description", 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      "-=0.5"
    );
    
    // Tech stack animation
    const techStackCards = techStackRef.current?.querySelectorAll('.tech-stack-card');
    if (techStackCards) {
      gsap.fromTo(techStackCards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: techStackRef.current,
            start: "top 75%"
          }
        }
      );
    }
    
    // Process animation
    const processSteps = processRef.current?.querySelectorAll('.process-step');
    if (processSteps) {
      gsap.fromTo(processSteps,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.2,
          duration: 0.7,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: processRef.current,
            start: "top 75%"
          }
        }
      );
      
      // Animate connecting line between steps
      gsap.fromTo(".process-line",
        { width: "0%" },
        { 
          width: "100%", 
          duration: 1.5, 
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: processRef.current,
            start: "top 75%"
          }
        }
      );
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="space-y-20">
      {/* Hero Section */}
      <section ref={heroRef} className="text-center py-12 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full hero-icon">
              <Code className="text-indigo-600 dark:text-indigo-400" size={32} />
            </div>
            <h2 className="text-4xl font-bold hero-title bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Technical & UX Development
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto hero-description">
            Creating scalable web applications and intuitive user experiences through 
            modern development practices and user-centered design principles.
          </p>
        </div>
      </section>

      {/* Tech Stack */}
      <section ref={techStackRef} className="relative overflow-hidden">
        <ScrollReveal animation="fade">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-10 text-white shadow-lg">
            <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center space-x-2">
              <Globe size={24} />
              <span>Technical Stack</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {techStack.map((stack, index) => (
                <div 
                  key={index} 
                  className="tech-stack-card bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 transition-all duration-300 hover:bg-white/20"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <stack.icon className="text-white" size={24} />
                    </div>
                    <h4 className="font-semibold text-white text-lg">{stack.category}</h4>
                  </div>
                  <div className="space-y-2.5">
                    {stack.technologies.map((tech, techIndex) => (
                      <div key={techIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        <span className="text-sm text-white/90">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Featured Projects */}
      <section ref={projectsRef}>
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="w-12 h-1 bg-indigo-500/30 rounded-full"></div>
          <h3 className="text-2xl font-bold text-center flex items-center justify-center space-x-2">
            <Smartphone className="text-indigo-600 dark:text-indigo-400" size={24} />
            <span>Featured Projects</span>
          </h3>
          <div className="w-12 h-1 bg-indigo-500/30 rounded-full"></div>
        </div>
        
        <div className="space-y-16">
          {projects.map((project, index) => (
            <ScrollReveal 
              key={index} 
              animation={index % 2 === 0 ? "slide-right" : "slide-left"} 
              threshold={0.1}
            >
              <div className={`relative bg-card rounded-xl overflow-hidden shadow-md ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } lg:flex border border-indigo-100 dark:border-indigo-900/30`}>
                {/* Decorative pattern */}
                <div className="absolute inset-0 bg-grid-indigo-100 dark:bg-grid-indigo-900/10 opacity-30"></div>
                
                {/* Image section */}
                <div className="lg:w-2/5 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/80 to-purple-600/80 mix-blend-multiply"></div>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover object-center lg:h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-4">
                      <a 
                        href={project.liveDemo} 
                        className="flex items-center space-x-1 bg-white text-indigo-600 px-3 py-2 rounded-md text-sm hover:bg-opacity-90 transition-all"
                      >
                        <ExternalLink size={14} />
                        <span>Live Demo</span>
                      </a>
                      <a 
                        href={project.github} 
                        className="flex items-center space-x-1 bg-gray-800 text-white px-3 py-2 rounded-md text-sm hover:bg-opacity-90 transition-all"
                      >
                        <Github size={14} />
                        <span>View Code</span>
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Content section */}
<div className="lg:w-3/5 p-8 relative z-10">
  <h4 className="text-xl font-bold mb-3 text-indigo-700 dark:text-indigo-400">
    {project.title}
  </h4>
  <p className="text-muted-foreground mb-5">
    {project.description}
  </p>
  <div className="mb-5">
    <div className="flex items-center space-x-2 mb-3">
      <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
      <h5 className="font-medium">Key Features</h5>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-3">
      {project.features.map((feature, featureIndex) => (
        <div key={featureIndex} className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
          <span className="text-sm">{feature}</span>
        </div>
      ))}
    </div>
  </div>
  
  {/* Technologies section - increased bottom margin */}
  <div className="mb-16">
    <div className="flex items-center space-x-2 mb-3">
      <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
      <h5 className="font-medium">Technologies</h5>
    </div>
    <div className="flex flex-wrap gap-2 ml-3">
      {project.technologies.map((tech, techIndex) => (
        <span key={techIndex} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full text-xs font-medium">
          {tech}
        </span>
      ))}
    </div>
  </div>
  
  {/* Button section - increased spacing between buttons */}
  <div className="flex space-x-6 lg:absolute lg:bottom-8">
    <MagneticButton
      strength={0.3}
      as="a"
      href={project.liveDemo}
      className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm flex items-center space-x-2"
    >
      <span>Live Demo</span>
      <ArrowUpRight size={16} />
    </MagneticButton>
    <MagneticButton
      strength={0.3}
      as="a"
      href={project.github}
      className="border border-indigo-600 text-indigo-600 dark:text-indigo-400 px-5 py-2 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors text-sm flex items-center space-x-2"
    >
      <span>Source Code</span>
      <Github size={16} />
    </MagneticButton>
  </div>
</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* UX Process */}
      <ScrollReveal animation="fade" threshold={0.1}>
        <section ref={processRef} className="bg-white dark:bg-pakistan rounded-xl p-10 shadow-sm relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl -z-10 opacity-70"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl -z-10 opacity-70"></div>
          
          <h3 className="text-2xl font-bold text-center mb-12">UX-Driven Development Process</h3>
          
          <div className="flex flex-col md:flex-row justify-between relative">
            {/* Connecting line between steps */}
            <div className="hidden md:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-indigo-200 dark:bg-indigo-900/30 z-0 process-line"></div>
            
            {[
              {
                number: "01",
                title: "Research & Discovery",
                description: "User interviews, competitive analysis, and requirements gathering"
              },
              {
                number: "02",
                title: "Design & Prototype",
                description: "Wireframing, UI design, and interactive prototyping"
              },
              {
                number: "03",
                title: "Develop & Test",
                description: "Agile development with continuous user testing"
              },
              {
                number: "04",
                title: "Deploy & Iterate",
                description: "Launch, monitor performance, and continuous improvement"
              }
            ].map((step, index) => (
              <div key={index} className="process-step flex-1 text-center relative z-10 mb-10 md:mb-0">
                <div className="w-16 h-16 md:w-12 md:h-12 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
                  <span className="font-bold text-lg md:text-base">{step.number}</span>
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg mx-auto max-w-[200px]">
                  <h4 className="font-semibold mb-2 text-indigo-700 dark:text-indigo-400">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>
      
      {/* Skills Graph */}
      <ScrollReveal animation="slide-up" threshold={0.2}>
        <section className="bg-card rounded-xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-center mb-8">Technical Proficiency</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              { skill: "Front-end Development", percentage: 90 },
              { skill: "UI/UX Design", percentage: 85 },
              { skill: "Back-end Development", percentage: 80 },
              { skill: "Mobile Responsive Design", percentage: 95 },
              { skill: "API Integration", percentage: 85 },
              { skill: "Performance Optimization", percentage: 75 }
            ].map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">{skill.skill}</span>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    {skill.percentage}%
                  </span>
                </div>
                <div className="h-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full origin-left"
                    style={{ width: `${skill.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};

export default TechnicalMode;