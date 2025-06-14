'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background to-background/80 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            About Me
          </h2>

          <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6 md:p-8 shadow-lg">
            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-lg"
              >
                I'm{' '}
                <span className="font-semibold text-earth-yellow">
                  Saleh Al-Jaberi
                </span>
                , a multilingual Computer Engineering student and professional
                with a unique blend of technical and business expertise.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-muted-foreground"
              >
                My journey spans from the world of{' '}
                <span className="text-foreground">Export Sales Management</span>
                , where I've driven significant brand awareness and developed
                strategic partnerships, to the realm of{' '}
                <span className="text-foreground">Full-Stack Development</span>{' '}
                and
                <span className="text-foreground"> UX Design</span>, where I
                create intuitive, user-centered digital experiences.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-muted-foreground"
              >
                As an{' '}
                <span className="text-foreground">AI-Prompting Specialist</span>
                , I leverage cutting-edge tools to accelerate development
                workflows and create innovative solutions. My diverse background
                allows me to bridge the gap between business objectives and
                technical implementation, ensuring products that not only look
                good, but work well and deliver real value.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="pt-4 border-t border-border"
              >
                <h3 className="font-semibold text-xl mb-3">
                  Education & Certification
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-earth-yellow mr-2">•</span>
                    <div>
                      <p className="font-medium">Computer Engineering</p>
                      <p className="text-sm text-muted-foreground">
                        Currently Pursuing
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-earth-yellow mr-2">•</span>
                    <div>
                      <p className="font-medium">
                        Google UX Design Certificate
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Professional Certification
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-earth-yellow mr-2">•</span>
                    <div>
                      <p className="font-medium">
                        Workintech Full-Stack Development
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Traineeship
                      </p>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
