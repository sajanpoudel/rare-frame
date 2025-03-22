import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 sm:py-12 bg-white rounded-xl shadow-sm my-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>
      
      <div className="prose prose-blue max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Last Updated: July 1, 2024
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Agreement to Terms</h2>
          <p className="mb-4">
            These Terms and Conditions constitute a legally binding agreement made between you and Rare Network LLC, doing business as RARE EVO ("we," "us," or "our"), concerning your access to and use of the RARE EVO 2025 NFT ticket management application, website (rareevo.io), and services related to the RARE EVO 2025 event taking place August 6-10, 2025 in Las Vegas, NV.
          </p>
          <p className="mb-4">
            By accessing or using our Services, you agree that you have read, understood, and agree to be bound by all of these Terms and Conditions. If you do not agree with all of these Terms and Conditions, you are prohibited from using the Services and must discontinue use immediately.
          </p>
          <p>
            We reserve the right to make changes to these Terms and Conditions at any time. We will alert you about any changes by updating the "Last Updated" date. Any changes or modifications will be effective immediately upon posting the updated Terms and Conditions. You waive any right you may have to receive specific notice of such changes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. NFT Tickets and Event Access</h2>
          <p className="mb-4">
            RARE EVO 2025 offers digital tickets in the form of non-fungible tokens (NFTs) that provide access to our event held at Caesar's Palace, Las Vegas from August 6-10, 2025. We offer three tiers of tickets: General Admission (GA), VIP, and WHALE PASS, each with specific benefits as described on our website.
          </p>
          <h3 className="text-xl font-medium text-gray-700 mb-3">2.1 Ticket Ownership Rights</h3>
          <p className="mb-4">
            NFT tickets are stored on the blockchain and represent a digital ownership right to access the event. When you purchase an NFT ticket, you own the NFT itself, but RARE EVO retains ownership of all intellectual property rights associated with the event, artwork, designs, and content associated with the ticket.
          </p>
          <h3 className="text-xl font-medium text-gray-700 mb-3">2.2 License</h3>
          <p className="mb-4">
            By purchasing an NFT ticket, RARE EVO grants you a limited, non-exclusive, non-transferable, revocable license to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Access and attend the RARE EVO 2025 event as specified for your ticket tier</li>
            <li>Participate in activities specified for your ticket level</li>
            <li>Receive benefits associated with your ticket tier</li>
            <li>Display your ticket for personal, non-commercial use</li>
          </ul>
          <h3 className="text-xl font-medium text-gray-700 mb-3">2.3 Ticket Transfer and Resale Policies</h3>
          <p>
            NFT tickets may be transferred or sold on secondary markets until they are claimed and registered to a specific individual. Once a ticket is registered with attendee information, it becomes non-transferable. RARE EVO reserves the right to invalidate tickets that are found to be sold at excessive markups or through unauthorized channels.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. RarePerks Loyalty Program</h2>
          <p className="mb-4">
            RARE EVO 2025 ticket holders may be eligible to participate in our RarePerks loyalty program. RarePerks members earn points by participating in event activities, engaging with sponsors, and completing certain actions. These points can be redeemed for exclusive merchandise, experiences, and other benefits.
          </p>
          <p className="mb-4">
            Participation in RarePerks is subject to additional terms and conditions. Points have no monetary value and cannot be transferred, sold, or exchanged for cash. RARE EVO reserves the right to modify, suspend, or terminate the RarePerks program at any time.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. User Representations and Age Requirements</h2>
          <p className="mb-4">By using the Services, you represent and warrant that:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>You are at least 21 years of age (required for event attendance)</li>
            <li>You have the legal capacity to enter into these Terms and Conditions</li>
            <li>You have not been previously suspended or removed from our Services</li>
            <li>You will not access the Services through automated or non-human means</li>
            <li>You will not use the Services for any illegal or unauthorized purpose</li>
            <li>You understand the inherent risks associated with blockchain technology, cryptocurrencies, and NFTs</li>
            <li>You are solely responsible for the security of your wallet and private keys</li>
          </ul>
          <p>
            RARE EVO 2025 is an event for adults aged 21 and older. Valid government-issued photo identification will be required to enter the event, and attendee information must match the registered ticket.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Purchases and Payment</h2>
          <p className="mb-4">
            NFT tickets are priced as follows:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>General Admission (GA):</strong> 0.0001 ETH</li>
            <li><strong>VIP:</strong> 0.3 ETH</li>
            <li><strong>WHALE PASS:</strong> 1.0 ETH</li>
          </ul>
          <p className="mb-4">
            All tickets must be purchased using cryptocurrency through an Ethereum-compatible wallet on the Base network. All sales are final and non-refundable unless otherwise required by law.
          </p>
          <p className="mb-4">
            You acknowledge that blockchain transactions are irreversible and RARE EVO has no ability to reverse any transactions or recover cryptocurrency sent to incorrect addresses.
          </p>
          <p>
            Gas fees for on-chain transactions are not included in the ticket price and must be paid by the purchaser. Prices are subject to change, and RARE EVO may offer promotional discounts or early bird pricing at its discretion.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Demo Mode and Free Trials</h2>
          <p className="mb-4">
            Our Services may provide a "Demo Mode" or free trial option that allows users to experience the features without conducting actual blockchain transactions or purchasing real NFT tickets.
          </p>
          <p className="mb-4">
            Demo tickets and free trials are for testing and educational purposes only and do not grant any rights to attend the RARE EVO 2025 event or claim any real NFT assets. Demo tickets have no monetary value and cannot be converted to real tickets.
          </p>
          <p>
            RARE EVO reserves the right to modify or terminate any demo or free trial offer at any time without notice. We may also impose usage or other limitations on demo features.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Event Policies and Attendee Conduct</h2>
          <p className="mb-4">
            Admission to the RARE EVO 2025 event requires:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>A verified NFT ticket in your registered wallet</li>
            <li>Valid government-issued photo ID matching the registered name</li>
            <li>Compliance with all event rules, venue policies, and applicable laws</li>
            <li>Adherence to our Code of Conduct (available on our website)</li>
          </ul>
          <p className="mb-4">
            RARE EVO and Caesar's Palace reserve the right to refuse admission or remove any person from the event for any reason, including but not limited to disruptive behavior, violation of these Terms, intoxication, or failure to comply with staff instructions.
          </p>
          <p>
            Professional photography and recording equipment are prohibited without prior written permission. By attending the event, you consent to being photographed, filmed, and recorded, and grant RARE EVO the right to use your likeness in promotional materials.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Intellectual Property Rights</h2>
          <p className="mb-4">
            All content on our Services, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software, is the property of RARE EVO or its content suppliers and is protected by international copyright, trademark, and other intellectual property laws.
          </p>
          <p>
            The RARE EVO name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of RARE EVO or its affiliates. You may not use these marks without our prior written permission. All other names, logos, product and service names, designs, and slogans on our Services are the trademarks of their respective owners.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Cancellation and Force Majeure</h2>
          <p className="mb-4">
            In the event that RARE EVO 2025 is postponed for any reason, your ticket will be valid for the rescheduled date. If the event is canceled entirely, RARE EVO will provide reasonable compensation or alternative benefits to ticket holders.
          </p>
          <p>
            RARE EVO shall not be liable or responsible for any failure to perform, or delay in performance of, any of our obligations that is caused by events outside our reasonable control (Force Majeure Event), including but not limited to natural disasters, acts of government, pandemics, technical failures, or venue unavailability.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Limitation of Liability</h2>
          <p className="mb-4">
            To the maximum extent permitted by law, in no event shall RARE EVO or its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Your access to or use of or inability to access or use the Services</li>
            <li>Any conduct or content of any third party at the event or on our Services</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            <li>Blockchain network failures or cryptocurrency price volatility</li>
            <li>Any personal injury, property damage, or losses occurring at the event</li>
          </ul>
          <p>
            Our total liability to you for any claim arising out of or relating to these Terms or our Services shall not exceed the amount you paid for your NFT ticket.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Dispute Resolution</h2>
          <p className="mb-4">
            Any dispute arising from these Terms and Conditions or your use of our Services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall be conducted in Las Vegas, Nevada.
          </p>
          <p>
            You agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated, or representative action. If for any reason a claim proceeds in court rather than in arbitration, you waive any right to a jury trial.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms and Conditions, please contact us at:
          </p>
          <p className="mt-2">
            <strong>Email:</strong> <a href="mailto:legal@rareevo.io" className="text-blue-600 hover:text-blue-800">legal@rareevo.io</a><br />
            <strong>Address:</strong> Rare Network LLC, Las Vegas, NV
          </p>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <Link href="/" className="text-blue-600 hover:text-blue-800 mb-3 sm:mb-0 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back to Home
              </Link>
              
              <div className="flex space-x-6">
                <Link href="/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</Link>
                <Link href="/support" className="text-blue-600 hover:text-blue-800">Support</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 