"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

interface CounterProps {
  start: number;
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number;
}

export function Counter({
  start = 0,
  end,
  duration = 2,
  delay = 0,
  prefix = '',
  suffix = '',
  label,
  decimals = 0,
}: CounterProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="text-center p-4"
    >
      <div className="text-3xl md:text-4xl font-bold mb-2 text-earth-yellow">
        {prefix}
        {inView || hasAnimated ? (
          <CountUp
            start={start}
            end={end}
            duration={duration}
            decimals={decimals}
            separator=","
            useEasing={true}
          />
        ) : (
          start
        )}
        {suffix}
      </div>
      <p className="text-muted-foreground">{label}</p>
    </motion.div>
  );
}