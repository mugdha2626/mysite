'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PROFILE } from '@/lib/profile';
import styles from './Dock.module.css';

const I = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M3 10.5 12 3l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 9.5V21h14V9.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  experience: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M4 19V5M4 19h16M8 19v-6M12 19V9M16 19v-9M20 19V6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  projects: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" />
    </svg>
  ),
  writing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M5 4h11l3 3v13H5z" strokeLinejoin="round" />
      <path d="M9 9h6M9 13h6M9 17h4" strokeLinecap="round" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.2 2.3h3.3l-7.2 8.3 8.5 11.1h-6.6l-5.2-6.8-6 6.8H1.7l7.7-8.8L1.3 2.3H8l4.7 6.2 5.5-6.2Zm-1.2 17.5h1.8L7.1 4.1H5.2L17 19.8Z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3-1.8 0-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4A2.1 2.1 0 1 1 5.3 3a2.1 2.1 0 0 1 0 4.4zm1.8 13H3.5V9h3.6v11.4zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 1 .8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7c0-.9-.8-1.7-1.8-1.7z" />
    </svg>
  ),
  resume: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M6 3h9l3 3v15H6z" strokeLinejoin="round" />
      <path d="M9 12h6M9 16h6M9 8h3" strokeLinecap="round" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 5 8-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  moon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" strokeLinejoin="round" />
    </svg>
  ),
  sun: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
};

type Item = { id: string; label: string; icon: ReactNode; href: string; external?: boolean };

const NAV: Item[] = [
  { id: 'home', label: 'Home', icon: I.home, href: '/' },
  { id: 'experience', label: 'Experience', icon: I.experience, href: '/experience' },
  { id: 'projects', label: 'Projects', icon: I.projects, href: '/projects' },
  { id: 'writing', label: 'Writing', icon: I.writing, href: '/writing' },
];
const SOCIAL: Item[] = [
  { id: 'github', label: 'GitHub', icon: I.github, href: PROFILE.socials.github, external: true },
  { id: 'linkedin', label: 'LinkedIn', icon: I.linkedin, href: PROFILE.socials.linkedin, external: true },
  { id: 'twitter', label: 'Twitter', icon: I.twitter, href: PROFILE.socials.twitter, external: true },
  { id: 'mail', label: 'Email', icon: I.mail, href: `mailto:${PROFILE.email}` },
];

export default function Dock() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme((document.documentElement.dataset.theme as 'light' | 'dark') || 'light');
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {}
    setTheme(next);
  };
  const isDark = mounted && theme === 'dark';

  const renderItem = (item: Item, rose = false) => {
    const active = !item.external && (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href));
    const tint = rose ? { color: 'var(--rose-icon)' } : undefined;
    const inner = (
      <>
        <span className={styles.tip}>{item.label}</span>
        <span className={styles.icon}>{item.icon}</span>
      </>
    );
    return item.external || item.href.startsWith('mailto') ? (
      <a
        key={item.id}
        className={styles.item}
        style={tint}
        href={item.href}
        target={item.external ? '_blank' : undefined}
        rel={item.external ? 'noreferrer' : undefined}
        aria-label={item.label}>
        {inner}
      </a>
    ) : (
      <Link
        key={item.id}
        className={`${styles.item} ${active ? styles.itemActive : ''}`}
        href={item.href}
        aria-label={item.label}
        aria-current={active ? 'page' : undefined}>
        {inner}
      </Link>
    );
  };

  return (
    <nav className={styles.dock} aria-label="Dock">
      {NAV.map(item => (
        <span key={item.id} className={styles.slot}>
          {renderItem(item)}
        </span>
      ))}
      <span className={styles.divider} aria-hidden />
      {SOCIAL.map(item => (
        <span key={item.id} className={styles.slot}>
          {renderItem(item, true)}
        </span>
      ))}
      <span className={styles.slot}>
        <button
          type="button"
          className={styles.item}
          style={{ color: 'var(--rose-icon)' }}
          onClick={toggleTheme}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
          <span className={styles.tip}>{isDark ? 'Light mode' : 'Dark mode'}</span>
          <span className={styles.icon}>{isDark ? I.sun : I.moon}</span>
        </button>
      </span>
    </nav>
  );
}
