
import { useState } from "react";
import ProjectCard from "./ProjectCard";

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

  return (
    <section id="projects" className="section-padding bg-white dark:bg-pakistan">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="h-1 w-24 bg-tiger mx-auto"></div>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            A showcase of my technical development, UX design, and sales case studies.
          </p>
        </div>

        <div className="flex justify-center mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2 md:space-x-4">
            {["all", "development", "ux", "sales"].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category as ProjectCategory)}
                className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all
                  ${activeCategory === category 
                    ? "bg-dark-moss text-cornsilk" 
                    : "bg-earth/20 hover:bg-earth/40"}`}
              >
                {category === "all" ? "All Projects" : category === "ux" ? "UX Design" : 
                  category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              category={project.category}
              image={project.image}
              technologies={project.technologies}
              link={project.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
