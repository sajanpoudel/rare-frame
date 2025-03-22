'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { base, baseSepolia, baseGoerli } from 'wagmi/chains';
import { http, createConfig, WagmiProvider } from 'wagmi';
import { RainbowKitProvider, getDefaultConfig, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ClientOnly from './components/ClientOnly';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ["latin"] });

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

// Configure chains for Base networks
const config = getDefaultConfig({
  appName: 'Rare Evo 2025 Tickets',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'a4680c32df51906242872506cafd6e3c',
  chains: [base, baseSepolia, baseGoerli],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
    [baseGoerli.id]: http(),
  },
});

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Function to toggle theme manually
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
    // Save preference to local storage
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    }
  };
  
  // Detect color scheme preference and check for saved preference
  useEffect(() => {
    setMounted(true);
    
    // First check if there's a saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      return;
    }
    
    // Otherwise use system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
    
    // Listen for changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only apply system preference if no saved preference
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Create animated particles for background
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, speed: number, color: string}>>([]);
  
  useEffect(() => {
    // Generate random particles for the background with custom colors
    const colors = isDarkMode 
      ? ['#10b981', '#14b8a6', '#f59e0b', '#f97316', '#059669'] // Dark mode colors
      : ['#10b981', '#14b8a6', '#f59e0b', '#f97316', '#059669']; // Light mode colors
    
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 20 + 10,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    
    setParticles(newParticles);
  }, [isDarkMode]);
  
  // Apply the dark class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-emerald-50 via-teal-50 to-white'} min-h-screen transition-colors duration-200 relative overflow-x-hidden`}>
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {particles.map(particle => (
          <div 
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}rem`,
              height: `${particle.size}rem`,
              backgroundColor: `${particle.color}20`, // Adding transparency
              filter: 'blur(8px)',
              animation: `float ${particle.speed}s infinite ease-in-out ${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* 3D glow orb - Web3 decorative element */}
      <div className="fixed -top-40 -right-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl z-0 animate-float"></div>
      {isDarkMode && <div className="fixed -bottom-32 -left-32 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl z-0 animate-float"></div>}
      
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-[1200px] mx-auto relative z-10">
        <header className="mb-6">
          <nav className="flex justify-between items-center py-3">
            <Link href="/" className={`text-xl font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'} flex items-center transition-colors group`}>
              <div className="relative mr-3 hover-3d perspective-1000 group-hover:scale-110 transition-transform duration-300">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-8 w-8 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'} transition-all duration-300 group-hover:-rotate-12`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                <div className={`absolute inset-0 ${isDarkMode ? 'bg-emerald-500' : 'bg-emerald-400'} blur-lg rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300`}></div>
              </div>
              <span className={`relative ${isDarkMode ? 'neon-text-teal' : ''}`}>
                Rare Evo 2025
                <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-emerald-500 to-amber-300 transition-all duration-300"></span>
              </span>
            </Link>
            
            <div className="flex items-center space-x-6">
              <div className="hidden sm:flex space-x-6">
                <Link href="/" className={`${isDarkMode ? 'text-gray-300 hover:text-emerald-400' : 'text-gray-700 hover:text-emerald-600'} font-medium transition-colors relative group`}>
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-emerald-500 to-transparent transition-all duration-300"></span>
                </Link>
                <Link href="/privacy" className={`${isDarkMode ? 'text-gray-300 hover:text-emerald-400' : 'text-gray-700 hover:text-emerald-600'} font-medium transition-colors relative group`}>
                  Privacy
                  <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-emerald-500 to-transparent transition-all duration-300"></span>
                </Link>
                <Link href="/terms" className={`${isDarkMode ? 'text-gray-300 hover:text-emerald-400' : 'text-gray-700 hover:text-emerald-600'} font-medium transition-colors relative group`}>
                  Terms
                  <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-emerald-500 to-transparent transition-all duration-300"></span>
                </Link>
                <Link href="/support" className={`${isDarkMode ? 'text-gray-300 hover:text-emerald-400' : 'text-gray-700 hover:text-emerald-600'} font-medium transition-colors relative group`}>
                  Support
                  <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-emerald-500 to-transparent transition-all duration-300"></span>
                </Link>
              </div>
              
              {/* Theme toggle button */}
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full hover-3d ${isDarkMode ? 'bg-gray-800 text-amber-300' : 'bg-emerald-100 text-emerald-800'} transition-all duration-300`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </nav>
        </header>
        
        <main className="relative z-10">
          <ClientOnly>
            <QueryClientProvider client={queryClient}>
              <WagmiProvider config={config}>
                <RainbowKitProvider 
                  theme={isDarkMode ? darkTheme({
                    accentColor: '#10b981', // emerald-500
                    accentColorForeground: 'white',
                    borderRadius: 'medium',
                    fontStack: 'system',
                  }) : lightTheme({
                    accentColor: '#10b981', // emerald-500
                    accentColorForeground: 'white',
                    borderRadius: 'medium',
                    fontStack: 'system',
                  })}
                >
                  <div className="animate-fadeIn">
                    {children}
                  </div>
                </RainbowKitProvider>
              </WagmiProvider>
            </QueryClientProvider>
          </ClientOnly>
        </main>
        
        <footer className={`mt-12 pt-6 ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} border-t text-center text-sm relative z-10`}>
          <div className="max-w-4xl mx-auto glass-morphism rounded-xl px-6 py-4 backdrop-blur-sm">
            <p className="mb-2">© 2025 Rare Evo. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-2">
              <Link href="/privacy" className={`${isDarkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-500 hover:text-emerald-600'} transition-colors relative group`}>
                Privacy
                <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-emerald-500 to-transparent transition-all duration-300"></span>
              </Link>
              <Link href="/terms" className={`${isDarkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-500 hover:text-emerald-600'} transition-colors relative group`}>
                Terms
                <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-emerald-500 to-transparent transition-all duration-300"></span>
              </Link>
              <Link href="/support" className={`${isDarkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-500 hover:text-emerald-600'} transition-colors relative group`}>
                Support
                <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-emerald-500 to-transparent transition-all duration-300"></span>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
} 