/*
 * Mugdha's experience, newest first. Kept in sync with the resume.
 */
export type Role = {
  id: string;
  company: string;
  role: string;
  range: string;
  year: string;
  location: string;
  url: string;
  bullets: string[];
  tech?: string[];
};

export const ROLES: Role[] = [
  {
    id: 'ellipsis',
    company: 'Ellipsis Labs',
    role: 'Software Engineering Intern',
    range: 'May 2026 - Present',
    year: '2026',
    location: 'New York, NY',
    url: 'https://www.ellipsislabs.xyz/',
    bullets: [
      'Lead product engineer on Phoenix-O1, a binary-outcome prediction market on Solana’s crankless on-chain order book. Built order entry against a live price-time-priority book: streams depth over WebSocket, previews fill price and slippage before signing, and reconciles optimistic state against on-chain settlement.',
      'Wrote a Rust market maker quoting two-sided across 8+ live markets, computing fair value and quoting around an inventory-skewed reservation price that widens with realized volatility.',
    ],
    tech: ['Rust', 'Solana', 'WebSocket'],
  },
  {
    id: 'aptos',
    company: 'Aptos Labs',
    role: 'Software Engineering Intern',
    range: 'Jan - May 2026',
    year: '2026',
    location: 'Palo Alto, CA',
    url: 'https://aptoslabs.com',
    bullets: [
      'Sole engineer on the Points Rewards system for Decibel, Aptos’s perpetual futures DEX: designed the accrual model, built the backend, and shipped to production. Live with 10,000+ traders.',
      'Built the Rust indexer consuming fills and funding events to attribute points per trade, sustaining 2.4M events/day.',
      'Cut leaderboard p99 from 840ms to 11ms by replacing the full-table rank scan with an incrementally refreshed rank table.',
    ],
    tech: ['Rust', 'PostgreSQL', 'SQL'],
  },
  {
    id: 'boiler',
    company: 'Boiler Blockchain',
    role: 'Head of Development',
    range: 'Jun 2025 - Present',
    year: '2025',
    location: 'West Lafayette, IN',
    url: 'https://boilerblockchain.org',
    bullets: [
      'Lead a 60+ developer team to 8+ hackathon wins and partner collaborations.',
      'Secured $15,000+ in grants and bounties from three companies.',
    ],
    tech: ['Solana', 'EigenLayer', 'Solidity'],
  },
  {
    id: 'stax',
    company: 'Stax Trading',
    role: 'Co-Founder & Developer',
    range: 'May 2025 - Present',
    year: '2025',
    location: 'West Lafayette, IN',
    url: 'https://www.stax.so',
    bullets: [
      'Built a real-time crypto trading simulator with leverage, portfolios, and tournaments, and onboarded 14+ university blockchain clubs as paying customers.',
      'Normalized order-book data from 4 exchanges into one feed and marked every open position to market on each tick, on Next.js, TypeScript, MongoDB, and Redis, shipped as an installable PWA.',
    ],
    tech: ['Next.js', 'TypeScript', 'MongoDB', 'Redis'],
  },
  {
    id: 'innovateher',
    company: 'InnovateHer',
    role: 'Head of Outreach & Programs',
    range: 'May 2025 - Present',
    year: '2025',
    location: 'Purdue University',
    url: 'https://innovateherhacks.org',
    bullets: [
      'Led a team running a 250+ participant hackathon empowering women in tech.',
      'Secured $40,000 in sponsorships from Lockheed Martin, L3Harris, Chamberlain Group, and Caterpillar.',
    ],
    tech: ['Ops', 'Partnerships'],
  },
  {
    id: 'vrai',
    company: 'VRAI Lab',
    role: 'ML Research Assistant',
    range: 'Jan - Sept 2025',
    year: '2025',
    location: 'West Lafayette, IN',
    url: 'https://www.vrai-lab.com',
    bullets: [
      'Built LDA and HDP topic-modeling pipelines over 3,000+ academic papers to extract latent topics and track how research areas shift over time. Earned the Wilke Award ($500 scholarship) for building the app end to end.',
    ],
    tech: ['Python', 'LDA', 'HDP'],
  },
  {
    id: 'ta',
    company: 'Purdue ECE',
    role: 'Blockchain Course Undergraduate TA',
    range: 'Jan 2025 - Present',
    year: '2025',
    location: 'West Lafayette, IN',
    url: 'https://www.boilerblockchain.org/courses',
    bullets: [
      'Teach Principles of Blockchain to 40+ students, covering cryptographic primitives, consensus, and smart contracts.',
      'Wrote the course labs in Solidity, Foundry, and ethers.js.',
    ],
    tech: ['Solidity', 'Foundry', 'ethers.js'],
  },
];
