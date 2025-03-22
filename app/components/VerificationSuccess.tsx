'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FaCheckCircle } from 'react-icons/fa';

export default function VerificationSuccess() {
  const [verified, setVerified] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 3D effect with mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Configure spring physics for smoother motion
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [0, 300], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 300], [-15, 15]), springConfig);

  useEffect(() => {
    // Start verification animation after a short delay
    const timer = setTimeout(() => {
      setVerified(true);
      
      // Advanced confetti effect
      const duration = 5 * 1000;
      const end = Date.now() + duration;
      
      const colors = ['#10b981', '#34d399', '#f59e0b', '#fbbf24'];
      
      (function frame() {
        // Launch multiple confetti bursts
        confetti({
          particleCount: 30,
          angle: 60,
          spread: 55,
          origin: { x: 0.3, y: 0.5 },
          colors: colors,
          shapes: ['circle', 'square'],
          scalar: 2,
        });
        
        confetti({
          particleCount: 30,
          angle: 120,
          spread: 55,
          origin: { x: 0.7, y: 0.5 },
          colors: colors,
          shapes: ['circle', 'square'],
          scalar: 2,
        });
        
        // Keep launching until duration expires
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = containerRef.current;
    const x = e.clientX - offsetLeft;
    const y = e.clientY - offsetTop;
    
    mouseX.set(x);
    mouseY.set(y);
    
    // Update glare effect position
    if (containerRef.current) {
      const glareElement = containerRef.current.querySelector('.card-glare') as HTMLElement;
      if (glareElement) {
        const glareX = (x / offsetWidth) * 100;
        const glareY = (y / offsetHeight) * 100;
        glareElement.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%)`;
      }
    }
  };
  
  const handleMouseLeave = () => {
    mouseX.set(150);
    mouseY.set(150);
  };
  
  return (
    <div 
      ref={containerRef}
      className="flex justify-center mb-8 perspective-1500"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        className="relative preserve-3d"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Animated orbs in background */}
        <div className="glow-orb-premium absolute w-40 h-40 -top-12 -left-12 opacity-40 z-0"></div>
        <div className="glow-orb-premium absolute w-32 h-32 -bottom-10 -right-10 opacity-30 z-0" style={{ animationDelay: "1s" }}></div>
        
        {/* Holographic ring effect */}
        <motion.div 
          className="absolute -inset-8 rounded-full opacity-20 holographic-border"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: verified ? 0.3 : 0, 
            scale: verified ? 1.2 : 0.5,
            rotateZ: verified ? 360 : 0,
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        />
        
        {/* Main success circle with 3D effect */}
        <motion.div 
          className="w-32 h-32 bg-emerald-500 dark:bg-emerald-600 rounded-full flex items-center justify-center glass-morphism-premium relative z-10"
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ 
            scale: verified ? [1, 1.05, 1] : 0.8, 
            opacity: verified ? 1 : 0.5,
          }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut",
            times: [0, 0.5, 1],
            repeat: verified ? Infinity : 0,
            repeatType: "reverse",
            repeatDelay: 2
          }}
          style={{ transform: "translateZ(40px)" }}
        >
          {/* Dynamic glare effect */}
          <div className="card-glare absolute inset-0 w-full h-full pointer-events-none rounded-full"></div>
          
          {/* Checkmark with dramatic reveal */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotateY: 180 }}
            animate={{ 
              scale: verified ? 1 : 0.5, 
              opacity: verified ? 1 : 0,
              rotateY: verified ? 0 : 180,
            }}
            transition={{ 
              delay: 0.3,
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
            style={{ transform: "translateZ(60px)" }}
            className="relative"
          >
            <FaCheckCircle className="text-white w-16 h-16" />
            
            {/* Subtle glow around the checkmark */}
            <motion.div 
              className="absolute inset-0 bg-white rounded-full blur-xl"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: verified ? [0, 0.5, 0] : 0 
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
              style={{ transform: "translateZ(-10px)" }}
            />
          </motion.div>
        </motion.div>
        
        {/* Pulsating rings */}
        <motion.div 
          className="absolute -inset-3 bg-emerald-400 dark:bg-emerald-500 rounded-full opacity-20 blur-md"
          initial={{ scale: 0.6 }}
          animate={{ 
            scale: verified ? [0.8, 1.2, 0.8] : 0.6,
          }}
          transition={{ 
            duration: 3,
            ease: "easeInOut",
            repeat: verified ? Infinity : 0,
            repeatType: "loop",
          }}
          style={{ transform: "translateZ(20px)" }}
        />
        
        <motion.div 
          className="absolute -inset-6 bg-amber-400 dark:bg-amber-500 rounded-full opacity-10 blur-md"
          initial={{ scale: 0.6 }}
          animate={{ 
            scale: verified ? [1, 1.4, 1] : 0.6,
          }}
          transition={{ 
            duration: 4,
            ease: "easeInOut",
            repeat: verified ? Infinity : 0,
            repeatType: "loop",
            delay: 0.5
          }}
          style={{ transform: "translateZ(10px)" }}
        />
        
        {/* Particle effects */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="particle-premium absolute"
              style={{ 
                width: `${Math.random() * 6 + 4}px`,
                height: `${Math.random() * 6 + 4}px`,
                transform: "translateZ(30px)"
              }}
              initial={{ 
                x: 0,
                y: 0,
                scale: 0,
                opacity: 0
              }}
              animate={{ 
                x: [
                  Math.random() * 120 - 60,
                  Math.random() * 120 - 60,
                  Math.random() * 120 - 60
                ],
                y: [
                  Math.random() * 120 - 60,
                  Math.random() * 120 - 60,
                  Math.random() * 120 - 60
                ],
                scale: verified ? [0, 1, 0] : 0,
                opacity: verified ? [0, 0.8, 0] : 0
              }}
              transition={{
                duration: Math.random() * 4 + 6,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
} 