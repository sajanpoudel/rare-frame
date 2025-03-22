'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RegistrationForm } from './RegistrationForm';
import TicketView from './TicketView';
import { BuyTicket } from './BuyTicket';
import { useAccount } from 'wagmi';
import confetti from 'canvas-confetti';

type FrameState = 'mint' | 'register' | 'view' | 'success' | 'loading';

export function FrameContainer() {
  const [frameState, setFrameState] = useState<FrameState>('loading');
  const [ticketData, setTicketData] = useState<any>(null);
  const [isDemoTicket, setIsDemoTicket] = useState(false);
  const { address, isConnected } = useAccount();

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
            const newTicketData = {
              name: '',
              email: '',
              company: '',
              walletAddress: address,
              claimed: Math.random() > 0.5, // Randomly set claimed status
            };
            
            setTicketData(newTicketData);
            // Use the newTicketData directly instead of depending on state update
            setFrameState(newTicketData.claimed ? 'view' : 'register');
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
    <div className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-indigo-100">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-3 sm:p-4 text-white relative overflow-hidden">
        {/* Decorative elements for header */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-400 bg-opacity-20 rounded-full"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-400 bg-opacity-20 rounded-full"></div>
        
        <div className="flex items-center justify-between mb-1 relative z-10">
          <h1 className="text-xl sm:text-2xl font-bold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
            <span className="relative">
              RARE EVO 2025
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-transparent rounded-full"></span>
            </span>
          </h1>
          <span className="text-xs bg-white bg-opacity-20 rounded-full px-3 py-1 font-medium">
            July 15-18, 2025
          </span>
        </div>
        <div className="flex justify-between items-center relative z-10">
          <p className="text-sm sm:text-base text-blue-100 font-medium">NFT Ticket Management</p>
          <div className="text-xs bg-blue-600 bg-opacity-40 rounded-lg px-3 py-1 hidden sm:block">
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
                <div className="w-full h-full border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
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
                <div className="w-full h-full border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
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
                className="w-24 h-24 bg-gradient-to-br from-green-50 to-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md"
              >
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </motion.div>
              
              <motion.h2 
                className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-500">
                  Registration Successful!
                </span>
              </motion.h2>
              
              <motion.p 
                className="text-gray-600 mb-6 text-sm sm:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Your ticket has been registered and is ready for the event. 
                <br />You can view your ticket anytime before the event.
              </motion.p>
              
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="py-4 px-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-6 inline-block shadow-sm border border-blue-100">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-500 mb-1">Event Date</span>
                    <span className="text-blue-700 font-medium">July 15-18, 2025</span>
                    <span className="text-xs text-gray-500 mt-2">San Francisco, CA</span>
                  </div>
                </div>
                
                <motion.button
                  onClick={handleViewTicket}
                  whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(59, 130, 246, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-colors shadow-md font-medium flex items-center justify-center mx-auto"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                  </svg>
                  View My Ticket
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {frameState !== 'loading' && frameState !== 'success' && (
        <div className="p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-blue-100 flex justify-between">
          <button 
            onClick={() => setFrameState('mint')}
            className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Mint New
          </button>
          
          <button 
            onClick={() => setFrameState('register')}
            className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            Register
          </button>
          
          <button 
            onClick={handleViewTicket}
            className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            View Ticket
          </button>
        </div>
      )}

      {/* Event Info Footer */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-t border-blue-100 p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 text-xs sm:text-sm">
          <div className="mb-2 sm:mb-0">
            <p className="text-gray-700 font-medium">Rare Evo 2025</p>
            <p className="text-gray-500">July 15-18, 2025 • San Francisco</p>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 flex justify-between items-center pt-2 border-t border-gray-200">
          <span>© 2025 Rare Evo. All rights reserved.</span>
          <div className="flex space-x-4">
            <a href="#" onClick={(e) => {
              e.preventDefault();
              window.open('/privacy', '_blank');
            }} className="hover:text-blue-500 transition-colors">Privacy</a>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              window.open('/terms', '_blank');
            }} className="hover:text-blue-500 transition-colors">Terms</a>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              window.open('/support', '_blank');
            }} className="hover:text-blue-500 transition-colors">Support</a>
          </div>
        </div>
      </div>
    </div>
  );
} 