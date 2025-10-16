/**
 * Service de Dashboard - Lógica de negócio para estatísticas
 */

import { DashboardStats, TransactionType } from '@/shared/types';
import {
  getWeeklySummary,
  getMonthlySummary,
  getCategorySummary
} from './transaction.service';
import { startOfMonth, endOfMonth } from 'date-fns';

/**
 * Obtém todas as estatísticas do dashboard
 * @param targetDate Data do mês que se deseja visualizar (padrão: mês atual)
 */
export async function getDashboardStats(
  targetDate: Date = new Date()
): Promise<DashboardStats> {
  const monthStart = startOfMonth(targetDate);
  const monthEnd = endOfMonth(targetDate);

  const [currentWeek, currentMonth, expenseCategories] = await Promise.all([
    getWeeklySummary(targetDate),
    getMonthlySummary(targetDate),
    getCategorySummary(TransactionType.EXPENSE, monthStart, monthEnd)
  ]);

  // Pega as top 5 categorias
  const topCategories = expenseCategories.slice(0, 5);

  return {
    currentWeek,
    currentMonth,
    topCategories
  };
}
