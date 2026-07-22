'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import styles from './Home.module.css';

const WORDS = ['fintech.', 'DeFi rails.', 'trading systems.', 'things people use.'];

function useTypewriter(words: string[], enabled: boolean) {
  const [i, setI] = useState(0);
  const [sub, setSub] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    const word = words[i];
    if (!del && sub === word.length) {
      const h = setTimeout(() => setDel(true), 1700);
      return () => clearTimeout(h);
    }
    if (del && sub === 0) {
      setDel(false);
      setI(p => (p + 1) % words.length);
      return;
    }
    const t = setTimeout(() => setSub(s => s + (del ? -1 : 1)), del ? 45 : 85);
    return () => clearTimeout(t);
  }, [sub, del, i, words, enabled]);
  return words[i].substring(0, sub);
}

export default function Home() {
  const reduce = useReducedMotion();
  const typed = useTypewriter(WORDS, !reduce);

  const fade = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <main className={styles.page}>
      <motion.div {...fade}>
        <h1 className={styles.greeting}>
          Hi, I&apos;m <em>Mugdha</em>
        </h1>
        <p className={styles.tagline}>
          I love building{' '}
          {reduce ? (
            <span className={styles.rotating}>fintech.</span>
          ) : (
            <>
              <span className={styles.rotating}>{typed}</span>
              <span className={styles.caret} aria-hidden>
                |
              </span>
            </>
          )}
        </p>

        <div className={styles.portrait}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/me.jpg" alt="Mugdha Patil" />
        </div>

        <div className={styles.about} style={{ marginTop: 34 }}>
          <p className={styles.lead}>
            I currently build trading infrastructure at{' '}
            <a href="https://ellipsislabs.xyz" target="_blank" rel="noreferrer">
              Ellipsis Labs
            </a>
            .
          </p>

          <p>
            I study Computer Science at{' '}
            <a href="https://www.purdue.edu" target="_blank" rel="noreferrer">
              Purdue
            </a>
            , where I co-founded{' '}
            <a href="https://www.stax.so" target="_blank" rel="noreferrer">
              Stax
            </a>{' '}
            and lead the dev team at{' '}
            <a href="https://boilerblockchain.org" target="_blank" rel="noreferrer">
              Boiler Blockchain
            </a>
            . I like getting my hands dirty building things at the intersection of{' '}
            <strong>fintech</strong>, crypto, and AI, ideally things people actually use.
          </p>

          <p className={styles.listHead}>Some things I&apos;ve built:</p>
          <ul className={styles.list}>
            <li>
              <Link href="/projects">Nyx</Link>, a fully private perpetual DEX
              <br />
              <span className={styles.sub}>
                <strong>1st place</strong> at ETHGlobal New York
              </span>
            </li>
            <li>
              <a href="https://www.stax.so" target="_blank" rel="noreferrer">
                Stax
              </a>
              , a crypto trading simulator
              <br />
              <span className={styles.sub}>
                used by <strong>14+</strong> university clubs
              </span>
            </li>
            <li>
              Decibel&apos;s Points Rewards at{' '}
              <a href="https://aptoslabs.com" target="_blank" rel="noreferrer">
                Aptos Labs
              </a>
              <br />
              <span className={styles.sub}>
                live with <strong>10,000+</strong> users
              </span>
            </li>
            <li>
              <Link href="/projects">Eigen x402</Link>, pay-per-inference AI payments
              <br />
              <span className={styles.sub}>backed by an Eigen Layer grant</span>
            </li>
          </ul>

          <p className={styles.listHead}>Some things I&apos;m interested in:</p>
          <ul className={styles.list}>
            <li>market microstructure and trading infra</li>
            <li>DeFi rails and on-chain settlement</li>
            <li>AI agents that actually ship</li>
            <li>teaching. I TA Purdue&apos;s blockchain course</li>
            <li>getting the small details right</li>
          </ul>
        </div>

        <div className={styles.touch} style={{ marginTop: 34 }}>
          <p className={styles.touchText}>say hi :)</p>
        </div>
      </motion.div>
    </main>
  );
}
