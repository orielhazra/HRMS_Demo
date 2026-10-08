import { getStaffById } from '@/lib/mockData';
import StaffProfileClient from './StaffProfileClient';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function StaffPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const person = getStaffById(id);

  if (!person) {
    notFound();
  }

  return <StaffProfileClient staffId={id} />;
}