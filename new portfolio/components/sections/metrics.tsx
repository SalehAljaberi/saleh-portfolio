'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Counter } from '@/components/ui/counter';

export default function Metrics() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const metrics = [
    { value: 40, suffix: '%', label: 'Brand Awareness ↑', delay: 0 },
    { value: 5, suffix: '', label: 'Distributor Partnerships', delay: 0.2 },
    { value: 300, suffix: '+', label: 'Cold Calls', delay: 0.4 },
    { value: 25, suffix: '%', label: 'Sales ↑', delay: 0.6 },
  ];

  return (
    <section id="metrics" className="py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 gradientBg opacity-20 z-0"></div>

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Metrics</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            AI-Prompting Pro for Rapid Web Project Iterations and Export Sales
            Expert with a track record of delivering exceptional results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: metric.delay }}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-lg shadow-sm overflow-hidden"
            >
              <Counter
                start={0}
                end={metric.value}
                suffix={metric.suffix}
                label={metric.label}
                delay={metric.delay}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
