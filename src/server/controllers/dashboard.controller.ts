/**
 * Controller de Dashboard
 */

import { NextRequest, NextResponse } from 'next/server';
import * as dashboardService from '../services/dashboard.service';
import { ApiResponse } from '@/shared/types';

/**
 * Handler para GET /api/dashboard
 * Query params:
 * - date: YYYY-MM (opcional, padrão: mês atual)
 */
export async function handleGetDashboard(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date');

    let targetDate = new Date();

    // Se foi fornecida uma data, parseia ela
    if (dateParam) {
      const [year, month] = dateParam.split('-').map(Number);
      if (year && month) {
        targetDate = new Date(year, month - 1, 1); // month - 1 porque Date usa 0-11
      }
    }

    const stats = await dashboardService.getDashboardStats(targetDate);

    const response: ApiResponse<typeof stats> = {
      success: true,
      data: stats
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    const response: ApiResponse<null> = {
      success: false,
      error: error.message || 'Erro ao buscar estatísticas'
    };
    return NextResponse.json(response, { status: 500 });
  }
}
