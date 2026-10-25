'use client';

import React from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
  distance?: number;
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.65,
  className = '',
  distance = 50,
}: ScrollRevealProps) {
  let initialX = 0;
  let initialY = 0;

  if (direction === 'left') {
    initialX = -distance;
  } else if (direction === 'right') {
    initialX = distance;
  } else if (direction === 'up') {
    initialY = 30;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX, y: initialY }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
