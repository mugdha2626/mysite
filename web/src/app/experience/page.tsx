import type { Metadata } from 'next';
import ExperienceList from '@/components/Experience/ExperienceList';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Where Mugdha Patil has worked - trading infra, DeFi, research.',
};

export default function ExperiencePage() {
  return <ExperienceList />;
}
