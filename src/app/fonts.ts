import { DM_Sans } from 'next/font/google';

// One typeface for the whole app. DM Sans: clean, modern, real italics,
// tabular figures. Mapped to every font slot in globals.css.
export const sans = DM_Sans({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-sans',
});
