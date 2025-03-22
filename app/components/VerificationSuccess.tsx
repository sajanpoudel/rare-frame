'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FaCheckCircle } from 'react-icons/fa';

export default function VerificationSuccess() {
  const [verified, setVerified] = useState(false);
  
  useEffect(() => {
    // Start verification animation after a short delay
    const timer = setTimeout(() => {
      setVerified(true);
      
      // Trigger confetti effect on verification
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="flex justify-center mb-8">
      <div className="relative">
        <motion.div 
          className="w-24 h-24 bg-emerald-500 dark:bg-emerald-600 rounded-full flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ 
            scale: verified ? 1 : 0.8, 
            opacity: verified ? 1 : 0.5,
          }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut" 
          }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: verified ? 1 : 0.5, 
              opacity: verified ? 1 : 0,
              rotateY: verified ? 0 : 180
            }}
            transition={{ 
              delay: 0.3,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
          >
            <FaCheckCircle className="text-white w-12 h-12" />
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute -inset-2 bg-emerald-400 dark:bg-emerald-500 rounded-full opacity-30 blur-md"
          initial={{ scale: 0.6 }}
          animate={{ 
            scale: verified ? [0.8, 1.2, 1] : 0.6,
          }}
          transition={{ 
            duration: 1.5,
            ease: "easeOut",
            times: [0, 0.7, 1],
            repeat: verified ? Infinity : 0,
            repeatType: "reverse",
            repeatDelay: 1
          }}
        />
      </div>
    </div>
  );
} 