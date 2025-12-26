import { css } from 'styled-components';

const variables = css`
  :root {
    /* Soft pastel color palette */
    --cream: #f9f8f6;
    --cream-light: #fdfcfb;
    --cream-dark: #f0eeeb;

    /* Background colors */
    --dark-navy: #fdfcfb;
    --navy: #f9f8f6;
    --light-navy: #f0eeeb;
    --lightest-navy: #e8e5e0;
    --navy-shadow: rgba(45, 90, 74, 0.08);

    /* Text colors */
    --dark-slate: #9a9590;
    --slate: #6b6560;
    --light-slate: #4a4540;
    --lightest-slate: #2a2520;
    --white: #1a1510;

    /* Accent colors - Deep forest green & dusty rose */
    --green: #2d5a4a;
    --green-light: #3d7a64;
    --green-tint: rgba(45, 90, 74, 0.1);
    --rose: #c4a3a3;
    --rose-light: #d4b8b8;
    --rose-tint: rgba(196, 163, 163, 0.2);
    --pink: #c4a3a3;
    --blue: #2d5a4a;

    /* Project card colors */
    --card-green: #d4e4db;
    --card-rose: #e8dede;
    --card-cream: #f5f2ed;
    --card-sage: #dce5dc;

    /* Fonts */
    --font-sans: 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui, sans-serif;
    --font-serif: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    /* Font sizes */
    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;
    --fz-display: clamp(48px, 10vw, 120px);

    /* Border radius - more rounded for soft aesthetic */
    --border-radius: 12px;
    --border-radius-sm: 8px;
    --border-radius-lg: 20px;
    --border-radius-xl: 30px;

    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition-slow: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;
