'use client';
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
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

  return (
    <motion.div
      className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 p-3 sm:p-5">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white">RARE EVO 2025</h2>
          <div className="flex items-center">
            {isDemoTicket ? (
              <motion.div 
                className="bg-purple-500 text-white text-xs sm:text-sm py-1 px-2 sm:px-3 rounded-full flex items-center shadow-md"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <FaBrain className="mr-1" /> DEMO TICKET
              </motion.div>
            ) : (
              <motion.div 
                className={`${
                  isClaimed 
                    ? 'bg-green-500 text-white' 
                    : 'bg-yellow-400 text-gray-800'
                } text-xs sm:text-sm py-1 px-2 sm:px-3 rounded-full flex items-center shadow-md`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
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
          className="bg-white rounded-xl p-2 sm:p-3 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <QRCodeSVG 
              value={walletAddress}
              size={isDemoTicket ? 256 : 288}
              className="w-56 sm:w-72 h-56 sm:h-72 mx-auto"
              includeMargin={true}
              level="H"
              imageSettings={isDemoTicket ? {
                src: "https://img.icons8.com/ios-filled/50/9061F9/demo.png",
                height: 50,
                width: 50,
                excavate: true,
              } : undefined}
            />
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
          </div>
        </motion.div>
      </div>
      
      <div className="p-4 sm:p-6">
        <div className="bg-gray-50 bg-opacity-80 backdrop-blur-sm rounded-xl p-4 mb-4 shadow-sm">
          <div className="grid grid-cols-1 gap-3">
            <div>
              <h3 className="text-sm text-gray-500 uppercase font-medium">Attendee</h3>
              <p className="text-lg font-semibold text-gray-800">{attendeeName}</p>
            </div>
            
            <div>
              <h3 className="text-sm text-gray-500 uppercase font-medium">Company</h3>
              <p className="text-gray-800">{attendeeCompany}</p>
            </div>
            
            <div>
              <h3 className="text-sm text-gray-500 uppercase font-medium">Email</h3>
              <p className="text-gray-800">{attendeeEmail}</p>
            </div>
            
            <div>
              <h3 className="text-sm text-gray-500 uppercase font-medium flex items-center">
                Wallet Address
                {isDemoTicket && <span className="ml-2 text-xs text-purple-600">(Demo)</span>}
              </h3>
              <p className="text-gray-800 font-mono text-sm">{truncateAddress(walletAddress)}</p>
            </div>
          </div>
        </div>
        
        {isDemoTicket ? (
          <motion.div
            className="bg-purple-50 border border-purple-100 rounded-lg p-3 text-sm text-purple-800"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-start">
              <FaBrain className="text-purple-500 mt-0.5 mr-2 flex-shrink-0" />
              <p>
                This is a demo ticket for testing purposes only. It cannot be used for actual event entry.
                <span className="block mt-1 text-xs text-purple-600">
                  Purchase a real ticket to attend RARE EVO 2025
                </span>
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-800"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-start">
              <ShieldCheckIcon className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
              <p>
                This ticket is verified on the Base blockchain. Present this QR code at the event entrance.
                <span className="block mt-1 text-xs text-blue-600">
                  August 6-10, 2025 • Caesar's Palace, Las Vegas
                </span>
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
} 