import { getProgramById } from '@/lib/mockData';
import TrainingDetailClient from './TrainingDetailClient';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function TrainingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const program = getProgramById(id);

  if (!program) {
    notFound();
  }

  return <TrainingDetailClient programId={id} />;
}