'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { WagmiConfig, createConfig } from 'wagmi';
import { base, baseGoerli, baseSepolia } from 'wagmi/chains';
import { http } from 'viem';
import { RainbowKitProvider, getDefaultWallets, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ClientOnly from './components/ClientOnly';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ["latin"] });

// Configure chains for Base networks
const chains = [base, baseSepolia, baseGoerli];

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

const { connectors } = getDefaultWallets({
  appName: 'Rare Evo 2025 Tickets',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'a4680c32df51906242872506cafd6e3c',
});

// Create wagmi config with http transport
const wagmiConfig = createConfig({
  chains,
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
    [baseGoerli.id]: http(),
  },
  connectors,
});

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Detect color scheme preference
  useEffect(() => {
    // Check initial preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
    
    // Listen for changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <html lang="en" className={isDarkMode ? 'dark' : ''}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={`${inter.className} ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-white'} min-h-screen transition-colors duration-200`} suppressHydrationWarning={true}>
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-[1200px] mx-auto">
          <header className="mb-6">
            <nav className="flex justify-between items-center py-3">
              <Link href="/" className={`text-xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-800'} flex items-center transition-colors`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                Rare Evo 2025
              </Link>
              <div className="hidden sm:flex space-x-6">
                <Link href="/" className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium transition-colors`}>
                  Home
                </Link>
                <Link href="/privacy" className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium transition-colors`}>
                  Privacy
                </Link>
                <Link href="/terms" className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium transition-colors`}>
                  Terms
                </Link>
                <Link href="/support" className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium transition-colors`}>
                  Support
                </Link>
              </div>
            </nav>
          </header>
          
          <ClientOnly>
            <QueryClientProvider client={queryClient}>
              <WagmiConfig config={wagmiConfig}>
                <RainbowKitProvider 
                  chains={chains} 
                  theme={isDarkMode ? darkTheme({
                    accentColor: '#3b82f6', // blue-500
                    accentColorForeground: 'white',
                    borderRadius: 'medium',
                    fontStack: 'system',
                    overlayBlur: 'small'
                  }) : lightTheme({
                    accentColor: '#3b82f6', // blue-500
                    accentColorForeground: 'white',
                    borderRadius: 'medium',
                    fontStack: 'system',
                    overlayBlur: 'small'
                  })}
                  modalSize="compact"
                >
                  {children}
                </RainbowKitProvider>
              </WagmiConfig>
            </QueryClientProvider>
          </ClientOnly>
          
          <footer className={`mt-12 pt-6 ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} border-t text-center text-sm`}>
            <p>© 2025 Rare Evo. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-2">
              <Link href="/privacy" className={`${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'} transition-colors`}>Privacy</Link>
              <Link href="/terms" className={`${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'} transition-colors`}>Terms</Link>
              <Link href="/support" className={`${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'} transition-colors`}>Support</Link>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
} 