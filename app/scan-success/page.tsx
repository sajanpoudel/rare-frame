'use client';

import React, { useRef, use } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FaGithub, FaTicketAlt, FaWallet, FaEthereum } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
import VerificationSuccess from '../components/VerificationSuccess';
import { useSearchParams } from 'next/navigation';

export default function ScanSuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Rename to avoid conflict with props
  const params = useSearchParams();
  const walletAddress = params.get('wallet') || 'Unknown';
  
  // Helper function to truncate wallet address
  const truncateAddress = (address: string) => {
    return address.length > 10
      ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
      : address;
  };

  // 3D effect with mouse tracking for the main card
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Configure spring physics for smoother 3D effect
  const springConfig = { damping: 30, stiffness: 100 };
  const rotateX = useSpring(useTransform(mouseY, [0, 400], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 400], [-5, 5]), springConfig);
  
  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    
    // Update card glare effect
    if (containerRef.current) {
      const glareElement = containerRef.current.querySelector('.card-glare') as HTMLElement;
      if (glareElement) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glareElement.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 80%)`;
      }
    }
  };
  
  const handleMouseLeave = () => {
    mouseX.set(200);
    mouseY.set(200);
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-10 sm:px-6 sm:py-16 my-8 perspective-2000">
      {/* Background particle effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`bg-particle-${i}`}
            className="absolute rounded-full bg-emerald-500 dark:bg-emerald-400"
            style={{
              width: `${Math.random() * 12 + 3}px`,
              height: `${Math.random() * 12 + 3}px`,
              filter: 'blur(2px)',
              opacity: 0.15,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [Math.random() * 10, Math.random() * -30, Math.random() * 10],
              x: [Math.random() * 10, Math.random() * -20, Math.random() * 10],
              opacity: [0.05, 0.15, 0.05],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      {/* Success animation */}
      <VerificationSuccess />
      
      <motion.h1 
        className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 text-3d"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-amber-500 to-emerald-500 dark:from-emerald-200 dark:via-amber-200 dark:to-emerald-200 animate-gradient">
          Ticket Successfully Verified
        </span>
      </motion.h1>
      
      <motion.div
        ref={containerRef}
        className="relative preserve-3d"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Card glare effect */}
        <div className="card-glare absolute inset-0 w-full h-full pointer-events-none z-10 rounded-xl"></div>
        
        {/* Holographic border effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-emerald-500 rounded-xl opacity-70 blur-sm animate-gradient"></div>
        
        <motion.div 
          className="bg-emerald-50 dark:bg-emerald-900/30 p-6 sm:p-8 border border-emerald-100 dark:border-emerald-800 mb-8 glass-morphism-premium relative z-0 overflow-hidden"
          style={{ 
            transform: "translateZ(30px)",
            clipPath: "polygon(0 0, 97% 0, 100% 30px, 100% 100%, 3% 100%, 0 calc(100% - 30px))"
          }}
        >
          <div className="bg-holographic absolute inset-0 opacity-30 pointer-events-none"></div>
          
          {/* Floating orbs */}
          <motion.div 
            className="absolute w-40 h-40 rounded-full glow-orb-emerald -top-20 -right-20 opacity-50 pointer-events-none"
            animate={{ 
              y: [0, -10, 0],
              x: [0, 5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="flex items-center justify-center mb-4 relative"
            style={{ transform: "translateZ(40px)" }}
          >
            <FaTicketAlt className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 neon-text-emerald">Access Granted</h2>
          </motion.div>
          
          <motion.div 
            className="text-center"
            style={{ transform: "translateZ(20px)" }}
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              You have successfully gained access to the <span className="font-semibold">RARE EVO 2025</span> event. 
              Please proceed to the entrance with this verification.
            </p>
            
            <div className="bg-emerald-100/50 dark:bg-emerald-800/30 p-4 mb-6 glass-morphism"
                 style={{ clipPath: "polygon(0 8px, 8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)" }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600 dark:text-gray-400">
                <motion.div 
                  className="flex flex-col items-center p-3 hover-3d-premium"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-sm uppercase tracking-wide mb-1">Event</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">RARE EVO 2025</span>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col items-center p-3 hover-3d-premium"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-sm uppercase tracking-wide mb-1">Location</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">Caesar's Palace, Las Vegas</span>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col items-center p-3 hover-3d-premium"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-sm uppercase tracking-wide mb-1">Dates</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">August 6-10, 2025</span>
                </motion.div>
              </div>
            </div>
            
            <motion.div 
              className="flex items-center justify-center bg-white dark:bg-gray-700 p-4 hover-3d-premium"
              style={{ 
                transform: "translateZ(40px)",
                clipPath: "polygon(0 0, 100% 0, 90% 100%, 0 100%)"
              }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
              }}
            >
              <div className="relative mr-3">
                <FaWallet className="text-amber-600 dark:text-amber-400 w-6 h-6" />
                <motion.div 
                  className="absolute -right-1 -top-1 bg-emerald-500 rounded-full w-3 h-3 flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <GoVerified className="text-white w-2 h-2" />
                </motion.div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 dark:text-gray-400">Verified Wallet</span>
                <span className="font-mono text-sm text-gray-700 dark:text-gray-300">
                  {truncateAddress(walletAddress)}
                </span>
              </div>
              <FaEthereum className="ml-3 text-blue-500 dark:text-blue-400 w-5 h-5 opacity-70" />
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="bg-amber-50 dark:bg-amber-900/20 p-6 sm:p-8 border border-amber-100 dark:border-amber-800 glass-morphism-premium relative overflow-hidden"
          style={{ 
            transform: "translateZ(20px)",
            clipPath: "polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)" 
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-holographic absolute inset-0 opacity-20 pointer-events-none"></div>
          
          {/* Floating orb */}
          <motion.div 
            className="absolute w-32 h-32 rounded-full glow-orb-amber -bottom-16 -left-16 opacity-40 pointer-events-none"
            animate={{ 
              y: [0, -10, 0],
              x: [0, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center relative" style={{ transform: "translateZ(30px)" }}>
            Meet Our Developers
          </h3>
          
          <motion.div 
            className="space-y-6 relative"
            style={{ transform: "translateZ(25px)" }}
          >
            <div className="flex flex-col items-center">
              <motion.p 
                className="text-center text-gray-700 dark:text-gray-300 mb-4"
                whileHover={{ scale: 1.02 }}
              >
                This application was developed by <span className="font-semibold">Sajan Poudel</span> and <span className="font-semibold">Niraj Pandey</span>
              </motion.p>
              
              <motion.a 
                href="https://github.com/sajanpoudel" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-6 py-3 transition-colors btn-float-3d group crypto-shimmer"
                style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)" }}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="bg-gray-800 dark:bg-gray-900 w-10 h-10 rounded-full flex items-center justify-center mr-3 group-hover:rotate-12 transition-transform duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaGithub className="w-6 h-6 text-white" />
                </motion.div>
                <span className="text-gray-800 dark:text-gray-200 font-medium">Follow @sajanpoudel on GitHub</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="mt-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-5 py-3 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 btn-float-3d group"
        >
          <motion.svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            animate={{ x: [0, -5, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </motion.svg>
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
} 