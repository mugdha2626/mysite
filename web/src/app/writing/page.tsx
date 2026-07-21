import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Writing by Mugdha Patil.',
};

export default function WritingPage() {
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '56px 24px 22vh' }}>
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--fz-sm)',
          letterSpacing: '0.08em',
          color: 'var(--ink-faint)',
        }}>
        <b style={{ color: 'var(--green)', fontWeight: 400 }}>//</b> WRITING
      </p>
    </main>
  );
}
