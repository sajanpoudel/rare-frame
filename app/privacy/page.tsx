import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 sm:py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm my-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Privacy Policy</h1>
      
      <div className="prose max-w-none">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Last Updated: July 1, 2024
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">1. Introduction</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Welcome to RARE EVO 2025. This Privacy Policy explains how your personal information is collected, used, and disclosed by Rare Network LLC ("we," "our," or "us") when you use our NFT ticket management application, website (rareevo.io), and services related to the RARE EVO 2025 event taking place August 6-10, 2025 in Las Vegas, NV.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            By accessing or using our Services, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">2. Information We Collect</h2>
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-3">2.1 Personal Information</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            When you use our Services, we may collect the following personal information:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Name and contact information (email address, phone number)</li>
            <li>Company or organization affiliation</li>
            <li>Wallet address and blockchain transaction information</li>
            <li>Information related to your NFT tickets (GA, VIP, or WHALE PASS)</li>
            <li>Payment information when purchasing tickets or merchandise</li>
            <li>Profile information and preferences for event participation</li>
            <li>Information provided when contacting customer support</li>
          </ul>

          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-3">2.2 Usage Data</h3>
          <p className="text-gray-700 dark:text-gray-300">
            We collect information about how you interact with our Services, including your IP address, browser type, pages visited, time spent on pages, links clicked, and information about your device. When you connect your wallet, we may collect public blockchain data like your wallet address and transaction history related to our smart contracts.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">3. How We Use Your Information</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Provide and operate our Services, including ticket issuance and validation</li>
            <li>Process transactions and fulfill ticket purchases</li>
            <li>Manage your registration for RARE EVO 2025</li>
            <li>Personalize your experience with appropriate content and offerings</li>
            <li>Communicate with you about the event, including updates, schedule changes, and important information</li>
            <li>Manage entry to the event and verify ticket ownership</li>
            <li>Provide customer support and respond to inquiries</li>
            <li>Enforce our terms, conditions, and policies</li>
            <li>Improve and optimize our Services and event experience</li>
            <li>Protect against unauthorized access and fraudulent activity</li>
            <li>Comply with applicable laws and regulations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">4. Blockchain Data and NFT Tickets</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            RARE EVO 2025 utilizes blockchain technology for NFT tickets. Due to the nature of blockchain technology, certain information related to your NFT tickets (such as wallet addresses and transaction details) is stored on public blockchains (including Base Network) and is inherently public and transparent.
          </p>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            When you mint an NFT ticket (GA, VIP, or WHALE PASS), transaction information is recorded on the blockchain. This information is immutable and cannot be deleted. However, personal information associated with ticket registration is stored off-chain in our secure databases.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            NFT ticket holders may receive exclusive benefits including entry to special events, merchandise, and other perks as described in our ticket offerings. Your participation in these activities may involve processing additional personal information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">5. Data Sharing and Disclosure</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">We may share your personal information in the following situations:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong className="text-gray-800 dark:text-gray-200">Event Partners and Sponsors:</strong> We may share attendee information with trusted partners and sponsors of RARE EVO 2025 to facilitate event activities, with your consent.</li>
            <li><strong className="text-gray-800 dark:text-gray-200">Service Providers:</strong> We work with third-party vendors who provide services such as payment processing, data analysis, email delivery, hosting, and customer service.</li>
            <li><strong className="text-gray-800 dark:text-gray-200">Caesar's Palace and Venue Partners:</strong> To facilitate hotel bookings and venue access for the event in Las Vegas.</li>
            <li><strong className="text-gray-800 dark:text-gray-200">Legal Compliance:</strong> We may disclose your information where required by law, such as to comply with a subpoena or similar legal process.</li>
            <li><strong className="text-gray-800 dark:text-gray-200">Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
            <li><strong className="text-gray-800 dark:text-gray-200">With Your Consent:</strong> We may share your information for other purposes with your explicit consent.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">6. Your Rights and Choices</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Depending on your location, you may have certain rights regarding your personal information:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Access, correct, or delete the personal information we have about you</li>
            <li>Object to or restrict the processing of your personal information</li>
            <li>Data portability (receiving your data in a structured, commonly used format)</li>
            <li>Withdraw consent where processing is based on consent</li>
            <li>Opt-out of marketing communications</li>
          </ul>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            For European users, please note that we process personal data in accordance with the GDPR. For California residents, we comply with the California Consumer Privacy Act (CCPA).
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            To exercise these rights, please contact us at <a href="mailto:privacy@rareevo.io" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">privacy@rareevo.io</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">7. Security and Data Retention</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            We retain your information for as long as necessary to provide our Services, comply with legal obligations, resolve disputes, and enforce our agreements. For NFT ticket holders, certain information may be retained indefinitely due to the permanent nature of blockchain technology.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">8. Children's Privacy</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Our Services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe we have collected information from your child, please contact us immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">9. International Data Transfers</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Your information may be transferred to, and maintained on, computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. If you are located outside the United States and choose to provide information to us, please note that we transfer the information to the United States and process it there.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">10. Changes to This Privacy Policy</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We may update our Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">11. Contact Us</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            If you have any questions about this Privacy Policy or our data practices, please contact us at:
          </p>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            <strong className="text-gray-800 dark:text-gray-200">Email:</strong> <a href="mailto:privacy@rareevo.io" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">privacy@rareevo.io</a><br />
            <strong className="text-gray-800 dark:text-gray-200">Address:</strong> Rare Network LLC, Las Vegas, NV
          </p>
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <Link href="/" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 mb-3 sm:mb-0 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back to Home
              </Link>
              
              <div className="flex space-x-6">
                <Link href="/terms" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">Terms & Conditions</Link>
                <Link href="/support" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">Support</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 