import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { FaGithub, FaTicketAlt, FaWallet } from 'react-icons/fa';
import VerificationSuccess from '../components/VerificationSuccess';

export const metadata: Metadata = {
  title: 'Ticket Scan Successful | Rare Evo 2025',
  description: 'Your ticket has been successfully verified for Rare Evo 2025',
};

export default function ScanSuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Get wallet address from URL query parameters
  const walletAddress = searchParams.wallet as string || 'Unknown';
  
  // Helper function to truncate wallet address
  const truncateAddress = (address: string) => {
    return address.length > 10
      ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
      : address;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 sm:py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm my-8">
      {/* Success animation */}
      <VerificationSuccess />
      
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">Ticket Successfully Verified</h1>
      
      <div className="bg-emerald-50 dark:bg-emerald-900/30 p-6 rounded-xl border border-emerald-100 dark:border-emerald-800 mb-8">
        <div className="flex items-center justify-center mb-4">
          <FaTicketAlt className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Access Granted</h2>
        </div>
        <p className="text-center text-gray-700 dark:text-gray-300 mb-4">
          You have successfully gained access to the RARE EVO 2025 event. 
          Please proceed to the entrance with this verification.
        </p>
        <div className="text-center text-gray-600 dark:text-gray-400 mb-4">
          <p>Event: RARE EVO 2025</p>
          <p>Location: Caesar's Palace, Las Vegas, NV</p>
          <p>Dates: August 6-10, 2025</p>
        </div>
        
        <div className="flex items-center justify-center mt-4 bg-white dark:bg-gray-700 p-3 rounded-lg">
          <FaWallet className="text-amber-600 dark:text-amber-400 mr-2" />
          <span className="font-mono text-sm text-gray-700 dark:text-gray-300">
            Wallet: {truncateAddress(walletAddress)}
          </span>
        </div>
      </div>
      
      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-100 dark:border-amber-800">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">Meet Our Developers</h3>
        
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              This application was developed by Sajan Poudel and Niraj Pandey
            </p>
            
            <a 
              href="https://github.com/sajanpoudel" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
            >
              <FaGithub className="w-5 h-5 mr-2 text-gray-800 dark:text-gray-200" />
              <span className="text-gray-800 dark:text-gray-200">Follow @sajanpoudel on GitHub</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link 
          href="/" 
          className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 flex items-center justify-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Return to Home
        </Link>
      </div>
    </div>
  );
} 