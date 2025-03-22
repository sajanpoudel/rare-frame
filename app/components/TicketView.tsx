'use client';
import React, { useRef, useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { CheckCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { FaBrain, FaLock, FaEthereum } from 'react-icons/fa';

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
  const rotateX = useSpring(useTransform(mouseY, [0, 300], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 300], [-8, 8]), springConfig);

  // For sparkle effect positions
  const [sparkles, setSparkles] = useState<Array<{x: number, y: number, size: number, delay: number}>>([]);
  
  // Dark mode detection
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // Generate random sparkle positions
    const newSparkles = Array.from({ length: 12 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      delay: Math.random() * 3
    }));
    setSparkles(newSparkles);
    
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
        glareElement.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 80%)`;
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
      className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden preserve-3d glass-morphism-ultra"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
    >
      {/* Enhanced Card glare effect */}
      <div className="card-glare absolute inset-0 w-full h-full pointer-events-none z-30"></div>
      
      {/* Holographic edges */}
      <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-amber-500/30 via-emerald-500/30 to-amber-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
      
      {/* Improved holographic overlays */}
      <div className="bg-holographic absolute inset-0 opacity-40 pointer-events-none z-10"></div>
      
      {/* Ambient light effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent dark:from-white/10 dark:to-transparent z-5 pointer-events-none"></div>
      
      {/* Enhanced Sparkle effects */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute rounded-full pointer-events-none z-20"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`, 
            width: `${Math.random() * 3 + 1}px`, 
            height: `${Math.random() * 3 + 1}px`,
            background: i % 3 === 0 ? 'rgba(255,255,255,0.9)' : i % 3 === 1 ? 'rgba(16,185,129,0.8)' : 'rgba(245,158,11,0.8)',
            boxShadow: i % 3 === 0 
              ? '0 0 4px 1px rgba(255, 255, 255, 0.9), 0 0 8px 2px rgba(255, 255, 255, 0.6)' 
              : i % 3 === 1 
                ? '0 0 4px 1px rgba(16, 185, 129, 0.8), 0 0 8px 2px rgba(16, 185, 129, 0.6)' 
                : '0 0 4px 1px rgba(245, 158, 11, 0.8), 0 0 8px 2px rgba(245, 158, 11, 0.6)'
          }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0] 
          }}
          transition={{ 
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`, 
            width: `${Math.random() * 6 + 2}px`, 
            height: `${Math.random() * 6 + 2}px`,
            background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`,
            filter: 'blur(1px)'
          }}
          animate={{ 
            y: [0, -Math.random() * 20 - 10],
            x: [0, Math.random() * 20 - 10],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: Math.random() * 8 + 4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Ticket header with enhanced effects */}
      <div className="relative bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-600 dark:from-amber-700 dark:via-emerald-700 dark:to-amber-700 p-3 sm:p-5 preserve-3d">
        {/* Dynamic gradient background with improved animation */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-emerald-600/60 via-amber-600/60 to-emerald-600/60 dark:from-emerald-500/70 dark:via-amber-500/70 dark:to-emerald-500/70"
          animate={{ 
            backgroundPosition: ['0% center', '100% center', '0% center'],
          }}
          transition={{ 
            duration: 15,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{ backgroundSize: '200% 100%' }}
        ></motion.div>
        
        {/* Enhanced decorative elements */}
        <motion.div 
          className="absolute top-0 right-0 w-40 h-40 bg-white dark:bg-gray-200 rounded-full opacity-20 blur-md"
          animate={{ y: [-20, -22, -20], x: [20, 18, 20], scale: [1, 1.05, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
        
        <motion.div 
          className="absolute bottom-0 left-0 w-20 h-20 bg-amber-300 dark:bg-amber-400 rounded-full opacity-30 blur-sm"
          animate={{ y: [10, 8, 10], x: [-10, -12, -10], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
        
        <div style={{ transform: "translateZ(40px)" }} className="flex justify-between items-center mb-3 relative z-10">
          <motion.div 
            className="flex items-center"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div 
              className="mr-3 bg-emerald-500 dark:bg-emerald-400 p-2 rounded-lg shadow-lg" 
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              style={{ boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)' }}
            >
              <FaEthereum className="w-5 h-5 text-white" />
            </motion.div>
            <h2 className="text-xl sm:text-2xl font-bold text-white neon-text-emerald drop-shadow-md">RARE EVO 2025</h2>
          </motion.div>
          
          <div className="flex items-center">
            {isDemoTicket ? (
              <motion.div 
                className="bg-purple-600 text-white text-xs sm:text-sm py-1 px-2 sm:px-3 rounded-full flex items-center shadow-lg holographic-border"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{ transform: "translateZ(40px)", boxShadow: '0 0 15px rgba(168, 85, 247, 0.4)' }}
                whileHover={{ scale: 1.05 }}
              >
                <FaBrain className="mr-1" /> DEMO TICKET
              </motion.div>
            ) : (
              <motion.div 
                className={`${
                  isClaimed 
                    ? 'bg-emerald-600 text-white dark:bg-emerald-500' 
                    : 'bg-amber-500 text-gray-900 dark:bg-amber-400'
                } text-xs sm:text-sm py-1 px-2 sm:px-3 rounded-full flex items-center shadow-lg holographic-border`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{ 
                  transform: "translateZ(40px)", 
                  boxShadow: isClaimed 
                    ? '0 0 15px rgba(16, 185, 129, 0.5)' 
                    : '0 0 15px rgba(245, 158, 11, 0.5)' 
                }}
                whileHover={{ scale: 1.05 }}
              >
                {isClaimed ? (
                  <>
                    <CheckCircleIcon className="h-4 w-4 mr-1" /> CLAIMED
                  </>
                ) : (
                  <><span className="mr-1">⦿</span> UNCLAIMED</>
                )}
              </motion.div>
            )}
          </div>
        </div>
        
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl p-2 sm:p-3 flex items-center justify-center relative z-10 glass-morphism-premium shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ transform: "translateZ(40px)" }}
          whileHover={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)' }}
        >
          <div className="relative perspective-1500">
            {/* QR Code with 3D effect */}
            <motion.div 
              className="transform hover-3d-premium bg-white dark:bg-gray-900 p-3 rounded-xl"
              whileHover={{ 
                scale: 1.03,
                rotateY: 10,
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
              }}
              style={{ transform: "translateZ(20px)" }}
            >
              <div className="relative">
                {/* Animated border */}
                <motion.div 
                  className="absolute -inset-1 rounded-xl opacity-70 blur-sm"
                  style={{
                    background: `linear-gradient(90deg, #10b981, #f59e0b, #10b981)`,
                    backgroundSize: '200% 100%'
                  }}
                  animate={{ backgroundPosition: ['0% center', '200% center'] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Simplified QR code container with guaranteed visibility */}
                <div 
                  className={`${
                    isDarkMode 
                      ? 'bg-gray-800 border-2 border-gray-700' 
                      : 'bg-gray-200 border-2 border-gray-300'
                  } p-4 rounded-lg relative`}
                >
                  {/* QR Code with solid background */}
                  <div 
                    className={`${
                      isDarkMode ? 'bg-gray-900' : 'bg-white'
                    } p-4 rounded-lg flex items-center justify-center`}
                  >
                    <QRCodeSVG 
                      value={generateQRValue(walletAddress)}
                      size={isDemoTicket ? 216 : 248}
                      className="mx-auto"
                      includeMargin={true}
                      level="H"
                      fgColor={isDarkMode ? "#ffffff" : "#000000"}
                      bgColor={isDarkMode ? "#1f2937" : "#ffffff"}
                      imageSettings={isDemoTicket ? {
                        src: "https://img.icons8.com/ios-filled/50/9061F9/demo.png",
                        height: 40,
                        width: 40,
                        excavate: true,
                      } : undefined}
                    />
                  </div>
                </div>
              </div>
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
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={`qr-particle-${i}`}
                  className="particle-premium absolute"
                  style={{ 
                    width: `${Math.random() * 6 + 3}px`,
                    height: `${Math.random() * 6 + 3}px`,
                  }}
                  initial={{ 
                    x: Math.random() * 280, 
                    y: Math.random() * 280,
                    scale: 0,
                    opacity: 0
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
                    opacity: [0, 0.7, 0]
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
          className="bg-gray-50 dark:bg-gray-700 bg-opacity-80 dark:bg-opacity-40 backdrop-blur-sm rounded-xl p-4 mb-4 shadow-sm glass-morphism-premium preserve-3d"
          style={{ transform: "translateZ(30px)" }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Holographic shine effect */}
          <div className="absolute inset-0 crypto-shimmer rounded-xl overflow-hidden"></div>
          
          <div className="grid grid-cols-1 gap-3 relative z-10">
            <motion.div 
              className="preserve-3d flex items-start" 
              style={{ transform: "translateZ(20px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 mr-3 flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold">01</span>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium">Attendee</h3>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-1">{attendeeName || "Your Name"}</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="preserve-3d flex items-start" 
              style={{ transform: "translateZ(20px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 mr-3 flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-amber-700 dark:text-amber-300 font-semibold">02</span>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium">Company</h3>
                <p className="text-gray-800 dark:text-gray-200 mt-1">{attendeeCompany || "Your Company"}</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="preserve-3d flex items-start" 
              style={{ transform: "translateZ(20px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 mr-3 flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-teal-700 dark:text-teal-300 font-semibold">03</span>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium">Email</h3>
                <p className="text-gray-800 dark:text-gray-200 mt-1">{attendeeEmail || "your.email@example.com"}</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="preserve-3d flex items-start" 
              style={{ transform: "translateZ(20px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800/70 mr-3 flex items-center justify-center flex-shrink-0">
                <FaLock className="w-3 h-3 text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <h3 className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium flex items-center">
                  Wallet Address
                  {isDemoTicket && <span className="ml-2 text-xs text-purple-600 dark:text-purple-400">(Demo)</span>}
                </h3>
                <div className="flex items-center mt-1">
                  <span className="text-gray-800 dark:text-gray-200 font-mono text-sm">{truncateAddress(walletAddress)}</span>
                  <div className="relative ml-2">
                    <motion.span 
                      className="inline-block w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.span>
                    <span className="absolute top-0 left-0 w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full opacity-70 blur-sm"></span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {isDemoTicket ? (
          <motion.div
            className="bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800 rounded-lg p-4 text-sm text-purple-800 dark:text-purple-300 glass-morphism-premium"
            style={{ transform: "translateZ(30px)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start">
              <FaBrain className="text-purple-500 dark:text-purple-400 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p>
                  This is a demo ticket for testing purposes only. It cannot be used for actual event entry.
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                    Purchase a real ticket to attend RARE EVO 2025
                  </span>
                  <motion.div 
                    className="ml-2 w-2 h-2 bg-purple-500 rounded-full"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  ></motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 rounded-lg p-4 text-sm text-emerald-800 dark:text-emerald-300 glass-morphism-premium"
            style={{ transform: "translateZ(30px)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start">
              <ShieldCheckIcon className="h-5 w-5 text-emerald-500 dark:text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p>
                  This ticket is verified on the Base blockchain. Present this QR code at the event entrance.
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    July 15-18, 2025 • RARE EVO Conference, San Francisco
                  </span>
                  <motion.div 
                    className="ml-2 w-2 h-2 bg-emerald-500 rounded-full"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  ></motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Blockchain line effect */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 dark:bg-emerald-400"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
        >
          <motion.div 
            className="absolute h-full w-16 bg-gradient-to-r from-transparent via-white to-transparent"
            animate={{ 
              left: ["0%", "100%"],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              repeatDelay: 1
            }}
          />
        </motion.div>
        
        {/* Holographic effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
          <div className="absolute inset-0 opacity-5 mix-blend-overlay bg-gradient-to-br from-transparent via-amber-400 to-transparent transform rotate-12 scale-150"></div>
        </div>
      </div>
    </motion.div>
  );
} 