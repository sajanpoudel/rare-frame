import { Metadata } from 'next';
import { FrameContainer } from './components/FrameContainer';
import Link from 'next/link';
import { FaTicketAlt, FaShieldAlt, FaWallet, FaUserCheck, FaChartLine, FaQuestion } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Rare Evo 2025 NFT Tickets',
  description: 'Mint, register, and manage your Rare Evo 2025 NFT tickets',
  openGraph: {
    title: 'Rare Evo 2025 NFT Tickets',
    description: 'Mint, register, and manage your Rare Evo 2025 NFT tickets',
    images: ['https://rareevo.io/og-image.jpg'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://rareevo.io/og-image.jpg',
    'fc:frame:button:1': 'Mint New Ticket',
    'fc:frame:button:2': 'Register Ticket',
    'fc:frame:button:3': 'View My Ticket',
    'fc:frame:post_url': process.env.NEXT_PUBLIC_FRAME_API_URL || 'https://your-domain.com/api/frame',
    'fc:frame:aspect_ratio': '1.91:1',
    'fc:frame:input:text': 'Enter your wallet address to check your ticket',
  },
};

export default function Home() {
  return (
    <>
      <div className="mb-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-800 p-8 md:p-10 text-white shadow-xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-500/30 to-blue-400/20 rounded-full -mr-10 -mt-10 blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-indigo-700/30 to-blue-500/20 rounded-full -ml-16 -mb-16 blur-xl"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">RARE EVO 2025</h1>
            <h2 className="text-xl md:text-2xl font-semibold mb-6">NFT Ticket Management System</h2>
            <p className="text-lg opacity-90 mb-8">
              Welcome to the official ticket platform for RARE EVO 2025 — the premier web3 and NFT event taking place August 6-10, 2025 at Caesar's Palace in Las Vegas, NV.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#ticket-management" className="bg-white text-blue-700 hover:text-blue-800 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200 flex items-center">
                <FaTicketAlt className="mr-2" />
                Get Started
              </a>
              <Link href="/support" className="bg-blue-600 text-white hover:bg-blue-700 font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200 flex items-center">
                <FaQuestion className="mr-2" />
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="my-16 px-4 sm:px-0">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">About RARE EVO 2025</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Experience the future of event ticketing with our NFT-powered ticketing system.
          Enjoy enhanced security, verified ownership, and a seamless experience from purchase to event entry.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition duration-200">
            <div className="text-blue-600 mb-4">
              <FaTicketAlt className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">NFT Tickets</h3>
            <p className="text-gray-600">
              Securely mint your ticket as an NFT on the Base network. Each ticket is a unique digital asset that provides verified access to RARE EVO 2025.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition duration-200">
            <div className="text-blue-600 mb-4">
              <FaShieldAlt className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Blockchain Security</h3>
            <p className="text-gray-600">
              Prevent counterfeiting and unauthorized transfers with blockchain verification. Your ticket ownership is securely recorded on the Base network.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition duration-200">
            <div className="text-blue-600 mb-4">
              <FaUserCheck className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Registration</h3>
            <p className="text-gray-600">
              Register your information securely to link your identity to your NFT ticket, ensuring a smooth check-in process at the event.
            </p>
          </div>
        </div>
      </div>
      
      <div id="ticket-management" className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Ticket Management System</h2>
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
            <FrameContainer />
          </div>
        </div>
      </div>
      
      <div className="my-16 px-4 sm:px-0">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Features & Benefits</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaWallet className="text-blue-600 mr-2" />
              Demo Mode For First-time Users
            </h3>
            <p className="text-gray-600 mb-4">
              Try our system without any ETH! Our Demo Mode allows you to experience the full ticketing process with no blockchain transaction costs.
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Mint a demo ticket without ETH</li>
              <li>Experience the registration process</li>
              <li>View and test the QR code display</li>
              <li>Perfect for first-time users and testing</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaTicketAlt className="text-blue-600 mr-2" />
              Enhanced Ticket Display
            </h3>
            <p className="text-gray-600 mb-4">
              Our ticket view features a large, prominent QR code for easy scanning at the event entrance, along with all your essential attendee information.
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Large, easy-to-scan QR code</li>
              <li>Clear status indicators (Claimed/Unclaimed)</li>
              <li>Important attendee details</li>
              <li>Truncated wallet address for security</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaChartLine className="text-blue-600 mr-2" />
              Responsive Design
            </h3>
            <p className="text-gray-600 mb-4">
              Access your tickets from any device with our fully responsive design that looks great on desktops, tablets, and mobile phones.
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Optimized for all screen sizes</li>
              <li>Consistent experience across devices</li>
              <li>Smooth animations and transitions</li>
              <li>Accessible and user-friendly interface</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaShieldAlt className="text-blue-600 mr-2" />
              Privacy & Security
            </h3>
            <p className="text-gray-600 mb-4">
              Your data security is our priority. We use blockchain technology to ensure ticket authenticity while protecting your personal information.
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Comprehensive privacy policy</li>
              <li>Secure registration process</li>
              <li>Verified ticket ownership</li>
              <li>Transparent terms and conditions</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="my-16 bg-gradient-to-br from-blue-700 to-indigo-800 text-white rounded-2xl p-8 md:p-12 max-w-5xl mx-auto text-center shadow-xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for RARE EVO 2025?</h2>
        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Secure your spot at the premier web3 event of the year. Mint your NFT ticket today or try our demo mode to experience the system.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#ticket-management" className="bg-white text-blue-700 hover:text-blue-800 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200">
            Mint Your Ticket
          </a>
          <Link href="/support" className="bg-blue-600 border border-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200">
            Get Support
          </Link>
        </div>
      </div>
    </>
  );
}
