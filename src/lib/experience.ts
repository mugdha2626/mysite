/*
 * Mugdha's experience, newest first.
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
    range: 'Summer 2026',
    year: '2026',
    location: 'New York, NY',
    url: 'https://ellipsislabs.xyz',
    bullets: [
      'Building core protocol infrastructure at Ellipsis Labs, creators of Phoenix, Solana’s fastest on-chain central limit order book DEX.',
    ],
    tech: ['Rust', 'Solana', 'Phoenix'],
  },
  {
    id: 'aptos',
    company: 'Aptos Labs',
    role: 'Software Engineering Intern',
    range: 'Spring 2026',
    year: '2026',
    location: 'Palo Alto, CA',
    url: 'https://aptoslabs.com',
    bullets: [
      'Sole engineer on the Points Rewards system for Decibel, Aptos’s perp DEX, owned end-to-end and now live with 10,000+ active users earning real-time points.',
      'Engineered a scalable Rust + SQL backend for high-throughput points accrual, leaderboard ranking, and database optimization.',
    ],
    tech: ['Rust', 'SQL', 'PostgreSQL'],
  },
  {
    id: 'boiler',
    company: 'Boiler Blockchain',
    role: 'Developer Lead',
    range: 'Jun 2025 - Present',
    year: '2025',
    location: 'Purdue University',
    url: 'https://boilerblockchain.org',
    bullets: [
      'Lead a 40+ developer team to 8+ hackathon wins and partner collaborations.',
      'Secured $15k in grants and bounties across Solana, EigenLayer, and MOI Labs.',
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
      'Architected the full stack on Next.js, TypeScript, MongoDB, and Redis with multi-exchange market feeds, shipped as an installable PWA.',
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
    location: 'Purdue University',
    url: 'https://www.vrai-lab.com',
    bullets: [
      'Earned the Wilke Award ($500 scholarship) researching under Professors Javier Gomez-Lavin and Bruce Rushing.',
      'Built ML topic-modeling pipelines (LDA, HDP) that extract topics and visualize trends across academic PDF collections.',
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
      'Mentored 40+ students in “Principles and Practices of Blockchain” on cryptography, smart contracts, and dApps.',
      'Built course material and labs using Solidity, ethers.js, and Hardhat.',
    ],
    tech: ['Solidity', 'ethers.js', 'Hardhat'],
  },
];
