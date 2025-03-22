import { Metadata } from 'next';

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