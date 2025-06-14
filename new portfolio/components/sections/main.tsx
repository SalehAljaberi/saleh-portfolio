'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Main() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleParallax = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const parallaxFactor = 0.5;
      heroRef.current.style.backgroundPositionY = `${
        scrollY * parallaxFactor
      }px`;
    };

    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  return (
    <div
    ref={heroRef}
    className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 px-4"
    style={{
      background: 'linear-gradient(135deg, rgba(254,250,224,0.95) 0%, rgba(221,161,94,0.8) 100%)',
    }}
  >
    {/* Background effects - semi-transparent overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/100 z-0"></div>

    {/* Radial gradient overlay */}
    <div className="absolute inset-0 bg-gradient-radial opacity-10" aria-hidden="true"></div>


      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto space-y-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-tigers-eye to-pakistan-green bg-clip-text text-transparent">
          <TypeAnimation
                sequence={[
                  'From Strategic Sales',
                  1000,
                  'To Scalable Code',
                  1000,
                  'From Strategic Sales to Scalable Code',
                  3000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-medium text-pakistan-green mt-4">
          Building Products That Look Good & Work Well
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-lg text-pakistan-green/80 mt-6 max-w-3xl mx-auto"
            >
            Computer Engineering student, Export Sales Manager, Full-Stack
            Developer trainee, UX designer, and AI-prompting specialist with a
            passion for creating seamless digital experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <Button
              size="lg"
              className="bg-pakistan-green text-cornsilk hover:bg-dark-moss-green transition-colors"
              asChild
            >
              <a href="#contact">Get In Touch</a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-pakistan-green text-pakistan-green hover:bg-pakistan-green/10 hover:text-cornsilk hover:bg-pakistan-green"
              asChild
            >
              <a href="#projects">View Projects</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 2.5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <a
          href="#metrics"
          className="flex flex-col items-center text-pakistan-green hover:text-dark-moss-green transition-colors"
          >
          <span className="text-sm mb-2">Scroll Down</span>
          <ArrowDown className="h-5 w-5" />
        </a>
      </motion.div>
      
    </div>
  );
}
