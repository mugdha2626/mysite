'use client';

import type { ReactNode } from 'react';
import { ROLES } from '@/lib/experience';
import styles from './ExperienceList.module.css';

/** Bold standalone numbers / metrics (e.g. 10,000+, $40,000, 14+) - skips things
 *  like "L3Harris" via the letter boundaries. */
function boldNums(text: string): ReactNode[] {
  const parts = text.split(/((?<![A-Za-z])\$?\d[\d,]*\+?k?(?![A-Za-z]))/g);
  return parts.map((p, i) =>
    /^\$?\d/.test(p) ? <strong key={i}>{p}</strong> : <span key={i}>{p}</span>,
  );
}

export default function ExperienceList() {
  return (
    <div className={styles.wrap}>
      <div className={styles.aura} aria-hidden />
      <header className={styles.header}>
        <p className={styles.kicker}>
          <b>//</b> EXPERIENCE
        </p>
      </header>

      <div className={styles.list}>
        {ROLES.map(r => (
          <a key={r.id} className={styles.row} href={r.url} target="_blank" rel="noreferrer">
            <span className={styles.mid}>
              <span className={styles.company}>{r.company}</span>
              <span className={styles.role}>
                {r.role}
                <br />
                <span className={styles.range}>{r.range}</span> · {r.location}
              </span>
            </span>

            <span className={styles.desc}>
              {r.bullets.length > 0 && (
                <ul className={styles.bullets}>
                  {r.bullets.map((b, j) => (
                    <li key={j}>{boldNums(b)}</li>
                  ))}
                </ul>
              )}
              {r.tech && r.tech.length > 0 && (
                <div className={styles.tech}>
                  {r.tech.map(t => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
