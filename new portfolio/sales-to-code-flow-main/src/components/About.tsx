
import { useState } from "react";
import AnimatedCounter from "./AnimatedCounter";

interface RoleInfo {
  title: string;
  description: string;
}

const About = () => {
  const [selectedRole, setSelectedRole] = useState<RoleInfo | null>(null);
  
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
  
  const handleRoleHover = (role: string) => {
    setSelectedRole(roles[role]);
  };

  return (
    <section id="about" className="section-padding bg-cornsilk dark:bg-pakistan/95">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="h-1 w-24 bg-tiger mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg">
              I'm a multilingual professional blending data-driven B2B sales expertise with 
              technical development skills. Based in Türkiye, I specialize in creating strategic sales 
              processes and building user-friendly digital experiences.
            </p>
            
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">My Roles</h3>
              <div className="flex flex-wrap gap-3">
                {Object.keys(roles).map((role) => (
                  <button
                    key={role}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                      ${selectedRole?.title === roles[role].title 
                        ? "bg-dark-moss text-cornsilk" 
                        : "bg-earth/30 hover:bg-earth/50"}`}
                    onMouseEnter={() => handleRoleHover(role)}
                    onFocus={() => handleRoleHover(role)}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </button>
                ))}
              </div>
              
              <div className="mt-6 bg-white/50 dark:bg-pakistan-green/30 p-4 rounded-lg min-h-[120px] animate-fade-in">
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
          
          <div className="bg-white/50 dark:bg-pakistan-green/30 rounded-xl p-8 shadow-lg">
            <h3 className="text-xl font-bold mb-6 text-center">Key Achievements</h3>
            <div className="grid grid-cols-2 gap-8">
              {metrics.map((metric, index) => (
                <div 
                  key={index}
                  className="text-center"
                >
                  <AnimatedCounter 
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                  />
                  <p className="text-sm mt-2">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
