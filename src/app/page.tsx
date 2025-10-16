/**
 * Página inicial - Redireciona para o dashboard
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return <LoadingSpinner message="Redirecionando..." />;
}
