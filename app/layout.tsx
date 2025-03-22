import type { Metadata } from 'next';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: 'Rare Evo 2025 - NFT Ticket Management',
  description: 'NFT ticket management system for Rare Evo 2025 conference',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientLayout>{children}</ClientLayout>
  );
}
