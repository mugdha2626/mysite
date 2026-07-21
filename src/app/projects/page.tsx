import type { Metadata } from 'next';
import ProjectList from '@/components/Projects/ProjectList';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Everything Mugdha Patil has built - DeFi infra, trading systems, and hackathon wins.',
};

export default function ProjectsPage() {
  return <ProjectList />;
}
