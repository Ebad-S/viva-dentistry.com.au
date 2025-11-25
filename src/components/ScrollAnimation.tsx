'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'parallax' | 'fadeInUp' | 'bounceIn' | 'rotateIn' | 'slideInDiagonal';
  delay?: number;
  duration?: number;
  parallaxOffset?: number;
}

const ScrollAnimation = ({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  duration = 0.5,
  parallaxOffset = 50,
}: ScrollAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  // Parallax scroll effect (only for parallax animation and if motion is enabled)
  const shouldUseParallax = animation === 'parallax' && !shouldReduceMotion;
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  const y = shouldUseParallax ? useTransform(scrollYProgress, [0, 1], [parallaxOffset, -parallaxOffset]) : null;
  const opacity = shouldUseParallax ? useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]) : null;
  const scale = shouldUseParallax ? useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]) : null;
  
  // Smooth spring animations (only if needed and motion is enabled)
  const springY = y && !shouldReduceMotion ? useSpring(y, { stiffness: 100, damping: 30 }) : null;
  const springScale = scale && !shouldReduceMotion ? useSpring(scale, { stiffness: 100, damping: 30 }) : null;

  useEffect(() => {
    // If reduced motion is preferred, show immediately
    if (shouldReduceMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [shouldReduceMotion]);

  const getAnimationVariants = () => {
    // If reduced motion is preferred, just fade in
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      };
    }

    const baseTransition = { duration, delay, ease: "easeOut" };
    
    switch (animation) {
      case 'fadeIn':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: baseTransition },
        };
      case 'slideUp':
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: baseTransition },
        };
      case 'slideLeft':
        return {
          hidden: { opacity: 0, x: 30 },
          visible: { opacity: 1, x: 0, transition: baseTransition },
        };
      case 'slideRight':
        return {
          hidden: { opacity: 0, x: -30 },
          visible: { opacity: 1, x: 0, transition: baseTransition },
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1, transition: baseTransition },
        };
      case 'fadeInUp':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0, 
            transition: { ...baseTransition, type: "spring", stiffness: 100, damping: 15 }
          },
        };
      case 'bounceIn':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { 
            opacity: 1, 
            scale: 1, 
            transition: { 
              ...baseTransition, 
              type: "spring", 
              stiffness: 150, 
              damping: 12 
            }
          },
        };
      case 'rotateIn':
        return {
          hidden: { opacity: 0, rotate: -30, scale: 0.9 },
          visible: { 
            opacity: 1, 
            rotate: 0, 
            scale: 1, 
            transition: baseTransition 
          },
        };
      case 'slideInDiagonal':
        return {
          hidden: { opacity: 0, x: -20, y: 20 },
          visible: { 
            opacity: 1, 
            x: 0, 
            y: 0, 
            transition: baseTransition 
          },
        };
      case 'parallax':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: baseTransition },
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: baseTransition },
        };
    }
  };

  if (animation === 'parallax' && springY && springScale && opacity) {
    return (
      <div ref={ref} className={`relative ${className}`}>
        <motion.div
          style={{ y: springY, opacity, scale: springScale }}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={getAnimationVariants()}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={getAnimationVariants()}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollAnimation; 