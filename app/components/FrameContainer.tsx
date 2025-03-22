'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RegistrationForm } from './RegistrationForm';
import {
  HiMiniCheckBadge,
  HiArrowRightCircle,
  HiCurrencyDollar,
  HiSparkles,
} from 'react-icons/hi2';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';
import { FaQrcode, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaEthereum } from 'react-icons/fa';
import Image from 'next/image';
import TicketView from './TicketView';
import { BuyTicket } from './BuyTicket';

type FrameState = 'mint' | 'register' | 'view' | 'success' | 'loading';

export interface TicketData {
  name: string;
  email: string;
  company: string;
  walletAddress: string;
  claimed: boolean;
  isDemoTicket?: boolean;
}

export function FrameContainer() {
  const [frameState, setFrameState] = useState<FrameState>('loading');
  const [ticketData, setTicketData] = useState<any>(null);
  const [isDemoTicket, setIsDemoTicket] = useState(false);
  const { address, isConnected } = useAccount();
  const [confettiRenderer, setConfettiRenderer] = useState<any>(null);
  const [ticketViewOpen, setTicketViewOpen] = useState(false);

  // Simulate checking if user has a ticket
  useEffect(() => {
    const checkUserTicket = async () => {
      try {
        // In a real implementation, this would check the blockchain
        // to see if the connected wallet has a ticket
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (isConnected && address) {
          // For demo purposes, randomly decide if user has a ticket
          const hasTicket = Math.random() > 0.5;
          
          if (hasTicket) {
            // Simulate ticket data from blockchain/database
            setTicketData({
              walletAddress: address,
              name: '',
              email: '',
              company: '',
              claimed: false,
            });
            setFrameState('register');
          } else {
            setFrameState('mint');
          }
        } else {
          setFrameState('mint');
        }
      } catch (error) {
        console.error('Error checking ticket:', error);
        setFrameState('mint');
      }
    };
    
    checkUserTicket();
  }, [address, isConnected]);

  const handleRegistration = async (data: any) => {
    // Here we'll handle the registration logic and NFT metadata update
    try {
      setFrameState('loading');
      // Simulate API call to update metadata
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTicketData({...data, claimed: true});
      setFrameState('success');
      
      // Trigger confetti on success
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 300);
    } catch (error) {
      console.error('Registration failed:', error);
      setFrameState('register');
    }
  };

  const handleMintSuccess = () => {
    if (!isConnected) {
      // If user is not connected, this is a demo mint
      setIsDemoTicket(true);
      const demoData = {
        name: '',
        email: '',
        company: '',
        walletAddress: '0xDEMO123456789ABCDEF0000000000000000000000',
        claimed: false,
        isDemoTicket: true,
      };
      setTicketData(demoData);
    }
    
    setFrameState('register');
    
    // Trigger confetti on mint success
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 300);
  };

  // Handle demo ticket minting (no wallet required)
  const handleDemoMint = () => {
    setFrameState('loading');
    
    // Simulate blockchain transaction delay
    setTimeout(() => {
      setIsDemoTicket(true);
      const demoData = {
        name: '',
        email: '',
        company: '',
        walletAddress: '0xDEMO123456789ABCDEF0000000000000000000000',
        claimed: false,
        isDemoTicket: true,
      };
      setTicketData(demoData);
      handleMintSuccess();
    }, 1500);
  };

  // Handle View Ticket button click
  const handleViewTicket = () => {
    if (!ticketData) {
      setFrameState('loading');
      // If we don't have ticket data, fetch it first (for demo purposes, create placeholder data)
      setTimeout(() => {
        if (address) {
          const placeholderData = {
            name: 'Guest User',
            email: '',
            company: '',
            walletAddress: address,
            claimed: false,
          };
          setTicketData(placeholderData);
          setFrameState('view');
        } else {
          setFrameState('mint');
        }
      }, 1000);
    } else {
      setFrameState('view');
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-stone-200">
      {/* Main card container */}
      <div className="bg-gradient-to-br from-amber-700 to-emerald-800 p-3 sm:p-4 text-white relative overflow-hidden">
        {/* Decorative elements for header */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-400 bg-opacity-20 rounded-full"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-emerald-400 bg-opacity-20 rounded-full"></div>
        
        <div className="flex items-center justify-between mb-1 relative z-10">
          <h1 className="text-xl sm:text-2xl font-bold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
            <span className="relative">
              RARE EVO 2025
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-transparent rounded-full"></span>
            </span>
          </h1>
          <span className="text-xs bg-white bg-opacity-20 rounded-full px-3 py-1 font-medium">
            July 15-18, 2025
          </span>
        </div>
        <div className="flex justify-between items-center relative z-10">
          <p className="text-sm sm:text-base text-amber-100 font-medium">NFT Ticket Management</p>
          <div className="text-xs bg-amber-600 bg-opacity-40 rounded-lg px-3 py-1 hidden sm:block">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              San Francisco, CA
            </span>
          </div>
        </div>
      </div>
      
      <div className="relative min-h-[400px] sm:min-h-[500px]">
        <AnimatePresence mode="wait">
          {frameState === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center p-6 sm:p-12 h-64"
            >
              <div className="w-16 h-16 relative">
                <div className="w-full h-full border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
                    <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="mt-4 text-sm sm:text-base text-gray-600 font-medium">Loading your ticket information...</p>
            </motion.div>
          )}

          {frameState === 'register' && (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <RegistrationForm onSubmit={handleRegistration} initialData={ticketData} isDemoTicket={isDemoTicket} />
            </motion.div>
          )}

          {frameState === 'view' && ticketData && (
            <motion.div
              key="view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <TicketView 
                attendeeName={ticketData?.name || ''}
                attendeeEmail={ticketData?.email || ''}
                attendeeCompany={ticketData?.company || ''}
                walletAddress={ticketData?.walletAddress || ''}
                isClaimed={!!ticketData?.claimed}
                isDemoTicket={ticketData?.isDemoTicket || isDemoTicket}
              />
            </motion.div>
          )}

          {frameState === 'view' && !ticketData && (
            <motion.div
              key="loading-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center p-6 sm:p-12 h-64"
            >
              <div className="w-16 h-16 relative">
                <div className="w-full h-full border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
                    <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="mt-4 text-sm sm:text-base text-gray-600 font-medium">Loading your ticket information...</p>
            </motion.div>
          )}

          {frameState === 'mint' && (
            <motion.div
              key="mint"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-10"
            >
              <BuyTicket onSuccess={handleMintSuccess} />
            </motion.div>
          )}

          {frameState === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="p-4 sm:p-8 text-center"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="relative w-24 h-24 mx-auto mb-6 perspective-1000 preserve-3d"
                style={{ transform: "translateZ(50px)" }}
              >
                {/* Animated orbs in background */}
                <div className="glow-orb glow-orb-1 w-20 h-20 absolute -top-5 -left-5 animate-pulse-glow opacity-60"></div>
                <div className="glow-orb glow-orb-2 w-16 h-16 absolute -bottom-3 -right-3 animate-pulse-glow opacity-60" style={{ animationDelay: "1s" }}></div>
                
                {/* Success icon with 3D effect */}
                <div className="absolute inset-0 w-24 h-24 bg-gradient-to-br from-green-300 to-green-400 dark:from-green-500 dark:to-green-600 rounded-full flex items-center justify-center shadow-lg hover-3d z-10 glass-morphism">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute w-full h-full rounded-full bg-green-200 dark:bg-green-700 opacity-30 animate-pulse" style={{ animationDuration: "3s" }}></div>
              </motion.div>
              
              <motion.h2 
                className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 neon-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ transform: "translateZ(30px)" }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-500 dark:from-green-400 dark:to-teal-300">
                  Registration Successful!
                </span>
              </motion.h2>
              
              <motion.div 
                className="max-w-md mx-auto space-y-4 preserve-3d"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base" style={{ transform: "translateZ(20px)" }}>
                  Your ticket has been registered and is ready for the event. 
                  <br />You can view your ticket anytime before the event.
                </p>
                
                <div className="p-4 rounded-xl glass-morphism border border-green-100 dark:border-green-800 preserve-3d hover-3d" style={{ transform: "translateZ(10px)" }}>
                  <div className="flex items-center mb-2" style={{ transform: "translateZ(15px)" }}>
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="font-medium text-gray-800 dark:text-gray-200">Event Details Confirmed</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    July 15-18, 2025 • Rare Evo Conference
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="mt-6 space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{ transform: "translateZ(20px)" }}
              >
                <motion.button
                  onClick={() => setFrameState('view')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-green-500 dark:from-teal-600 dark:to-green-600 rounded-lg shadow-md text-white font-medium hover-3d flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  View My Ticket
                </motion.button>
                
                <motion.button
                  onClick={() => setFrameState('mint')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 px-4 border border-green-200 dark:border-green-800 bg-white dark:bg-gray-800 rounded-lg text-green-700 dark:text-green-400 font-medium flex items-center justify-center hover-3d glass-morphism"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Mint Another Ticket
                </motion.button>
              </motion.div>
              
              {/* Particle effects */}
              <div className="particles-container" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className={`particle particle-${(i % 3) + 1} absolute`}
                    initial={{ 
                      x: Math.random() * 100 - 50, 
                      y: Math.random() * 100 - 50,
                      opacity: 0,
                      width: `${Math.random() * 10 + 5}px`,
                      height: `${Math.random() * 10 + 5}px`,
                    }}
                    animate={{ 
                      x: [
                        Math.random() * 200 - 100,
                        Math.random() * 200 - 100,
                        Math.random() * 200 - 100,
                      ],
                      y: [
                        Math.random() * 200 - 100,
                        Math.random() * 200 - 100,
                        Math.random() * 200 - 100,
                      ],
                      opacity: [0, 0.7, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: Math.random() * 5 + 10,
                      repeat: Infinity,
                      delay: Math.random() * 5,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-amber-50 dark:from-gray-800/40 dark:to-amber-900/30 border-t border-amber-100 dark:border-amber-800/30 flex justify-between glass-morphism-premium">
        <motion.button 
          onClick={() => setFrameState('mint')}
          className="text-xs sm:text-sm text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium flex items-center relative overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <svg className="h-4 w-4 mr-1 relative z-10 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
          </svg>
          <span className="relative z-10">Mint Ticket</span>
        </motion.button>
        <motion.button 
          onClick={() => setFrameState('register')}
          className="text-xs sm:text-sm text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium flex items-center relative overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <svg className="h-4 w-4 mr-1 relative z-10 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
          <span className="relative z-10">Register</span>
        </motion.button>
        <motion.button 
          onClick={handleViewTicket}
          className="text-xs sm:text-sm text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium flex items-center relative overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <svg className="h-4 w-4 mr-1 relative z-10 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span className="relative z-10">View Ticket</span>
        </motion.button>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-amber-50 dark:from-gray-800/40 dark:to-amber-900/30 border-t border-amber-100 dark:border-amber-800/30 p-3 sm:p-4 glass-morphism-premium">
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-center text-xs text-gray-500 dark:text-gray-400">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05, color: '#f59e0b' }}
          >
            <svg className="h-4 w-4 mr-1 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="relative">
              Secure Minting
              <motion.span 
                className="absolute bottom-0 left-0 h-[1px] bg-amber-500" 
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </span>
          </motion.div>
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05, color: '#f59e0b' }}
          >
            <svg className="h-4 w-4 mr-1 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.581.814l-4.419-4.419-4.419 4.419A1 1 0 014 16V4z" clipRule="evenodd" />
            </svg>
            <span className="relative">
              Base Network
              <motion.span 
                className="absolute bottom-0 left-0 h-[1px] bg-amber-500" 
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </span>
          </motion.div>
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05, color: '#f59e0b' }}
          >
            <svg className="h-4 w-4 mr-1 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
            </svg>
            <span className="relative">
              Help Center
              <motion.span 
                className="absolute bottom-0 left-0 h-[1px] bg-amber-500" 
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </span>
          </motion.div>
        </div>
        
        <div className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400 flex justify-center space-x-4">
          <a href="#" onClick={(e) => {
            e.preventDefault();
            window.location.href = '/privacy';
          }} className="hover:text-emerald-500 transition-colors relative group">
            Privacy
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
          </a>
          <span className="text-amber-500/50">|</span>
          <a href="#" onClick={(e) => {
            e.preventDefault();
            window.location.href = '/terms';
          }} className="hover:text-emerald-500 transition-colors relative group">
            Terms
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>
      </div>

      {/* Footer with buttons for wallet connection and primary actions */}
      <div className="mt-auto p-5 border-t border-amber-100 dark:border-gray-700">
        {/* Removing these three elements as requested */}
      </div>
    </div>
  );
} 