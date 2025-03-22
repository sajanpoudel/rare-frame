'use client';

import { useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { z } from 'zod';

interface RegistrationFormProps {
  onSubmit: (data: any) => void;
  initialData?: {
    name?: string;
    email?: string;
    company?: string;
    walletAddress?: string;
    claimed?: boolean;
    isDemoTicket?: boolean;
  };
  isDemoTicket?: boolean;
}

export function RegistrationForm({ onSubmit, initialData = {}, isDemoTicket = false }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    company: initialData?.company || '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  // 3D Form effect
  const formRef = useRef<HTMLFormElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring physics for subtle movement
  const springConfig = { damping: 25, stiffness: 120 };
  const rotateX = useSpring(useTransform(mouseY, [0, 300], [1.2, -1.2]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 300], [-1.2, 1.2]), springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLFormElement>) => {
    const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = e.currentTarget;
    const x = e.clientX - offsetLeft;
    const y = e.clientY - offsetTop;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(150);
    mouseY.set(150);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const validateForm = () => {
    try {
      const schema = z.object({
        name: z.string().min(2, 'Name must be at least 2 characters'),
        email: z.string().email('Invalid email address'),
        company: z.string().min(1, 'Company is required'),
      });
      
      schema.parse(formData);
      return true;
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as string;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onSubmit({
        ...formData,
        walletAddress: initialData?.walletAddress || '0xDEFAULT0000000000000000000000000000',
      });
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-md mx-auto" 
      ref={formRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        className="space-y-4 sm:space-y-6"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center space-y-2"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white neon-text-teal">
            Register Your {isDemoTicket ? 'Demo ' : ''}Ticket
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Complete your information to finalize your ticket
          </p>
        </motion.div>
        
        <div className="space-y-4 perspective-1000">
          <motion.div 
            className="space-y-4 backdrop-blur-sm sm:p-6 p-4 rounded-xl bg-white/70 dark:bg-gray-800/60 border border-emerald-100 dark:border-emerald-900 shadow-lg glass-morphism preserve-3d"
            style={{ transform: "translateZ(20px)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-4">
              <motion.div 
                className="relative"
                style={{ transform: "translateZ(10px)" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border ${
                      errors.name 
                        ? 'border-red-300 dark:border-red-800 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-700 focus:ring-emerald-500 focus:border-emerald-500'
                    } rounded-lg shadow-sm text-gray-900 dark:text-white hover-3d`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                )}
              </motion.div>
              
              <motion.div 
                className="relative"
                style={{ transform: "translateZ(10px)" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border ${
                      errors.email 
                        ? 'border-red-300 dark:border-red-800 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-700 focus:ring-emerald-500 focus:border-emerald-500'
                    } rounded-lg shadow-sm text-gray-900 dark:text-white hover-3d`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                )}
              </motion.div>
              
              <motion.div 
                className="relative"
                style={{ transform: "translateZ(10px)" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Company or Organization
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border ${
                      errors.company 
                        ? 'border-red-300 dark:border-red-800 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-700 focus:ring-emerald-500 focus:border-emerald-500'
                    } rounded-lg shadow-sm text-gray-900 dark:text-white hover-3d`}
                    placeholder="Your company or organization"
                  />
                </div>
                {errors.company && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.company}</p>
                )}
              </motion.div>
              
              <motion.div 
                className="relative mt-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center space-x-2 hover-3d" style={{ transform: "translateZ(10px)" }}>
                  <div className="w-5 h-5 relative">
                    <svg className="w-5 h-5 text-emerald-500 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <motion.div 
                      className="absolute top-0 left-0 w-5 h-5 bg-emerald-500 dark:bg-emerald-400 bg-opacity-30 dark:bg-opacity-30 rounded-full animate-ping"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    ></motion.div>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-700 dark:text-gray-300 font-medium">Connected Wallet</span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400 font-mono">
                      {initialData?.walletAddress 
                        ? `${initialData.walletAddress.substring(0, 6)}...${initialData.walletAddress.substring(initialData.walletAddress.length - 4)}`
                        : 'No wallet connected'}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        <motion.button
          type="submit"
          disabled={isLoading}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={isLoading ? {} : { scale: 1.03, boxShadow: "0 10px 25px -10px rgba(16, 185, 129, 0.5)" }}
          whileTap={isLoading ? {} : { scale: 0.97 }}
          className={`w-full py-3 px-4 flex justify-center items-center text-white font-medium rounded-lg shadow-md hover-3d transition-all btn-hover-effect ${
            isDemoTicket 
              ? 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600' 
              : 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600'
          } ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
          style={{ transform: "translateZ(20px)" }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Registering...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Register {isDemoTicket ? 'Demo ' : ''}Ticket
            </div>
          )}
        </motion.button>
        
        <motion.div 
          className="mt-5 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900 glass-morphism"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ transform: "translateZ(10px)" }}
        >
          <p className="text-xs text-gray-600 dark:text-gray-300">
            {isDemoTicket 
              ? "Demo tickets are for testing only and don't represent real NFTs" 
              : "Your information will be securely stored and associated with your NFT ticket"}
          </p>
        </motion.div>
        
        {/* Decorative orbs */}
        <div className="absolute -z-10 top-10 -left-20 w-40 h-40" aria-hidden="true">
          <div className="glow-orb-emerald w-full h-full absolute animate-pulse-glow opacity-30"></div>
        </div>
        <div className="absolute -z-10 bottom-10 -right-20 w-40 h-40" aria-hidden="true">
          <div className="glow-orb-amber w-full h-full absolute animate-pulse-glow opacity-30" style={{animationDelay: "1.5s"}}></div>
        </div>
      </motion.div>
    </form>
  );
} 