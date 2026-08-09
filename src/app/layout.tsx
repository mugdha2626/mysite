import type { Metadata } from 'next';
import { sans } from './fonts';
import Dock from '@/components/Dock/Dock';
import './globals.css';

// Runs before paint so there's no flash of the wrong theme.
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='dark';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;

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
    <html lang="en" className={sans.variable} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        {children}
        <Dock />
      </body>
    </html>
  );
}
