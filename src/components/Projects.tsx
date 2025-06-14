// src/components/Projects.tsx - Enhanced version
import { useState, useRef, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "./ui/ScrollReveal";
import MagneticButton from "./ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

type ProjectCategory = "all" | "development" | "ux" | "sales";

interface Project {
  id: number;
  title: string;
  description: string;
  category: "development" | "ux" | "sales";
  image: string;
  technologies: string[];
  link?: string;
}

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  
  const projects: Project[] = [
    {
      id: 1,
      title: "Workintech Learning Platform",
      description: "A responsive e-learning platform for coding bootcamp students with interactive courses and progress tracking.",
      category: "development",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      link: "#"
    },
    {
      id: 2,
      title: "E-Commerce UX Redesign",
      description: "Complete user experience overhaul for an e-commerce platform, increasing conversion rates by 15%.",
      category: "ux",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500",
      technologies: ["Figma", "Adobe XD", "User Testing", "Prototyping"],
      link: "#"
    },
    {
      id: 3,
      title: "Proleda Export Strategy",
      description: "Comprehensive export strategy leading to 40% brand awareness increase and new distributor partnerships.",
      category: "sales",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
      technologies: ["Market Analysis", "CRM Implementation", "Sales Pipeline"],
      link: "#"
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "Personal portfolio website built with modern web technologies and advanced animations.",
      category: "development",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=500",
      technologies: ["React", "Framer Motion", "TypeScript", "Tailwind CSS"],
      link: "#"
    },
    {
      id: 5,
      title: "Mobile App UX Design",
      description: "User-centered design for a health tracking mobile application with focus on accessibility.",
      category: "ux",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500",
      technologies: ["UI/UX", "Prototyping", "User Testing", "Wireframing"],
      link: "#"
    },
    {
      id: 6,
      title: "Sales Dashboard",
      description: "Interactive sales dashboard for tracking performance metrics and visualizing sales data.",
      category: "sales",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500",
      technologies: ["Data Analysis", "Visualization", "CRM Integration"],
      link: "#"
    }
  ];

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  useEffect(() => {
    // Heading animation
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
    
    // Filter buttons animation
    gsap.fromTo(filtersRef.current?.querySelectorAll("button"),
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: filtersRef.current,
          start: "top 80%",
        }
      }
    );
    
    // Setup horizontal scroll for projects in desktop view
    const setupHorizontalScroll = () => {
      if (window.innerWidth >= 1024 && projectsContainerRef.current) {
        // Only apply horizontal scroll on larger screens
        const container = projectsContainerRef.current;
        const sections = gsap.utils.toArray(container.children);
        
        // Reset any previous styles
        gsap.set(container, { 
          clearProps: "all",
          display: "flex",
          flexWrap: "nowrap",
          width: "auto",
          overflow: "visible"
        });
        
        gsap.set(sections, {
          flex: "0 0 auto",
          width: "33.333%",
          paddingRight: "1.5rem",
          paddingBottom: 0
        });
        
        // Create the horizontal scroll animation
        ScrollTrigger.create({
          trigger: container,
          pin: true,
          start: "top center",
          end: () => `+=${container.scrollWidth - container.offsetWidth + 100}`,
          scrub: 1,
          invalidateOnRefresh: true,
          animation: gsap.to(sections, {
            x: () => -(container.scrollWidth - container.offsetWidth),
            ease: "none"
          }),
          markers: false
        });
      } else {
        // Reset to normal grid layout on smaller screens
        gsap.set(projectsContainerRef.current, { 
          clearProps: "all",
          display: "grid"
        });
        gsap.set(projectsContainerRef.current?.children, {
          clearProps: "all"
        });
      }
    };
    
    // Initial setup
    setupHorizontalScroll();
    
    // Update on resize
    window.addEventListener("resize", setupHorizontalScroll);
    
    // Clean up
    return () => {
      window.removeEventListener("resize", setupHorizontalScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // When category changes, animate the projects
  useEffect(() => {
    if (projectsContainerRef.current) {
      // Fade out current projects
      gsap.to(".project-card", {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        stagger: 0.05,
        onComplete: () => {
          // After fade out, update DOM with filtered projects
          // Then fade in new projects
          gsap.fromTo(".project-card",
            { opacity: 0, scale: 0.95 },
            { 
              opacity: 1, 
              scale: 1, 
              duration: 0.5,
              stagger: 0.1,
              ease: "back.out(1.2)"
            }
          );
        }
      });
    }
  }, [activeCategory]);

  return (
    <section 
      ref={sectionRef} 
      id="projects" 
      className="section-padding bg-white dark:bg-pakistan relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-40 -left-40 w-96 h-96 rounded-full bg-tiger/5 blur-3xl"></div>
      <div className="absolute -bottom-20 right-20 w-72 h-72 rounded-full bg-dark-moss/5 blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="h-1 w-24 bg-tiger mx-auto transform transition-all duration-500 hover:w-32"></div>
          <ScrollReveal animation="fade">
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              A showcase of my technical development, UX design, and sales case studies.
            </p>
          </ScrollReveal>
        </div>

        <div ref={filtersRef} className="flex justify-center mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2 md:space-x-4">
            {["all", "development", "ux", "sales"].map((category, index) => (
              <MagneticButton
                key={category}
                className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all
                  ${activeCategory === category 
                    ? "bg-dark-moss text-cornsilk" 
                    : "bg-earth/20 hover:bg-earth/40"}`}
                onClick={() => setActiveCategory(category as ProjectCategory)}
                strength={0.2}
                size={1.05}
              >
                {category === "all" ? "All Projects" : category === "ux" ? "UX Design" : 
                  category.charAt(0).toUpperCase() + category.slice(1)}
              </MagneticButton>
            ))}
          </div>
        </div>

        <div 
          ref={projectsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:pin-spacer"
        >
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <ProjectCard
                title={project.title}
                description={project.description}
                category={project.category}
                image={project.image}
                technologies={project.technologies}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;