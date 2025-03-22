'use client';
import React, { useRef, useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { CheckCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { FaBrain } from 'react-icons/fa';

interface TicketViewProps {
  attendeeName: string;
  attendeeEmail: string;
  attendeeCompany: string;
  walletAddress: string;
  isClaimed: boolean;
  isDemoTicket?: boolean;
}

export default function TicketView({
  attendeeName,
  attendeeEmail,
  attendeeCompany,
  walletAddress,
  isClaimed,
  isDemoTicket = false
}: TicketViewProps) {
  
  // Helper function to truncate wallet address
  const truncateAddress = (address: string) => {
    return address.length > 10
      ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
      : address;
  };

  // Generate proper QR code URL for ticket verification
  const generateQRValue = (address: string) => {
    // Use absolute URL in production, relative URL for development
    const baseUrl = typeof window !== 'undefined' 
      ? `${window.location.protocol}//${window.location.host}`
      : '';
    
    // Create URL with wallet address as a query parameter for verification
    return `${baseUrl}/scan-success?wallet=${address}`;
  };

  // 3D Card Animation
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring physics for card movement
  const springConfig = { damping: 15, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [0, 300], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 300], [-5, 5]), springConfig);
  
  // Dark mode detection
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    const isDark = 
      document.documentElement.classList.contains('dark') || 
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(isDark);
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = e.currentTarget;
    const x = e.clientX - offsetLeft;
    const y = e.clientY - offsetTop;
    
    mouseX.set(x);
    mouseY.set(y);
    
    // Update glare position
    if (cardRef.current) {
      const glareElement = cardRef.current.querySelector('.card-glare') as HTMLElement;
      if (glareElement) {
        const glareX = (x / offsetWidth) * 100;
        const glareY = (y / offsetHeight) * 100;
        glareElement.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 80%)`;
      }
    }
  };
  
  // Reset card position when mouse leaves
  const handleMouseLeave = () => {
    mouseX.set(150);
    mouseY.set(150);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden preserve-3d glass-morphism"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Card glare effect */}
      <div className="card-glare absolute inset-0 w-full h-full pointer-events-none z-10"></div>
      
      {/* Ticket header */}
      <div className="relative bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-600 dark:from-amber-700 dark:via-emerald-700 dark:to-amber-700 p-3 sm:p-5 preserve-3d">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white dark:bg-gray-200 rounded-full opacity-10 transform -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-amber-300 dark:bg-amber-400 rounded-full opacity-20 transform translate-y-10 -translate-x-10"></div>
        
        <div style={{ transform: "translateZ(20px)" }} className="flex justify-between items-center mb-3 relative z-10">
          <motion.h2 
            className="text-xl sm:text-2xl font-bold text-white neon-text"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            RARE EVO 2025
          </motion.h2>
          <div className="flex items-center">
            {isDemoTicket ? (
              <motion.div 
                className="bg-purple-500 text-white text-xs sm:text-sm py-1 px-2 sm:px-3 rounded-full flex items-center shadow-md glow-border"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{ transform: "translateZ(30px)" }}
              >
                <FaBrain className="mr-1" /> DEMO TICKET
              </motion.div>
            ) : (
              <motion.div 
                className={`${
                  isClaimed 
                    ? 'bg-green-500 text-white dark:bg-green-600' 
                    : 'bg-yellow-400 text-gray-800 dark:bg-yellow-500'
                } text-xs sm:text-sm py-1 px-2 sm:px-3 rounded-full flex items-center shadow-md glow-border`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{ transform: "translateZ(30px)" }}
              >
                {isClaimed ? (
                  <>
                    <CheckCircleIcon className="h-4 w-4 mr-1" /> CLAIMED
                  </>
                ) : (
                  'UNCLAIMED'
                )}
              </motion.div>
            )}
          </div>
        </div>
        
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl p-2 sm:p-3 flex items-center justify-center relative z-10 glass-morphism"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="relative perspective-1000">
            {/* QR Code with 3D effect */}
            <motion.div 
              className="transform hover-3d"
              whileHover={{ 
                scale: 1.02,
                rotateY: 5,
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
              }}
              style={{ transform: "translateZ(10px)" }}
            >
              <QRCodeSVG 
                value={generateQRValue(walletAddress)}
                size={isDemoTicket ? 256 : 288}
                className="w-56 sm:w-72 h-56 sm:h-72 mx-auto"
                includeMargin={true}
                level="H"
                fgColor={isDarkMode ? "#fff" : "#000"}
                bgColor="transparent"
                imageSettings={isDemoTicket ? {
                  src: "https://img.icons8.com/ios-filled/50/9061F9/demo.png",
                  height: 50,
                  width: 50,
                  excavate: true,
                } : undefined}
              />
            </motion.div>
            
            {isDemoTicket && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="bg-purple-500 bg-opacity-20 absolute inset-0 rounded-xl"></div>
              </motion.div>
            )}
            
            {/* Animated particle effects */}
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`qr-particle-${i}`}
                  className="absolute w-2 h-2 rounded-full bg-amber-500 opacity-30"
                  initial={{ 
                    x: Math.random() * 280, 
                    y: Math.random() * 280,
                    scale: 0
                  }}
                  animate={{ 
                    x: [
                      Math.random() * 280, 
                      Math.random() * 280, 
                      Math.random() * 280
                    ],
                    y: [
                      Math.random() * 280, 
                      Math.random() * 280, 
                      Math.random() * 280
                    ],
                    scale: [0, 1, 0],
                    opacity: [0, 0.5, 0]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    delay: i * 2,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="p-4 sm:p-6 preserve-3d">
        <motion.div 
          className="bg-gray-50 dark:bg-gray-700 bg-opacity-80 dark:bg-opacity-50 backdrop-blur-sm rounded-xl p-4 mb-4 shadow-sm glass-morphism preserve-3d"
          style={{ transform: "translateZ(15px)" }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid grid-cols-1 gap-3">
            <motion.div 
              className="preserve-3d" 
              style={{ transform: "translateZ(10px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium">Attendee</h3>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">{attendeeName || "Your Name"}</p>
            </motion.div>
            
            <motion.div 
              className="preserve-3d" 
              style={{ transform: "translateZ(10px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <h3 className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium">Company</h3>
              <p className="text-gray-800 dark:text-gray-200">{attendeeCompany || "Your Company"}</p>
            </motion.div>
            
            <motion.div 
              className="preserve-3d" 
              style={{ transform: "translateZ(10px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium">Email</h3>
              <p className="text-gray-800 dark:text-gray-200">{attendeeEmail || "your.email@example.com"}</p>
            </motion.div>
            
            <motion.div 
              className="preserve-3d" 
              style={{ transform: "translateZ(10px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              <h3 className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium flex items-center">
                Wallet Address
                {isDemoTicket && <span className="ml-2 text-xs text-purple-600 dark:text-purple-400">(Demo)</span>}
              </h3>
              <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">{truncateAddress(walletAddress)}</p>
            </motion.div>
          </div>
        </motion.div>
        
        {isDemoTicket ? (
          <motion.div
            className="bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800 rounded-lg p-3 text-sm text-purple-800 dark:text-purple-300 glass-morphism"
            style={{ transform: "translateZ(10px)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-start">
              <FaBrain className="text-purple-500 dark:text-purple-400 mt-0.5 mr-2 flex-shrink-0" />
              <p>
                This is a demo ticket for testing purposes only. It cannot be used for actual event entry.
                <span className="block mt-1 text-xs text-purple-600 dark:text-purple-400">
                  Purchase a real ticket to attend RARE EVO 2025
                </span>
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 rounded-lg p-3 text-sm text-emerald-800 dark:text-emerald-300 glass-morphism"
            style={{ transform: "translateZ(10px)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-start">
              <ShieldCheckIcon className="h-5 w-5 text-emerald-500 dark:text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
              <p>
                This ticket is verified on the Base blockchain. Present this QR code at the event entrance.
                <span className="block mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                  July 15-18, 2025 • RARE EVO Conference, San Francisco
                </span>
              </p>
            </div>
          </motion.div>
        )}
        
        {/* Holographic effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
          <div className="absolute inset-0 opacity-5 mix-blend-overlay bg-gradient-to-br from-transparent via-amber-400 to-transparent transform rotate-12 scale-150"></div>
        </div>
      </div>
    </motion.div>
  );
} 