import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session-server';
import SellerDashboardClient from './SellerDashboardClient';

export default async function SellerDashboardPage() {
  const session = await getSession();

  if (!session || session.role !== 'SELLER') {
    redirect('/login');
  }

  return <SellerDashboardClient sessionName={session.name} />;
}
