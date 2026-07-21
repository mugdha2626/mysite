import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';

// Body / UI - clean, neutral, workhorse sans.
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

// Editorial display - warm, characterful serif with gorgeous italics.
export const playfair = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-serif',
});

// Technical mono - the console, ticker, and all numerals.
export const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

// Mugdha's own handwriting - used sparingly, as a signature accent.
export const handwriting = localFont({
  src: [{ path: '../fonts/Myfont-Regular.otf', weight: '400', style: 'normal' }],
  display: 'swap',
  variable: '--font-hand',
});
