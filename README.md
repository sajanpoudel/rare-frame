# RARE EVO 2025 NFT Ticket Management System

Visit here: https://rare-frame.vercel.app/ 

A modern, user-friendly NFT ticket management system built for the RARE EVO 2025 event, allowing attendees to mint, register, and manage their blockchain-based event tickets.

## 🎫 Overview

RARE EVO 2025 Ticket Management System is a decentralized application that leverages blockchain technology to provide secure, verifiable event tickets as NFTs on the Base network. This system offers an intuitive interface for potential attendees to purchase tickets, register their information, and access their ticket QR codes for event entry.

## ✨ Features

### Core Functionality

- **NFT Ticket Minting**: Purchase event tickets as NFTs on the Base network
- **Ticket Registration**: Associate personal information with purchased tickets
- **Ticket Viewing**: View ticket details and QR code for event entry
- **Demo Mode**: Try the system without spending real ETH (perfect for first-time users)
- **Wallet Integration**: Seamless connection with popular Ethereum wallets

### Enhanced User Experience

- **Large QR Code Display**: Prominent, easy-to-scan QR codes for smooth check-in
- **Responsive Design**: Optimized for all devices from desktop to mobile
- **Interactive Elements**: Smooth animations and visual feedback throughout the user journey
- **Status Indicators**: Clear visual cues for ticket status (claimed/unclaimed)
- **Configurable Avatar**: Customize your attendee profile with an avatar

### Design & Visual Elements

- **Modern UI**: Clean, professional interface with consistent design language
- **Animated Components**: Subtle animations for improved user engagement
- **Gradient Backgrounds**: Visually appealing color schemes throughout the application
- **Celebration Effects**: Confetti animation on successful actions
- **Branded Experience**: Cohesive visual identity matching the RARE EVO brand

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn
- MetaMask or another Ethereum-compatible wallet

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rareevo/ticket-management.git
   cd ticket-management
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add the following variables:
     ```
     NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
     NEXT_PUBLIC_FRAME_API_URL=your_frame_api_url
     ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## 🧠 Demo Mode

For users who want to try the system without connecting a wallet or spending ETH, our Demo Mode offers a risk-free way to experience the full ticket lifecycle:

1. Click the "Try Free Demo Ticket" button in the purchase section
2. Experience the registration process with a virtual ticket
3. View the demo ticket with all features available
4. Practice the full event entry workflow

*Note: Demo tickets cannot be used for actual event entry and don't represent real blockchain assets.*

## 🔒 Security & Privacy

- **Blockchain Verification**: Tickets are verified on the Base network, preventing counterfeiting
- **Non-transferable Registration**: Once registered, tickets are linked to specific identities
- **Secure Wallet Connection**: Industry-standard wallet connection methods
- **Privacy Policy**: Comprehensive data handling practices outlined in our Privacy Policy
- **Terms & Conditions**: Clear terms of service for all users

## 📱 Mobile Experience

Our application is fully responsive and optimized for mobile devices:

- **Adaptive Layout**: Content adjusts to screen size for optimal viewing
- **Touch-Friendly Interface**: Large tap targets and intuitive gestures
- **Offline Support**: Basic functionality available even with intermittent connectivity
- **Mobile Wallet Integration**: Seamless connection with mobile wallet apps

## 👨‍💻 Development Resources

### Technology Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Web3 Integration**: wagmi, viem, RainbowKit
- **Blockchain**: Base Network (Ethereum L2)
- **APIs**: RESTful services for ticket management

### Project Structure

```
rare-frame/
├── app/                 # Next.js app directory
│   ├── components/      # React components
│   ├── privacy/         # Privacy policy page
│   ├── support/         # Support page
│   ├── terms/           # Terms and conditions page
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Home page
├── public/              # Static assets
├── node_modules/        # Dependencies
├── .env.local           # Environment variables (create this)
├── package.json         # Project configuration
└── README.md            # Project documentation
```

### Key Components

- **FrameContainer**: Main container component that manages application state
- **BuyTicket**: Component for purchasing/minting NFT tickets
- **RegistrationForm**: Form for registering attendee information
- **TicketView**: Component for displaying ticket details and QR code

## 🤝 Support

If you encounter any issues or have questions about the NFT Ticket Management System:

- Visit our [Support Page](/support) for FAQs and troubleshooting guides
- Contact us at support@rareevo.io for technical assistance
- Join our Discord community for real-time support from our team and other users

## 📝 Legal

- [Privacy Policy](/privacy)
- [Terms and Conditions](/terms)

## 📅 RARE EVO 2025 Event Information

- **Dates**: August 6-10, 2025
- **Location**: Caesar's Palace, Las Vegas, NV
- **Age Requirement**: 21+ (valid ID required)
- **Website**: [rareevo.io](https://rareevo.io)

## 🙏 Acknowledgements

- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [RainbowKit](https://www.rainbowkit.com/)
- [Wagmi](https://wagmi.sh/)
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Base Network](https://base.org/)

---

© 2025 Rare Network LLC (dba RARE EVO). All rights reserved.
# RARE_FRAME

## Smart contract tests

The contract lives in `contracts/RareEvoTicket.sol`. Run its tests with Hardhat:

```
npm run test:contracts
```

Copy `.env.example` to `.env` before deploying (`PRIVATE_KEY` is only needed for `deploy:*` and `verify`).
