'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, Github, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProjectTag {
  name: string;
  color: string;
}

interface Project {
  title: string;
  description: string;
  image: string;
  tags: ProjectTag[];
  category: string;
  metrics: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projectCategories = ['All', 'Sales', 'Development', 'UX Design', 'AI'];

  const projects: Project[] = [
    {
      title: 'Proleda Export Strategy',
      description:
        'Comprehensive export strategy that increased brand awareness by 40% and implemented effective CRM cross-selling techniques.',
      image:
        'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      tags: [
        { name: 'B2B', color: 'bg-blue-500' },
        { name: 'Strategy', color: 'bg-indigo-500' },
        { name: 'CRM', color: 'bg-violet-500' },
      ],
      category: 'Sales',
      metrics: [
        '40% brand awareness increase',
        '5 distributor partnerships',
        '15% increase in lead conversion',
        '300+ successful cold calls',
      ],
    },
    {
      title: 'Regional Sales Engineer Role',
      description:
        'Managed sales targets with consistent overperformance, conducted site redesigns, and executed successful cold calling campaigns.',
      image:
        'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      tags: [
        { name: 'Sales', color: 'bg-green-500' },
        { name: 'Engineering', color: 'bg-emerald-500' },
        { name: 'Management', color: 'bg-teal-500' },
      ],
      category: 'Sales',
      metrics: [
        '25% sales increase',
        'Target exceedance for 4 consecutive quarters',
        'Site redesign with 30% improved conversion',
        'Team leadership of 5 members',
      ],
    },
    {
      title: 'E-Commerce Dashboard',
      description:
        'Full-stack dashboard application for e-commerce analytics with real-time metrics and interactive visualizations.',
      image:
        'https://images.pexels.com/photos/330771/pexels-photo-330771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      tags: [
        { name: 'React', color: 'bg-blue-500' },
        { name: 'Node.js', color: 'bg-green-500' },
        { name: 'Chart.js', color: 'bg-purple-500' },
      ],
      category: 'Development',
      metrics: [
        '99.8% uptime',
        '15ms average response time',
        'Custom API integration',
        'Real-time data visualization',
      ],
      liveUrl: '#',
      githubUrl: 'https://github.com/SalehAljaberi',
    },
    {
      title: 'Task Management App',
      description:
        'Responsive web application for task management with user authentication, drag-and-drop functionality, and team collaboration features.',
      image:
        'https://images.pexels.com/photos/7147684/pexels-photo-7147684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      tags: [
        { name: 'TypeScript', color: 'bg-blue-600' },
        { name: 'Next.js', color: 'bg-black' },
        { name: 'Tailwind', color: 'bg-sky-500' },
      ],
      category: 'Development',
      metrics: [
        '98% positive user feedback',
        '5 collaborative features',
        'OAuth integration',
        'PWA optimization',
      ],
      liveUrl: '#',
      githubUrl: 'https://github.com/SalehAljaberi',
    },
    {
      title: 'Fitness App UX Redesign',
      description:
        'Complete user experience redesign for a fitness tracking application, increasing user retention and session duration.',
      image:
        'https://images.pexels.com/photos/1378424/pexels-photo-1378424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      tags: [
        { name: 'Figma', color: 'bg-purple-500' },
        { name: 'UX Research', color: 'bg-pink-500' },
        { name: 'Prototyping', color: 'bg-rose-500' },
      ],
      category: 'UX Design',
      metrics: [
        '45% increased retention',
        'User testing with 30 participants',
        '28% longer session duration',
        '12 validated design iterations',
      ],
      liveUrl: '#',
    },
    {
      title: 'AI-Generated Landing Page System',
      description:
        'Developed a system that leverages AI prompting to rapidly generate custom landing pages based on business requirements.',
      image:
        'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      tags: [
        { name: 'AI', color: 'bg-amber-500' },
        { name: 'Next.js', color: 'bg-black' },
        { name: 'Prompt Engineering', color: 'bg-orange-500' },
      ],
      category: 'AI',
      metrics: [
        '90% time saving vs manual development',
        'Custom prompt templates',
        'Component-based generation',
        'Integration with design systems',
      ],
      liveUrl: '#',
      githubUrl: 'https://github.com/SalehAljaberi',
    },
  ];

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background to-background/70 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Projects & Case Studies
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            A showcase of my professional work across sales, development, UX
            design, and AI prompting
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {projectCategories.map((category, index) => (
            <Button
              key={index}
              variant={activeFilter === category ? 'default' : 'outline'}
              className={`${
                activeFilter === category
                  ? 'bg-earth-yellow hover:bg-tigers-eye text-white'
                  : 'text-muted-foreground hover:text-foreground border-earth-yellow/30 hover:border-earth-yellow'
              }`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="projects-grid"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                inView={inView}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  inView: boolean;
}

function ProjectCard({ project, index, inView }: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col h-full"
      style={{ perspective: '1000px' }}
    >
      <div
        className={`relative w-full h-full rounded-xl overflow-hidden transition-all duration-700 transform-gpu ${
          isFlipped ? 'scale-[1.02]' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
        }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 backface-hidden bg-card border border-border rounded-xl overflow-hidden shadow-md"
          onClick={() => setIsFlipped(true)}
        >
          <div className="h-48 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          <div className="p-5">
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.map((tag, tagIndex) => (
                <Badge key={tagIndex} className={`${tag.color} text-white`}>
                  {tag.name}
                </Badge>
              ))}
            </div>

            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-muted-foreground mb-4">{project.description}</p>

            <Button
              variant="ghost"
              size="sm"
              className="text-earth-yellow hover:text-tigers-eye hover:bg-earth-yellow/10"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(true);
              }}
            >
              View Details
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 backface-hidden bg-card border border-border rounded-xl overflow-hidden shadow-md flex flex-col"
          style={{ transform: 'rotateY(180deg)' }}
          onClick={() => setIsFlipped(false)}
        >
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold mb-4">{project.title}</h3>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Key Metrics:
              </h4>
              <ul className="space-y-1">
                {project.metrics.map((metric, metricIndex) => (
                  <li key={metricIndex} className="flex items-start text-sm">
                    <span className="text-earth-yellow mr-2">•</span>
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 mb-3 mt-auto">
              {project.tags.map((tag, tagIndex) => (
                <Badge key={tagIndex} className={`${tag.color} text-white`}>
                  {tag.name}
                </Badge>
              ))}
            </div>

            <div className="flex gap-3 mt-4">
              {project.liveUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 text-sm border-earth-yellow text-earth-yellow hover:bg-earth-yellow/10"
                  asChild
                >
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Globe className="h-4 w-4" />
                    Live
                  </a>
                </Button>
              )}

              {project.githubUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 text-sm border-earth-yellow text-earth-yellow hover:bg-earth-yellow/10"
                  asChild
                >
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="h-4 w-4" />
                    Code
                  </a>
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground ml-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
              >
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
