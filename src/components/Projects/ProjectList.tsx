'use client';

import { PROJECTS } from '@/lib/projects';
import styles from './ProjectList.module.css';

function domain(href: string): string {
  try {
    const h = new URL(href).hostname.replace(/^www\./, '');
    if (h.includes('chromewebstore')) return 'chrome web store';
    return h;
  } catch {
    return '';
  }
}

export default function ProjectList() {
  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <p className={styles.kicker}>
          <b>//</b> PROJECTS
        </p>
        <p className={styles.lede}>
          Some projects I&apos;ve built with real users in mind, some at hackathons, and some for
          pure joy. I learnt something every time.
        </p>
      </header>

      <div className={styles.list}>
        {PROJECTS.map(p => (
          <a key={p.id} className={styles.row} href={p.href} target="_blank" rel="noreferrer">
            <span className={styles.icon} style={{ background: p.accent }}>
              {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt="" />
              ) : (
                <span className={styles.iconLetter}>{p.title[0]}</span>
              )}
            </span>

            <span className={styles.mid}>
              <span className={styles.name}>
                {p.title}
                <span className={styles.ext} aria-hidden>
                  ↗
                </span>
              </span>
              <span className={styles.url}>{domain(p.href)}</span>
            </span>

            <span className={styles.desc}>
              <span className={styles.blurb}>{p.blurb}</span>
              {p.award && <span className={styles.award}>{p.award}</span>}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
