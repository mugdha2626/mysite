import type { Metadata } from 'next';
import { sans } from './fonts';
import Dock from '@/components/Dock/Dock';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://mugdhapatil.com'),
  title: {
    default: 'Mugdha Patil - building fintech, DeFi rails & trading systems',
    template: '%s · Mugdha Patil',
  },
  description:
    'CS student at Purdue building at the intersection of fintech, blockchain, and AI/ML - from on-chain trading systems to full-stack products.',
  openGraph: {
    title: 'Mugdha Patil',
    description:
      'Building at the intersection of fintech, blockchain, and AI/ML.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={sans.variable}>
      <body>
        {children}
        <Dock />
      </body>
    </html>
  );
}
