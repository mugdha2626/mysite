/*
 * Everything Mugdha has built. Featured four first (Nyx, Stax, tmap, Eigen x402),
 * then the rest. Pulled from the real content - awards, prizes, links included.
 * Images live in /public/tiles.
 */
export type Project = {
  id: string;
  title: string;
  year: string;
  blurb: string;
  tech: string[];
  award?: string;
  href: string;
  image?: string;
  accent: string; // palette color for the placeholder / label
};

export const PROJECTS: Project[] = [
  {
    id: 'cacheapp',
    title: 'CacheApp',
    year: '2026',
    blurb:
      'A marketplace and CLI that lets AI agents buy and sell pre-computed deep research. Instead of re-running multi-million-token research loops, an agent queries CacheApp over MCP, semantically matches its question against completed research, and retrieves the report in seconds.',
    tech: ['TypeScript', 'Python', 'FastAPI', 'MCP', 'CLI'],
    award: '◆ Finalist at the Ramp Hackathon · Save Time / Save Money tracks',
    href: 'https://github.com/mugdha2626/cachedApp',
    image: '/tiles/cacheapp.png',
    accent: '#8f7189',
  },
  {
    id: 'kalshi',
    title: 'Kalshi Market Maker',
    year: '2026',
    blurb:
      'A Rust bot that quotes two-sided on Kalshi binary contracts: rebuilds book state from the WebSocket feed, requotes every update in ~8ms median, skews against inventory, and prices net of Kalshi’s parabolic fee curve. Recorded +50% on deployed capital over 7 weeks live across 9 markets.',
    tech: ['Rust', 'WebSocket', 'Market Making'],
    award: '◆ +50% on deployed capital over 7 weeks live',
    href: 'https://github.com/mugdha2626',
    accent: 'var(--green-light)',
  },
  {
    id: 'nyx',
    title: 'Nyx',
    year: '2026',
    blurb:
      'A perpetuals DEX with an encrypted order book: resting orders stay sealed until match time, so neither the sequencer nor other traders can front-run flow or hunt liquidations off visible stops. Built the matching path and margin engine against yield-bearing RWA collateral.',
    tech: ['Daml', 'Canton', 'Chainlink', 'C++', 'React'],
    award: '🏆 1st · RWA (Canton) + Best Chainlink · ETHGlobal NY 2026 · $4,000',
    href: 'https://ethglobal.com/showcase/nyx-prk3o',
    image: '/tiles/nyx.png',
    accent: 'var(--green)',
  },
  {
    id: 'stax',
    title: 'Stax Trading',
    year: '2025',
    blurb:
      'Real-time crypto trading simulator with leverage, portfolios, and tournaments. Onboarded 14+ university blockchain clubs as paying customers.',
    tech: ['Next.js', 'TypeScript', 'MongoDB', 'Redis', 'PWA'],
    award: '◆ 14+ paying university clubs',
    href: 'https://www.stax.so',
    image: '/tiles/stax.png',
    accent: 'var(--ink-strong)',
  },
  {
    id: 'tmap',
    title: 'tmap',
    year: '2025',
    blurb:
      'Turns food discoveries into tradeable on-chain ERC-1155 tokens - GPS-verified, bonding-curve priced, gasless via Coinbase Paymaster.',
    tech: ['Next.js', 'Solidity', 'Base', 'Farcaster'],
    award: '🥈 2nd · Base Track · Midwest Blockchain Conf 2025 · $2,500',
    href: 'https://devpost.com/software/tmap',
    image: '/tiles/tmap.png',
    accent: 'var(--card-rose)',
  },
  {
    id: 'eigenx402',
    title: 'Eigen x402',
    year: '2025',
    blurb:
      'Production-ready payment gateway integrating EigenAI with Coinbase’s x402 protocol for crypto pay-per-use AI inference. Published npm package.',
    tech: ['EigenAI', 'Coinbase x402', 'TypeScript', 'npm'],
    award: '◆ Eigen Layer Grant Program',
    href: 'https://eigenx402.vercel.app/',
    image: '/tiles/eigenx402.png',
    accent: 'var(--green-light)',
  },
  {
    id: 'agentica',
    title: 'Agentica',
    year: '2025',
    blurb:
      'An AI buddy that trades for you based on the strategy you pick and live world news, so you never miss a move.',
    tech: ['Eliza OS', 'Coinbase Wallets', 'The Graph', 'AI Agents'],
    award: '🏆 Best use of Graph for AI · ETHGlobal Buenos Aires 2025 · $2,000',
    href: 'https://ethglobal.com/showcase/agentica-30neq',
    accent: 'var(--rose)',
  },
  {
    id: 'anypay',
    title: 'AnyPay',
    year: '2025',
    blurb:
      'Expense settlement platform enabling seamless cross-chain payments via Coinbase Embedded Wallets.',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Chainlink CCIP'],
    award: '🏆 Best use of Chainlink CCIP · ETHGlobal NYC 2025 · $2,000',
    href: 'https://ethglobal.com/showcase/anypay-t4xox',
    accent: 'var(--card-sage)',
  },
  {
    id: 'trackwork',
    title: 'TrackWork',
    year: '2025',
    blurb:
      'Full-stack academic productivity tool (Chrome Extension MV3) helping Purdue CS students track assignments and deadlines with background notifications.',
    tech: ['Chrome Extension', 'Node.js', 'Express', 'MongoDB'],
    href: 'https://chromewebstore.google.com/detail/iddjdgeeliajgchongjieholdbnokdfi',
    accent: 'var(--card-cream)',
  },
  {
    id: 'cryptobaso',
    title: 'CryptoBASO',
    year: '2024',
    blurb:
      'DEX that splits swap orders to reduce front-running MEV via SKALE’s zero-gas fees, with real-time price validation and automated execution.',
    tech: ['Solidity', 'Next.js', 'Ethers.js', 'SKALE'],
    award: '🥉 3rd · ETHGlobal SF 2024 · $1,000',
    href: 'https://ethglobal.com/showcase/cryptobaso-d7xqy',
    accent: 'var(--card-green)',
  },
];
