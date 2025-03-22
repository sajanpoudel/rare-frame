import React from 'react';
import Link from 'next/link';
import { FaQuestion, FaTicketAlt, FaWallet, FaEnvelope, FaTwitter, FaDiscord } from 'react-icons/fa';

export default function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 sm:py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm my-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Support Center</h1>
      
      <div className="prose max-w-none">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Welcome to the RARE EVO 2025 support center. We're here to help with any questions or issues you might have regarding your NFT tickets or the event.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-3">What is RARE EVO 2025?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                RARE EVO 2025 is the premier web3 and NFT event taking place August 6-10, 2025 at Caesar's Palace in Las Vegas, NV. The event brings together blockchain enthusiasts, NFT collectors, artists, developers, and industry leaders for panels, workshops, networking, and exclusive experiences.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-3">How do NFT tickets work?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our tickets are blockchain-based NFTs minted on the Base network. When you purchase a ticket, the NFT is sent to your Ethereum wallet. You'll need to register your ticket with your personal information before the event, and present your connected wallet (via QR code) along with identification matching your registration at the event entrance.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-3">What wallet should I use?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We recommend using MetaMask, Coinbase Wallet, or Rainbow for the best experience. Make sure your wallet is compatible with the Base network. If you need help setting up your wallet for Base, please consult our <a href="#" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">wallet setup guide</a>.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-3">Can I try the app without purchasing?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Yes! We offer a Demo Mode that allows you to experience our ticket management system without spending any ETH. Demo tickets are for testing purposes only and cannot be used for event access. Look for the "Try Free Demo Ticket" button in the purchase section.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-3">Can I transfer or sell my ticket?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                NFT tickets can be transferred or sold on secondary markets until they are claimed and registered with attendee information. Once registered, tickets become non-transferable to ensure security and prevent unauthorized reselling.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-3">What if I can't attend after purchasing?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                All sales are final, but if you haven't registered your ticket yet, you may transfer or sell it to another person. If the event is canceled or postponed, please refer to our Terms and Conditions regarding our refund policy.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Common Issues & Troubleshooting</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-stone-50 dark:bg-gray-700 p-6 rounded-lg border border-stone-200 dark:border-gray-600">
              <div className="flex items-center mb-4">
                <FaTicketAlt className="text-amber-600 dark:text-amber-400 text-xl mr-3" />
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">Ticket Not Showing</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                If your ticket isn't appearing after purchase, try these steps:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Verify the transaction was successful on the blockchain</li>
                  <li>Make sure you're connected with the correct wallet</li>
                  <li>Check that your wallet is connected to the Base network</li>
                  <li>Try refreshing your browser or reopening the app</li>
                </ul>
              </p>
            </div>
            
            <div className="bg-stone-50 dark:bg-gray-700 p-6 rounded-lg border border-stone-200 dark:border-gray-600">
              <div className="flex items-center mb-4">
                <FaWallet className="text-amber-600 dark:text-amber-400 text-xl mr-3" />
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">Wallet Connection</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Having trouble connecting your wallet?
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Make sure your browser extension is updated</li>
                  <li>Try disconnecting and reconnecting</li>
                  <li>Clear your browser cache</li>
                  <li>Ensure you've approved the connection request</li>
                </ul>
              </p>
            </div>
            
            <div className="bg-stone-50 dark:bg-gray-700 p-6 rounded-lg border border-stone-200 dark:border-gray-600">
              <div className="flex items-center mb-4">
                <FaQuestion className="text-amber-600 dark:text-amber-400 text-xl mr-3" />
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">Registration Issues</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                If you're having trouble registering your ticket:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Check that all required fields are filled in correctly</li>
                  <li>Ensure your email format is valid</li>
                  <li>Verify you're connected with the wallet that owns the ticket</li>
                  <li>Try using a different browser if the issue persists</li>
                </ul>
              </p>
            </div>
            
            <div className="bg-stone-50 dark:bg-gray-700 p-6 rounded-lg border border-stone-200 dark:border-gray-600">
              <div className="flex items-center mb-4">
                <FaTicketAlt className="text-amber-600 dark:text-amber-400 text-xl mr-3" />
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">QR Code Issues</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                If your QR code isn't displaying correctly:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Ensure your ticket is fully registered</li>
                  <li>Check that you're connected with the correct wallet</li>
                  <li>Try zooming in on the QR code for better visibility</li>
                  <li>If the QR code appears pixelated, try a device with a higher resolution screen</li>
                </ul>
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Contact Support</h2>
          
          <div className="bg-gradient-to-br from-amber-50 to-stone-100 dark:from-gray-800 dark:to-zinc-900 p-8 rounded-xl border border-stone-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Can't find the answer you're looking for? Our support team is here to help. Please reach out to us using one of the following methods:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="bg-white dark:bg-gray-700 p-3 rounded-full shadow-sm mr-4">
                  <FaEnvelope className="text-amber-600 dark:text-amber-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Email Support</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-1">For general inquiries:</p>
                  <a href="mailto:support@rareevo.io" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">support@rareevo.io</a>
                  <p className="text-gray-700 dark:text-gray-300 mt-3 mb-1">For technical issues:</p>
                  <a href="mailto:tech@rareevo.io" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">tech@rareevo.io</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white dark:bg-gray-700 p-3 rounded-full shadow-sm mr-4">
                  <FaDiscord className="text-amber-600 dark:text-amber-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Community Support</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">Join our Discord server for real-time support from our team and community members.</p>
                  <a href="https://discord.gg/rareevo" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">Join Discord</a>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-stone-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">Response Time</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We aim to respond to all inquiries within 24-48 hours during business days. For urgent matters related to event access, please indicate "URGENT" in your subject line.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Event Information</h2>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-3">RARE EVO 2025</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong className="text-gray-800 dark:text-gray-200">Dates:</strong> August 6-10, 2025</li>
              <li><strong className="text-gray-800 dark:text-gray-200">Location:</strong> Caesar's Palace, Las Vegas, NV</li>
              <li><strong className="text-gray-800 dark:text-gray-200">Check-in Hours:</strong> 8:00 AM - 6:00 PM daily</li>
              <li><strong className="text-gray-800 dark:text-gray-200">Age Requirement:</strong> 21+ (valid ID required)</li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://twitter.com/rareevoofficial" className="text-gray-700 hover:text-amber-600 dark:text-amber-400 transition duration-200">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="https://discord.gg/rareevo" className="text-gray-700 hover:text-amber-600 dark:text-amber-400 transition duration-200">
                  <FaDiscord className="text-xl" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <Link href="/" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 mb-3 sm:mb-0 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back to Home
              </Link>
              
              <div className="flex space-x-6">
                <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">Privacy Policy</Link>
                <Link href="/terms" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">Terms &amp; Conditions</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 