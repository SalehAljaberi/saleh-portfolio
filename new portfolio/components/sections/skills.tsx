'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  LineChart,
  BarChart,
  Palette,
  Code,
  Laptop,
  BrainCircuit,
  Users,
  Languages,
  CreditCard,
  BarChartHorizontal,
} from 'lucide-react';

interface Skill {
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string[];
  color: string;
}

export default function Skills() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills: Skill[] = [
    {
      title: 'Export Sales',
      icon: <BarChart className="h-6 w-6" />,
      description:
        'Strategic B2B sales and CRM expertise with proven results across markets.',
      details: [
        '40% increase in brand awareness across target markets',
        'Established 5 key distributor partnerships',
        'Implemented cross-selling strategies via CRM',
        'Conducted over 300 cold calls with high conversion rate',
      ],
      color: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'Full-Stack Development',
      icon: <Code className="h-6 w-6" />,
      description:
        'Creating responsive, performant web applications with modern technologies.',
      details: [
        'JavaScript, TypeScript, React, Next.js',
        'Node.js, Express, RESTful APIs',
        'Database design and management',
        'Component-driven development and state management',
      ],
      color: 'from-green-500 to-emerald-600',
    },
    {
      title: 'UX Design',
      icon: <Palette className="h-6 w-6" />,
      description:
        'Crafting intuitive user experiences through research-driven design.',
      details: [
        'User research and persona development',
        'Wireframing and prototyping',
        'Usability testing and iterative design',
        'Information architecture and user flows',
      ],
      color: 'from-purple-500 to-pink-600',
    },
    {
      title: 'AI Prompt Engineering',
      icon: <BrainCircuit className="h-6 w-6" />,
      description:
        'Leveraging AI to accelerate development and solve complex problems.',
      details: [
        'Natural language to code conversion',
        'Automated UI component generation',
        'Rapid prototyping with AI assistance',
        'Optimizing prompts for maximum utility',
      ],
      color: 'from-orange-500 to-red-600',
    },
  ];

  const additionalSkills = [
    { name: 'CRM Systems', icon: <Users className="h-4 w-4" /> },
    { name: 'Multilingual', icon: <Languages className="h-4 w-4" /> },
    { name: 'B2B Strategy', icon: <BarChartHorizontal className="h-4 w-4" /> },
    { name: 'Digital Marketing', icon: <LineChart className="h-4 w-4" /> },
    { name: 'E-commerce', icon: <CreditCard className="h-4 w-4" /> },
    { name: 'Technical Writing', icon: <Laptop className="h-4 w-4" /> },
  ];

  const handleCardClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 gradientBg opacity-30 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            A diverse skillset bridging business strategy and technical
            implementation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleCardClick(index)}
              className={`hover-card bg-card/40 backdrop-blur-sm border border-border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                expandedIndex === index ? 'scale-105 shadow-lg' : 'shadow-md'
              }`}
            >
              <div className="p-6">
                <div
                  className={`inline-flex items-center justify-center p-3 rounded-lg bg-gradient-to-br ${skill.color} text-white mb-4`}
                >
                  {skill.icon}
                </div>

                <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {skill.description}
                </p>

                {expandedIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-border"
                  >
                    <ul className="space-y-2">
                      {skill.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-earth-yellow mr-2">•</span>
                          <span className="text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6 shadow-md"
        >
          <h3 className="text-xl font-semibold mb-4 text-center">
            Additional Skills
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {additionalSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                className="flex flex-col items-center justify-center p-4 bg-background/50 backdrop-blur-sm rounded-lg border border-border text-center hover:border-earth-yellow transition-colors"
              >
                <div className="p-2 rounded-full bg-muted mb-2">
                  {skill.icon}
                </div>
                <span className="text-sm font-medium">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
