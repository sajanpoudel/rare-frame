'use client';

import { FaTicketAlt, FaShieldAlt, FaWallet, FaUserCheck, FaChartLine, FaQuestion, FaEthereum, FaCubes } from 'react-icons/fa';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { FrameContainer } from './components/FrameContainer';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { GiDiamonds, GiTicket } from 'react-icons/gi';
import { RiVipCrownFill, RiVipDiamondFill } from 'react-icons/ri';
import { SiEthereum } from 'react-icons/si';

// Metadata is now in a separate file: app/metadata.ts

export default function Home() {
  // Mouse tracking for interactive elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Refs for sections
  const heroRef = useRef<HTMLDivElement>(null);
  
  // State for animation triggers
  const [heroInView, setHeroInView] = useState(false);
  const [showTickets, setShowTickets] = useState(false);
  
  // Parallax effect for hero elements
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);
  const titleOpacity = useTransform(scrollY, [0, 300], [1, 0.2]);
  const titleScale = useTransform(scrollY, [0, 300], [1, 0.9]);
  
  // Smoothed 3D rotation values
  const rotateX = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });
  
  // Pre-compute all transforms needed for the component
  // These were previously being created inside the JSX which can cause hook order issues
  const rotateXReverse = useTransform(rotateX, v => v * -1.2);
  const rotateYReverse = useTransform(rotateY, v => v * -1.2);
  const rotateXHalf = useTransform(rotateX, v => v * 0.6);
  const rotateYHalf = useTransform(rotateY, v => v * 0.6);
  
  // Handle mouse movement for 3D effects
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    
    const rect = heroRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate normalized values from -1 to 1
    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);
    
    // Apply to motion values
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
    rotateX.set(normalizedY * -5); // Invert Y for natural rotation
    rotateY.set(normalizedX * 5);
  };
  
  // Animation sequences
  useEffect(() => {
    setHeroInView(true);
    
    const timer = setTimeout(() => {
      setShowTickets(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      {/* Premium Hero Section */}
      <div 
        ref={heroRef}
        className="relative w-full min-h-[80vh] overflow-hidden perspective-2000"
        onMouseMove={handleMouseMove}
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 92% 100%, 8% 100%, 0 85%)"
        }}
      >
        {/* Background Layers */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900 via-purple-900/50 to-gray-900"></div>
        
        {/* Animated gradient circles */}
        <motion.div 
          className="absolute top-1/4 -left-[20%] w-[800px] h-[800px] rounded-full bg-gradient-to-r from-amber-500/20 to-transparent blur-3xl pointer-events-none"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
            y: [0, -30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ y: heroY }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 -right-[20%] w-[700px] h-[700px] rounded-full bg-gradient-to-l from-emerald-500/20 to-transparent blur-3xl pointer-events-none"
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.3, 0.2],
            y: [0, 30, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ y: heroY }}
        />
        
        <motion.div 
          className="absolute -bottom-[10%] left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-t from-purple-600/15 to-transparent blur-3xl pointer-events-none"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ y: heroY }}
        />
        
        {/* Noise overlay */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
        
        {/* Las Vegas style light beams */}
        <motion.div 
          className="absolute top-0 left-1/4 w-3 h-0 bg-amber-400/10" 
          animate={{ height: ['0vh', '100vh', '0vh'], opacity: [0, 0.8, 0] }}
          transition={{ duration: 7, repeat: Infinity, repeatDelay: 13, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-0 left-2/4 w-5 h-0 bg-emerald-400/10" 
          animate={{ height: ['0vh', '100vh', '0vh'], opacity: [0, 0.6, 0] }}
          transition={{ duration: 8, repeat: Infinity, repeatDelay: 7, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute top-0 right-1/3 w-4 h-0 bg-purple-400/10" 
          animate={{ height: ['0vh', '100vh', '0vh'], opacity: [0, 0.7, 0] }}
          transition={{ duration: 10, repeat: Infinity, repeatDelay: 10, ease: "easeInOut", delay: 5 }}
        />
                
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => {
            // Pre-calculate random values for animations
            const yValues = [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50];
            const xValues = [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50];
            const duration = Math.random() * 20 + 15;
            const width = Math.random() * 4 + 1;
            const height = Math.random() * 4 + 1;
            const opacity = Math.random() * 0.3 + 0.1;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            
            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${width}px`,
                  height: `${height}px`,
                  filter: 'blur(1px)',
                  opacity,
                  top: `${top}%`,
                  left: `${left}%`,
                  zIndex: 1
                }}
                animate={{
                  y: yValues,
                  x: xValues,
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            );
          })}
        </div>
        
        {/* 3D Holographic Casino Chip */}
        <motion.div
          className="absolute left-[5%] top-1/4 w-32 h-32 md:w-44 md:h-44 hidden md:block"
          style={{ 
            rotateX, 
            rotateY, 
            transformStyle: "preserve-3d",
            y: heroY
          }}
          animate={{ 
            rotateZ: [0, 360],
          }}
          transition={{ 
            rotateZ: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
        >
          <div 
            className="absolute inset-0 rounded-full bg-gray-900 border-8 border-amber-500/80 shadow-lg"
            style={{ transform: "translateZ(0px)" }}
          >
            {/* Casino chip details */}
            <div className="absolute inset-2 rounded-full border-2 border-dashed border-amber-500/50"></div>
            <div className="absolute inset-8 rounded-full border border-amber-500/30"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-3xl text-amber-500/90 font-bold" style={{ transform: "translateZ(5px)" }}>
                <RiVipDiamondFill />
              </div>
            </div>
            
            {/* Edge details */}
            {[...Array(24)].map((_, i) => (
              <div 
                key={`edge-${i}`}
                className="absolute w-2 h-3 bg-emerald-500/70"
                style={{ 
                  top: '50%',
                  left: '50%',
                  marginLeft: '-4px',
                  marginTop: '-6px',
                  transformOrigin: '50% 50px',
                  transform: `rotateZ(${i * 15}deg) translateY(-40px)` 
                }}
              ></div>
            ))}
          </div>
          
          {/* Shine effect */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
            animate={{ translateX: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
            style={{ transform: "translateZ(1px)" }}
          />
        </motion.div>
        
        {/* Ethereum Logo */}
        <motion.div
          className="absolute right-[8%] bottom-1/4 hidden md:block"
          style={{ 
            rotateX: rotateXReverse, 
            rotateY: rotateYReverse,
            transformStyle: "preserve-3d",
            y: heroY
          }}
          animate={{ 
            y: [0, -20, 0],
            rotateZ: [0, 10, 0],
          }}
          transition={{ 
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotateZ: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="w-24 h-24 md:w-32 md:h-32 text-blue-500/80">
            <SiEthereum className="w-full h-full" />
          </div>
          
          {/* Glow effect */}
          <motion.div 
            className="absolute inset-0 rounded-full"
            animate={{ 
              boxShadow: [
                "0 0 20px 0px rgba(59, 130, 246, 0.3)",
                "0 0 40px 10px rgba(59, 130, 246, 0.4)",
                "0 0 20px 0px rgba(59, 130, 246, 0.3)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        
        {/* Main content */}
        <div className="container relative z-10 mx-auto px-4 h-full">
          <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
            <AnimatePresence>
              {heroInView && (
                <motion.div 
                  className="text-center relative"
                  style={{ 
                    rotateX: rotateXHalf, 
                    rotateY: rotateYHalf,
                    opacity: titleOpacity,
                    scale: titleScale,
                    transformStyle: "preserve-3d"
                  }}
                >
                  {/* VIP Crown Icon */}
                  <motion.div
                    className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-amber-500/80"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    style={{ transform: "translateZ(50px)" }}
                  >
                    <RiVipCrownFill className="w-12 h-12 md:w-16 md:h-16" />
                    <motion.div 
                      className="absolute inset-0"
                      animate={{ 
                        boxShadow: [
                          "0 0 10px 0px rgba(245, 158, 11, 0.3)",
                          "0 0 20px 10px rgba(245, 158, 11, 0.4)",
                          "0 0 10px 0px rgba(245, 158, 11, 0.3)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                  
                  {/* Main Title */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ transform: "translateZ(60px)" }}
                  >
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-2">
                      <span className="inline-block relative">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-emerald-300 to-amber-300 animate-gradient drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                          RARE EVO 2025
                        </span>
                        <motion.span 
                          className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-400"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        />
                      </span>
                    </h1>
                    
                    {/* Divider with animated shimmer */}
                    <div className="relative w-48 h-0.5 mx-auto my-6 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/60 via-emerald-400/60 to-amber-400/60"></div>
                      <motion.div 
                        className="absolute inset-0 w-12 bg-white blur-sm"
                        animate={{ translateX: ['-100%', '500%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                      />
                    </div>
                    
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-wider text-white/90 mb-8">
                      NFT Ticket Management System
                    </h2>
                  </motion.div>
                  
                  {/* Description with glass effect - REDESIGNED WITH BETTER SHAPE */}
                  <motion.div
                    className="max-w-2xl mx-auto relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{ 
                      transform: "translateZ(40px)",
                      clipPath: "polygon(0% 0%, 100% 0%, 95% 30%, 100% 70%, 80% 100%, 20% 100%, 0% 70%, 5% 30%)"
                    }}
                  >
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20"></div>
                    <p className="relative text-white/95 py-6 px-10 text-lg">
                      Welcome to the official ticket platform for RARE EVO 2025 — the premier web3 and NFT event taking place August 6-10, 2025 at Caesar's Palace in Las Vegas, NV.
                    </p>
                  </motion.div>
                  
                  {/* CTA Buttons - NOW WITH CUSTOM SHAPES */}
                  <motion.div 
                    className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    style={{ transform: "translateZ(50px)" }}
                  >
                    <motion.a 
                      href="#ticket-management" 
                      className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-medium py-4 px-8 shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ 
                        clipPath: "polygon(0 0, 100% 0, 92% 100%, 0% 100%)" 
                      }}
                    >
                      {/* Button background glow */}
                      <motion.div 
                        className="absolute inset-0 bg-emerald-400/40"
                        animate={{ 
                          boxShadow: [
                            "0 0 20px 0px rgba(16, 185, 129, 0.4) inset",
                            "0 0 30px 5px rgba(16, 185, 129, 0.6) inset",
                            "0 0 20px 0px rgba(16, 185, 129, 0.4) inset"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      
                      {/* Button shimmer effect */}
                      <motion.div 
                        className="absolute inset-0 opacity-50"
                        initial={{ x: '-100%' }}
                        animate={{ x: '200%' }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 5 }}
                        style={{ 
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
                        }}
                      />
                      
                      {/* Button content */}
                      <span className="relative flex items-center">
                        <GiTicket className="mr-2 w-5 h-5" />
                        <span>Get Started</span>
                      </span>
                    </motion.a>
                    
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link 
                        href="/support" 
                        className="group relative overflow-hidden bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-medium py-4 px-10 min-w-[140px] shadow-lg border border-amber-400/40 backdrop-blur-sm transition-all duration-300 flex items-center justify-center z-20"
                        style={{ 
                          clipPath: "polygon(8% 0, 100% 0, 100% 100%, 0 100%, 0 8%)" 
                        }}
                      >
                        {/* Button shimmer effect */}
                        <motion.div 
                          className="absolute inset-0 opacity-50"
                          initial={{ x: '-100%' }}
                          animate={{ x: '200%' }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 7 }}
                          style={{ 
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                          }}
                        />
                        
                        {/* Button content */}
                        <span className="relative flex items-center whitespace-nowrap">
                          <FaQuestion className="mr-2 text-white" />
                          <span className="text-white font-bold">Learn More</span>
                        </span>
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Animated Ticket Examples - NOW WITH CUSTOM SHAPES */}
            <AnimatePresence>
              {showTickets && (
                <motion.div 
                  className="absolute bottom-12 left-0 right-0 flex justify-center"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <div className="flex gap-6 perspective-1000">
                    {/* VIP Ticket */}
                    <motion.div 
                      className="hidden md:block w-40 h-24 relative bg-gradient-to-br from-amber-900/50 to-amber-700/50 border border-amber-500/50 overflow-hidden shadow-xl"
                      style={{ 
                        transform: `rotateY(${25 + mouseX.get() * 5}deg) rotateX(${5 + mouseY.get() * -5}deg)`,
                        transformStyle: "preserve-3d",
                        clipPath: "polygon(0 0, 100% 0, 100% 80%, 80% 100%, 0 100%)"
                      }}
                      whileHover={{ scale: 1.1, rotateY: 15 }}
                    >
                      {/* Holographic effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-white/5 to-amber-500/10 mix-blend-overlay"></div>
                      
                      {/* Ticket content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center px-2 py-3">
                        <div className="text-amber-500 text-xs font-bold">VIP PASS</div>
                        <div className="text-white/90 text-[10px] mt-1">#EVO2025</div>
                        <div className="mt-auto flex items-center justify-between w-full">
                          <GiDiamonds className="text-amber-400 w-3 h-3" />
                          <div className="text-[8px] text-amber-300">0.3 ETH</div>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* GA Ticket */}
                    <motion.div 
                      className="w-40 h-24 relative bg-gradient-to-br from-emerald-900/50 to-emerald-700/50 border border-emerald-500/50 overflow-hidden shadow-xl"
                      style={{ 
                        transform: `rotateY(${mouseX.get() * 5}deg) rotateX(${mouseY.get() * -5}deg)`,
                        transformStyle: "preserve-3d",
                        clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0 100%, 0 20%)"
                      }}
                      whileHover={{ scale: 1.1, rotateY: 0 }}
                    >
                      {/* Holographic effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-white/5 to-emerald-500/10 mix-blend-overlay"></div>
                      
                      {/* Ticket content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center px-2 py-3">
                        <div className="text-emerald-500 text-xs font-bold">GA TICKET</div>
                        <div className="text-white/90 text-[10px] mt-1 hidden sm:block">#EVO2025</div>
                        <div className="mt-auto flex items-center justify-between w-full">
                          <GiTicket className="text-emerald-400 w-3 h-3" />
                          <div className="text-[8px] text-emerald-300">0.0001 ETH</div>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* WHALE PASS */}
                    <motion.div 
                      className="hidden md:block w-40 h-24 relative bg-gradient-to-br from-purple-900/50 to-purple-700/50 border border-purple-500/50 overflow-hidden shadow-xl"
                      style={{ 
                        transform: `rotateY(${-25 + mouseX.get() * 5}deg) rotateX(${5 + mouseY.get() * -5}deg)`,
                        transformStyle: "preserve-3d",
                        clipPath: "polygon(0 0, 85% 0, 100% 20%, 100% 100%, 0 100%)"
                      }}
                      whileHover={{ scale: 1.1, rotateY: -15 }}
                    >
                      {/* Holographic effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-white/5 to-purple-500/10 mix-blend-overlay"></div>
                      
                      {/* Ticket content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center px-2 py-3">
                        <div className="text-purple-400 text-xs font-bold">WHALE PASS</div>
                        <div className="text-white/90 text-[10px] mt-1">#EVO2025</div>
                        <div className="mt-auto flex items-center justify-between w-full">
                          <RiVipCrownFill className="text-purple-400 w-3 h-3" />
                          <div className="text-[8px] text-purple-300">1.0 ETH</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      <div className="my-16 px-4 sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-3d">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 via-amber-700 to-emerald-800 dark:from-white dark:via-amber-200 dark:to-emerald-300">
              About RARE EVO 2025
            </span>
          </h2>
          
          <motion.div 
            className="w-24 h-1 mx-auto bg-gradient-to-r from-amber-400 via-emerald-500 to-amber-400 rounded-full my-4"
            animate={{ 
              scaleX: [1, 1.5, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.p 
            className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12 glass-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Experience the future of event ticketing with our NFT-powered ticketing system.
            Enjoy enhanced security, verified ownership, and a seamless experience from purchase to event entry.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <motion.div 
            className="relative overflow-hidden bg-white dark:bg-gray-800 p-6 hover-3d-premium preserve-3d glass-morphism-ultra"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 92%, 92% 100%, 0 100%)"
            }}
          >
            {/* Floating glow orb */}
            <div className="absolute -top-6 -right-6 w-24 h-24 glow-orb-amber opacity-20 pointer-events-none"></div>
            
            {/* Card glare effect */}
            <div className="card-glare absolute inset-0 w-full h-full pointer-events-none z-10"></div>
            
            <motion.div 
              className="text-amber-600 dark:text-amber-400 mb-4 p-3 bg-amber-50 dark:bg-amber-900/30 rounded-full w-16 h-16 flex items-center justify-center relative shadow-lg"
              style={{ transform: "translateZ(30px)" }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <FaTicketAlt className="w-8 h-8" />
            </motion.div>
            
            <motion.h3 
              className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3"
              style={{ transform: "translateZ(20px)" }}
            >
              <span className="relative">
                NFT Tickets
                <motion.span 
                  className="absolute bottom-0 left-0 h-[2px] bg-amber-500 dark:bg-amber-400" 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </span>
            </motion.h3>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-300 glass-text"
              style={{ transform: "translateZ(15px)" }}
            >
              Securely mint your ticket as an NFT on the Base network. Each ticket is a unique digital asset that provides verified access to RARE EVO 2025.
            </motion.p>
            
            {/* Blockchain line effect */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500/70 dark:bg-amber-600/70"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.div 
                className="absolute h-full w-16 bg-gradient-to-r from-transparent via-white to-transparent"
                animate={{ 
                  left: ["0%", "100%"],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative overflow-hidden bg-white dark:bg-gray-800 p-6 hover-3d-premium preserve-3d glass-morphism-ultra"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              clipPath: "polygon(8% 0, 100% 0, 100% 100%, 0 100%, 0 8%)"
            }}
          >
            {/* Floating glow orb */}
            <div className="absolute -top-6 -right-6 w-24 h-24 glow-orb-emerald opacity-20 pointer-events-none"></div>
            
            {/* Card glare effect */}
            <div className="card-glare absolute inset-0 w-full h-full pointer-events-none z-10"></div>
            
            <motion.div 
              className="text-emerald-600 dark:text-emerald-400 mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-full w-16 h-16 flex items-center justify-center relative shadow-lg"
              style={{ transform: "translateZ(30px)" }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <FaShieldAlt className="w-8 h-8" />
            </motion.div>
            
            <motion.h3 
              className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3"
              style={{ transform: "translateZ(20px)" }}
            >
              <span className="relative">
                Blockchain Security
                <motion.span 
                  className="absolute bottom-0 left-0 h-[2px] bg-emerald-500 dark:bg-emerald-400" 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </span>
            </motion.h3>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-300 glass-text"
              style={{ transform: "translateZ(15px)" }}
            >
              Prevent counterfeiting and unauthorized transfers with blockchain verification. Your ticket ownership is securely recorded on the Base network.
            </motion.p>
            
            {/* Blockchain line effect */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500/40"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <motion.div 
                className="absolute h-full w-16 bg-gradient-to-r from-transparent via-white to-transparent"
                animate={{ 
                  left: ["0%", "100%"],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 1.5
                }}
              />
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative overflow-hidden bg-white dark:bg-gray-800 p-6 hover-3d-premium preserve-3d glass-morphism-ultra"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              clipPath: "polygon(0 8%, 92% 0, 100% 8%, 100% 100%, 8% 100%, 0 92%)"
            }}
          >
            {/* Floating glow orb */}
            <div className="absolute -top-6 -right-6 w-24 h-24 glow-orb-emerald opacity-20 pointer-events-none"></div>
            
            {/* Card glare effect */}
            <div className="card-glare absolute inset-0 w-full h-full pointer-events-none z-10"></div>
            
            <motion.div 
              className="text-emerald-600 dark:text-emerald-400 mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-full w-16 h-16 flex items-center justify-center relative shadow-lg"
              style={{ transform: "translateZ(30px)" }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <FaUserCheck className="w-8 h-8" />
            </motion.div>
            
            <motion.h3 
              className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3"
              style={{ transform: "translateZ(20px)" }}
            >
              <span className="relative">
                Easy Registration
                <motion.span 
                  className="absolute bottom-0 left-0 h-[2px] bg-emerald-500 dark:bg-emerald-400" 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </span>
            </motion.h3>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-300 glass-text"
              style={{ transform: "translateZ(15px)" }}
            >
              Register your information securely to link your identity to your NFT ticket, ensuring a smooth check-in process at the event.
            </motion.p>
            
            {/* Blockchain line effect */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500/40"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <motion.div 
                className="absolute h-full w-16 bg-gradient-to-r from-transparent via-white to-transparent"
                animate={{ 
                  left: ["0%", "100%"],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <div id="ticket-management" className="max-w-6xl mx-auto">
        <div className="mb-16 perspective-1500">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-3d">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 via-amber-700 to-emerald-800 dark:from-white dark:via-amber-200 dark:to-emerald-300">
                Ticket Management System
              </span>
            </h2>
            
            <motion.div 
              className="w-32 h-1 mx-auto bg-gradient-to-r from-amber-400 via-emerald-500 to-amber-400 rounded-full my-4"
              animate={{ 
                scaleX: [1, 1.5, 1],
                opacity: [0.6, 0.8, 0.6],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          
          <motion.div 
            className="relative preserve-3d"
            style={{ transform: "translateZ(0px)" }}
            initial={{ 
              y: 50,
              opacity: 0,
              rotateX: -15
            }}
            whileInView={{ 
              y: 0,
              opacity: 1,
              rotateX: 0
            }}
            transition={{ 
              duration: 1,
              ease: "easeOut"
            }}
          >
            {/* Floating elements */}
            <motion.div 
              className="absolute -top-6 -right-6 md:-right-12 lg:-right-20 w-20 h-20 md:w-32 md:h-32 rounded-full glow-orb-premium opacity-30 hidden md:block"
              animate={{ 
                y: [0, -15, 0],
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            
            <motion.div 
              className="absolute -bottom-8 -left-8 md:-left-12 lg:-left-20 w-24 h-24 md:w-36 md:h-36 rounded-full glow-orb-amber opacity-30 hidden md:block"
              animate={{ 
                y: [0, 15, 0],
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1
              }}
            />
            
            {/* Main container with premium effects - NOW WITH CUSTOM SHAPE */}
            <div className="relative z-10 bg-white dark:bg-gray-800 shadow-xl overflow-hidden border border-amber-100/40 dark:border-amber-500/20 preserve-3d"
                 style={{ 
                   clipPath: "polygon(0 5%, 5% 0, 95% 0, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0 95%)" 
                 }}
            >
              {/* Holographic overlay */}
              <div className="absolute inset-0 bg-holographic opacity-10 pointer-events-none"></div>
              
              {/* Card glare effect */}
              <div className="card-glare absolute inset-0 w-full h-full pointer-events-none z-10"></div>
              
              {/* Blockchain line top */}
              <motion.div 
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-emerald-500 to-amber-500"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                <motion.div 
                  className="absolute h-full w-32 bg-gradient-to-r from-transparent via-white to-transparent"
                  animate={{ 
                    left: ["0%", "100%"],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
              </motion.div>
              
              <FrameContainer />
            </div>
            
            {/* Particle effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`ticket-particle-${i}`}
                  className="absolute"
                  style={{
                    width: `${Math.random() * 8 + 3}px`,
                    height: `${Math.random() * 8 + 3}px`,
                    borderRadius: '50%',
                    background: i % 2 === 0 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(16, 185, 129, 0.4)',
                    filter: 'blur(2px)',
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, Math.random() * 30 - 15, 0],
                    opacity: [0, 0.8, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: Math.random() * 5 + 10,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="my-16 px-4 sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-3d">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 via-amber-700 to-emerald-800 dark:from-white dark:via-amber-200 dark:to-emerald-300">
              Features & Benefits
            </span>
          </h2>
          
          <motion.div 
            className="w-32 h-1 mx-auto bg-gradient-to-r from-amber-400 via-emerald-500 to-amber-400 rounded-full my-4"
            animate={{ 
              scaleX: [1, 1.5, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto perspective-1500">
          <motion.div 
            className="relative overflow-hidden rounded-xl p-6 border border-amber-100 dark:border-amber-800/50 glass-morphism-ultra preserve-3d"
            initial={{ opacity: 0, y: 30, rotateX: -5 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
            }}
            transition={{ duration: 0.6 }}
            style={{ 
              background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(120, 113, 108, 0.05))" 
            }}
          >
            {/* Floating glow orb */}
            <motion.div 
              className="absolute -top-10 -right-10 w-32 h-32 rounded-full glow-orb-amber opacity-30 pointer-events-none"
              animate={{ 
                y: [0, -10, 0],
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ 
                duration: 7, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            
            {/* Card glare effect */}
            <div className="card-glare absolute inset-0 w-full h-full pointer-events-none z-10"></div>
            
            <motion.h3 
              className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center"
              style={{ transform: "translateZ(30px)" }}
            >
              <motion.div 
                className="bg-amber-100 dark:bg-amber-900/50 p-3 rounded-full mr-3"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <FaWallet className="text-amber-600 dark:text-amber-400 w-6 h-6" />
              </motion.div>
              
              <span className="relative">
                Demo Mode For First-time Users
                <motion.span 
                  className="absolute bottom-0 left-0 h-[2px] bg-amber-500 dark:bg-amber-400" 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </span>
            </motion.h3>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-300 mb-4"
              style={{ transform: "translateZ(20px)" }}
            >
              Try our system without any ETH! Our Demo Mode allows you to experience the full ticketing process with no blockchain transaction costs.
            </motion.p>
            
            <motion.ul 
              className="space-y-2 relative"
              style={{ transform: "translateZ(25px)" }}
            >
              {[
                "Mint a demo ticket without ETH",
                "Experience the registration process",
                "View and test the QR code display",
                "Perfect for first-time users and testing"
              ].map((item, idx) => (
                <motion.li 
                  key={idx}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx, duration: 0.5 }}
                >
                  <motion.div 
                    className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0"
                    whileHover={{ scale: 1.2, backgroundColor: "rgba(245, 158, 11, 0.3)" }}
                  >
                    <div className="h-2 w-2 rounded-full bg-amber-500 dark:bg-amber-400"></div>
                  </motion.div>
                  <span className="text-gray-600 dark:text-gray-300">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
            
            {/* Blockchain line effect */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500/70 to-amber-300/40"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <motion.div 
                className="absolute h-full w-16 bg-gradient-to-r from-transparent via-white to-transparent"
                animate={{ 
                  left: ["0%", "100%"],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative overflow-hidden rounded-xl p-6 border border-emerald-100 dark:border-emerald-800/50 glass-morphism-ultra preserve-3d"
            initial={{ opacity: 0, y: 30, rotateX: -5 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
            }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ 
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(120, 113, 108, 0.05))" 
            }}
          >
            {/* Floating glow orb */}
            <motion.div 
              className="absolute -top-10 -left-10 w-32 h-32 rounded-full glow-orb-emerald opacity-20 pointer-events-none"
              animate={{ 
                y: [0, 10, 0],
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            
            {/* Card glare effect */}
            <div className="card-glare absolute inset-0 w-full h-full pointer-events-none z-10"></div>
            
            <motion.h3 
              className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center"
              style={{ transform: "translateZ(30px)" }}
            >
              <motion.div 
                className="bg-emerald-100 dark:bg-emerald-900/50 p-3 rounded-full mr-3"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <FaTicketAlt className="text-emerald-600 dark:text-emerald-400 w-6 h-6" />
              </motion.div>
              
              <span className="relative">
                Enhanced Ticket Display
                <motion.span 
                  className="absolute bottom-0 left-0 h-[2px] bg-emerald-500 dark:bg-emerald-400" 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </span>
            </motion.h3>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-300 mb-4"
              style={{ transform: "translateZ(20px)" }}
            >
              Our ticket view features a large, prominent QR code for easy scanning at the event entrance, along with all your essential attendee information.
            </motion.p>
            
            <motion.ul 
              className="space-y-2 relative"
              style={{ transform: "translateZ(25px)" }}
            >
              {[
                "Large, easy-to-scan QR code",
                "Clear status indicators (Claimed/Unclaimed)",
                "Important attendee details",
                "Truncated wallet address for security"
              ].map((item, idx) => (
                <motion.li 
                  key={idx}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx + 0.1, duration: 0.5 }}
                >
                  <motion.div 
                    className="h-5 w-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0"
                    whileHover={{ scale: 1.2, backgroundColor: "rgba(16, 185, 129, 0.3)" }}
                  >
                    <div className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400"></div>
                  </motion.div>
                  <span className="text-gray-600 dark:text-gray-300">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
            
            {/* Blockchain line effect */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500/40"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <motion.div 
                className="absolute h-full w-16 bg-gradient-to-r from-transparent via-white to-transparent"
                animate={{ 
                  left: ["0%", "100%"],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 1.5
                }}
              />
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative overflow-hidden rounded-xl p-6 border border-stone-200 dark:border-stone-700 glass-morphism-ultra preserve-3d"
            initial={{ opacity: 0, y: 30, rotateX: -5 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ 
              background: "linear-gradient(135deg, rgba(120, 113, 108, 0.1), rgba(168, 162, 158, 0.05))" 
            }}
          >
            {/* Floating glow orb */}
            <motion.div 
              className="absolute -top-10 -left-10 w-32 h-32 rounded-full glow-orb-emerald opacity-20 pointer-events-none"
              animate={{ 
                y: [0, -8, 0],
                x: [0, 8, 0],
                scale: [1, 1.05, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ 
                duration: 9, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            
            {/* Card glare effect */}
            <div className="card-glare absolute inset-0 w-full h-full pointer-events-none z-10"></div>
            
            <motion.h3 
              className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center"
              style={{ transform: "translateZ(30px)" }}
            >
              <motion.div 
                className="bg-stone-100 dark:bg-stone-800 p-3 rounded-full mr-3"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <FaChartLine className="text-amber-600 dark:text-amber-400 w-6 h-6" />
              </motion.div>
              
              <span className="relative">
                Responsive Design
                <motion.span 
                  className="absolute bottom-0 left-0 h-[2px] bg-amber-500 dark:bg-amber-400" 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </span>
            </motion.h3>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-300 mb-4"
              style={{ transform: "translateZ(20px)" }}
            >
              Access your tickets from any device with our fully responsive design that looks great on desktops, tablets, and mobile phones.
            </motion.p>
            
            <motion.ul 
              className="space-y-2 relative"
              style={{ transform: "translateZ(25px)" }}
            >
              {[
                "Optimized for all screen sizes",
                "Consistent experience across devices",
                "Smooth animations and transitions",
                "Accessible and user-friendly interface"
              ].map((item, idx) => (
                <motion.li 
                  key={idx}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx + 0.2, duration: 0.5 }}
                >
                  <motion.div 
                    className="h-5 w-5 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0"
                    whileHover={{ scale: 1.2, backgroundColor: "rgba(120, 113, 108, 0.3)" }}
                  >
                    <div className="h-2 w-2 rounded-full bg-amber-500 dark:bg-amber-400"></div>
                  </motion.div>
                  <span className="text-gray-600 dark:text-gray-300">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
            
            {/* Blockchain line effect */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500/40"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div 
                className="absolute h-full w-16 bg-gradient-to-r from-transparent via-white to-transparent"
                animate={{ 
                  left: ["0%", "100%"],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              />
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative overflow-hidden rounded-xl p-6 border border-emerald-100 dark:border-emerald-800/50 glass-morphism-ultra preserve-3d"
            initial={{ opacity: 0, y: 30, rotateX: -5 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
            }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ 
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(120, 113, 108, 0.05))" 
            }}
          >
            {/* Floating glow orb */}
            <motion.div 
              className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full glow-orb-emerald opacity-20 pointer-events-none"
              animate={{ 
                y: [0, 10, 0],
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ 
                duration: 7, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            
            {/* Card glare effect */}
            <div className="card-glare absolute inset-0 w-full h-full pointer-events-none z-10"></div>
            
            <motion.h3 
              className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center"
              style={{ transform: "translateZ(30px)" }}
            >
              <motion.div 
                className="bg-emerald-100 dark:bg-emerald-900/50 p-3 rounded-full mr-3"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <FaShieldAlt className="text-emerald-600 dark:text-emerald-400 w-6 h-6" />
              </motion.div>
              
              <span className="relative">
                Privacy & Security
                <motion.span 
                  className="absolute bottom-0 left-0 h-[2px] bg-emerald-500 dark:bg-emerald-400" 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </span>
            </motion.h3>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-300 mb-4"
              style={{ transform: "translateZ(20px)" }}
            >
              Your data security is our priority. We use blockchain technology to ensure ticket authenticity while protecting your personal information.
            </motion.p>
            
            <motion.ul 
              className="space-y-2 relative"
              style={{ transform: "translateZ(25px)" }}
            >
              {[
                "Comprehensive privacy policy",
                "Secure registration process",
                "Verified ticket ownership",
                "Transparent terms and conditions"
              ].map((item, idx) => (
                <motion.li 
                  key={idx}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx + 0.3, duration: 0.5 }}
                >
                  <motion.div 
                    className="h-5 w-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0"
                    whileHover={{ scale: 1.2, backgroundColor: "rgba(16, 185, 129, 0.3)" }}
                  >
                    <div className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400"></div>
                  </motion.div>
                  <span className="text-gray-600 dark:text-gray-300">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
            
            {/* Blockchain line effect */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500/40"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <motion.div 
                className="absolute h-full w-16 bg-gradient-to-r from-transparent via-white to-transparent"
                animate={{ 
                  left: ["0%", "100%"],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 2.5
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <div className="my-16 perspective-2000">
        <motion.div 
          className="relative overflow-hidden bg-gradient-to-br from-amber-700 to-emerald-800 text-white p-8 md:p-12 max-w-5xl mx-auto text-center shadow-xl preserve-3d"
          initial={{ opacity: 0, y: 50, rotateX: -10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            clipPath: "polygon(0 0, 100% 0, 97% 50%, 100% 100%, 0 100%, 3% 50%)"
          }}
        >
          {/* Advanced background effects */}
          <div className="absolute inset-0 bg-holographic opacity-20"></div>
          
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`cta-particle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${Math.random() * 6 + 3}px`,
                  height: `${Math.random() * 6 + 3}px`,
                  background: i % 2 === 0 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(16, 185, 129, 0.4)',
                  filter: 'blur(1px)',
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, Math.random() * -100],
                  x: [0, Math.random() * 50 - 25],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          {/* Glowing orbs */}
          <motion.div 
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full glow-orb-amber opacity-40 pointer-events-none"
            animate={{ 
              y: [0, -15, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          
          <motion.div 
            className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full glow-orb-emerald opacity-40 pointer-events-none"
            animate={{ 
              y: [0, 15, 0],
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.4, 0.3]
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
          />
          
          {/* 3D floating content */}
          <div className="relative z-10 preserve-3d">
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-6 text-3d"
              style={{ transform: "translateZ(50px)" }}
            >
              Ready for <span className="neon-text-emerald">RARE EVO 2025</span>?
            </motion.h2>
            
            <motion.p 
              className="text-xl opacity-90 mb-8 max-w-2xl mx-auto"
              style={{ transform: "translateZ(40px)" }}
            >
              Secure your spot at the premier web3 event of the year. Mint your NFT ticket today or try our demo mode to experience the system.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-5"
              style={{ transform: "translateZ(60px)" }}
            >
              <motion.a 
                href="#ticket-management" 
                className="btn-glow bg-white text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 dark:bg-emerald-900 dark:text-white dark:hover:bg-emerald-800 font-semibold py-4 px-8 rounded-lg shadow-md transition duration-200 btn-float-3d group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  <FaTicketAlt className="mr-2 group-hover:animate-bounce" />
                  Mint Your Ticket
                  
                  {/* Animated hover effect */}
                  <motion.span 
                    className="absolute inset-0 bg-emerald-200 dark:bg-emerald-700 rounded-lg -z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 0.2, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
              </motion.a>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  href="/support" 
                  className="bg-amber-600 border border-amber-500 hover:bg-amber-700 text-white font-semibold py-4 px-10 min-w-36 rounded-lg shadow-md transition duration-200 flex items-center justify-center"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <FaQuestion className="mr-2 group-hover:rotate-12 transition-transform" />
                    Get Support
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Blockchain line effect */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-emerald-500 to-amber-500"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <motion.div 
              className="absolute h-full w-32 bg-gradient-to-r from-transparent via-white to-transparent"
              animate={{ 
                left: ["0%", "100%"],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          </motion.div>
        </motion.div>
      </div>
      
    </>
  );
}
