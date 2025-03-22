import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from './ClientLayout';
import { metadata } from './layout.metadata';

const inter = Inter({ subsets: ["latin"] });

// Re-export the metadata from the separate file
export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
