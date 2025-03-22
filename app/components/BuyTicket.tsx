'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useAccount, useWriteContract, useBalance } from 'wagmi';
import { parseEther } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface BuyTicketProps {
  onSuccess: () => void;
}

export function BuyTicket({ onSuccess }: BuyTicketProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address,
  });

  // Card hover animation
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring physics for card movement - enhanced 3D effect
  const springConfig = { damping: 15, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [0, 300], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 300], [-12, 12]), springConfig);

  // Detect dark mode
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

  // Handle card 3D effect with enhanced glare
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = e.currentTarget;
    const x = e.clientX - offsetLeft;
    const y = e.clientY - offsetTop;
    
    mouseX.set(x);
    mouseY.set(y);
    
    // Update glare position for 3D lighting effect if card exists
    if (cardRef.current) {
      const glareElement = cardRef.current.querySelector('.card-glare') as HTMLElement;
      if (glareElement) {
        const glareX = (x / offsetWidth) * 100;
        const glareY = (y / offsetHeight) * 100;
        glareElement.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 80%)`;
      }
    }
  };

  // Reset card position when mouse leaves
  const handleMouseLeave = () => {
    mouseX.set(150);
    mouseY.set(150);
  };

  // Use writeContract hook for wagmi v2
  const { writeContractAsync, isPending: isMinting } = useWriteContract();

  const handleMint = async () => {
    setError(null);
    
    if (!isConnected) {
      // Connect button will handle this now
      return;
    }

    // For demo mode, skip balance check
    if (!isDemoMode) {
      // Check if user has enough balance
      if (balance && parseFloat(balance.formatted) < 0.0001) {
        setError('Insufficient balance. You need at least 0.0001 ETH to mint a ticket.');
        return;
      }

      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
      if (!contractAddress) {
        setError('Contract address not configured. Please check your environment variables.');
        return;
      }
    }

    setIsProcessing(true);
    try {
      if (isDemoMode) {
        // Just wait a bit to simulate transaction for demo mode
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else {
        // Real transaction
        await writeContractAsync({
          address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
          abi: [
            {
              name: 'mintTicket',
              type: 'function',
              stateMutability: 'payable',
              inputs: [],
              outputs: [],
            },
          ],
          functionName: 'mintTicket',
          value: parseEther('0.0001'),
        });
      }
      
      onSuccess();
    } catch (error: any) {
      console.error('Minting failed:', error);
      setError(error?.message || 'Failed to mint ticket. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDemoMint = () => {
    setIsDemoMode(true);
    handleMint();
  };

  const buttonDisabled = isProcessing || isMinting;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-3 sm:p-6 space-y-4 sm:space-y-6 w-full max-w-md mx-auto"
    >
      <motion.div 
        className="text-center space-y-2"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-xl sm:text-2xl font-bold relative inline-block neon-text-teal">
          Get Your Rare Evo 2025 Ticket
          <motion.span 
            className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-amber-300 rounded-full" 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.3, duration: 0.8 }}
          ></motion.span>
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Mint your NFT ticket on Base network</p>
      </motion.div>

      <motion.div 
        className="space-y-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative overflow-hidden p-5 sm:p-6 rounded-xl shadow-lg border border-emerald-100 dark:border-emerald-900 hover-3d preserve-3d perspective-1000"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* 3D Card Background with gradient */}
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-card-gradient' : 'bg-ticket-gradient'} opacity-90 dark:opacity-40`}></div>
          
          {/* Dynamic glare effect */}
          <div className="card-glare absolute inset-0 w-full h-full pointer-events-none"></div>
          
          {/* Decorative elements with 3D effect */}
          <div style={{ transform: "translateZ(40px)" }} className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-emerald-300 dark:bg-emerald-800 rounded-full opacity-40"></div>
          <div style={{ transform: "translateZ(20px)" }} className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-amber-300 dark:bg-amber-800 rounded-full opacity-30"></div>
          
          <div className="relative">
            <div style={{ transform: "translateZ(40px)" }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-2">
              <div className="flex items-center space-x-2">
                <svg className="w-7 h-7 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
                  <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clipRule="evenodd" />
                </svg>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">Rare Evo 2025</h3>
              </div>
              <span style={{ transform: "translateZ(60px)" }} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-sm">
                <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                Base Network
              </span>
            </div>
            
            <div style={{ transform: "translateZ(30px)" }} className="space-y-3 sm:space-y-4 backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg glass-morphism">
              <motion.div 
                className="flex items-center"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <svg className="min-w-5 w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-gray-800 dark:text-gray-200 font-medium">Full event access (July 15-18, 2025)</span>
              </motion.div>
              <motion.div 
                className="flex items-center"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <svg className="min-w-5 w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-gray-800 dark:text-gray-200 font-medium">Exclusive NFT collectible</span>
              </motion.div>
              <motion.div 
                className="flex items-center"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <svg className="min-w-5 w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-gray-800 dark:text-gray-200 font-medium">Network with industry leaders</span>
              </motion.div>
              <motion.div 
                className="flex items-center"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <svg className="min-w-5 w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-gray-800 dark:text-gray-200 font-medium">VIP access to workshops & panels</span>
              </motion.div>
            </div>
            
            <div style={{ transform: "translateZ(20px)" }} className="mt-5 pt-4 border-t border-emerald-100 dark:border-emerald-900">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 px-4 py-2 rounded-lg glass-morphism">
                  <span className="block text-sm text-gray-500 dark:text-gray-400">Price</span>
                  <div className="flex items-center">
                    <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">0.0001 ETH</span>
                    {!isDemoMode && (
                      <span className="ml-2 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-xs font-medium px-2 py-0.5 rounded-full">
                        Free Trial Available
                      </span>
                    )}
                  </div>
                </div>
                {isConnected && balance && !isDemoMode && (
                  <motion.div 
                    className="text-right px-4 py-2 bg-white/70 dark:bg-gray-800/70 rounded-lg glass-morphism"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="block text-sm text-gray-500 dark:text-gray-400">Your Balance</span>
                    <span className={`text-sm font-medium ${parseFloat(balance.formatted) < 0.0001 ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>
                      {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg text-sm flex items-start glass-morphism"
          >
            <svg className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{error}</span>
          </motion.div>
        )}
      </motion.div>

      {!isConnected ? (
        <motion.div 
          className="flex justify-center flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="w-full hover-3d">
            <ConnectButton label="Connect Your Wallet" />
          </div>
          
          <div className="flex items-center w-full my-2">
            <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
            <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          
          <motion.button
            onClick={handleDemoMint}
            disabled={buttonDisabled}
            whileHover={buttonDisabled ? {} : { scale: 1.03 }}
            whileTap={buttonDisabled ? {} : { scale: 0.97 }}
            className={`w-full py-3.5 px-4 border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg shadow-sm text-base font-medium text-emerald-700 dark:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all flex items-center justify-center hover-3d glass-morphism ${
              buttonDisabled ? 'opacity-70 cursor-not-allowed' : 'hover:bg-emerald-100 dark:hover:bg-emerald-800/40'
            }`}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
            Try Free Demo Ticket
          </motion.button>
        </motion.div>
      ) : isDemoMode ? (
        <motion.button
          onClick={handleMint}
          disabled={buttonDisabled}
          whileHover={buttonDisabled ? {} : { scale: 1.03 }}
          whileTap={buttonDisabled ? {} : { scale: 0.97 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`w-full py-3.5 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all flex items-center justify-center hover-3d ${
            buttonDisabled ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isProcessing || isMinting ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Free Demo Ticket...
            </div>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              Get Free Demo Ticket
            </>
          )}
        </motion.button>
      ) : (
        <div className="space-y-3">
          <motion.button
            onClick={handleMint}
            disabled={buttonDisabled}
            whileHover={buttonDisabled ? {} : { scale: 1.03 }}
            whileTap={buttonDisabled ? {} : { scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`w-full py-3.5 px-4 border border-transparent rounded-lg shadow-lg text-base font-medium text-white bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 hover:from-emerald-700 hover:via-teal-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all flex items-center justify-center hover-3d ${
              buttonDisabled ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isProcessing || isMinting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Minting on Base...
              </div>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                </svg>
                Mint Ticket for 0.0001 ETH
              </>
            )}
          </motion.button>
          
          <div className="text-center">
            <button 
              onClick={() => setIsDemoMode(true)}
              className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline flex items-center mx-auto"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              No ETH? Try a free demo ticket instead
            </button>
          </div>
        </div>
      )}

      <motion.div 
        className="p-3 rounded-lg border border-emerald-100 dark:border-emerald-900 glass-morphism"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-xs text-gray-600 dark:text-gray-300">
          {isDemoMode ? 
            "Demo tickets are for testing only and do not represent real NFTs or event access." :
            "By purchasing this ticket, you agree to our terms and conditions. The NFT will be minted on Base network."}
        </p>
      </motion.div>
    </motion.div>
  );
} 