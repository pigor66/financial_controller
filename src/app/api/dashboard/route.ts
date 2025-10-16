/**
 * API Route: /api/dashboard
 *
 * Endpoints:
 * - GET: Retorna estatísticas do dashboard
 * Query params:
 * - date: YYYY-MM (opcional, padrão: mês atual)
 */

import { NextRequest } from 'next/server';
import { handleGetDashboard } from '@/server/controllers/dashboard.controller';

export async function GET(request: NextRequest) {
  return handleGetDashboard(request);
}
