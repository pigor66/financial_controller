/**
 * Service de Dashboard - Lógica de negócio para estatísticas
 */

import {
  DashboardStats,
  TransactionType,
  MonthlyHistoryData
} from '@/shared/types';
import {
  getWeeklySummary,
  getMonthlySummary,
  getCategorySummary
} from './transaction.service';
import { startOfMonth, endOfMonth, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

/**
 * Obtém o histórico mensal dos últimos N meses
 * @param targetDate Data de referência
 * @param monthsCount Quantidade de meses a buscar (padrão: 6)
 */
export async function getMonthlyHistory(
  targetDate: Date = new Date(),
  monthsCount: number = 6
): Promise<MonthlyHistoryData[]> {
  const history: MonthlyHistoryData[] = [];

  for (let i = monthsCount - 1; i >= 0; i--) {
    const monthDate = subMonths(targetDate, i);
    const summary = await getMonthlySummary(monthDate);

    history.push({
      month: format(monthDate, 'MMM/yy', { locale: ptBR }),
      income: summary.totalIncome,
      expense: summary.totalExpense,
      balance: summary.balance
    });
  }

  return history;
}

/**
 * Obtém todas as estatísticas do dashboard
 * @param targetDate Data do mês que se deseja visualizar (padrão: mês atual)
 * @param includeHistory Se deve incluir histórico mensal (padrão: true)
 */
export async function getDashboardStats(
  targetDate: Date = new Date(),
  includeHistory: boolean = true
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

  const stats: DashboardStats = {
    currentWeek,
    currentMonth,
    topCategories
  };

  // Adiciona histórico mensal se solicitado
  if (includeHistory) {
    stats.monthlyHistory = await getMonthlyHistory(targetDate, 6);
  }

  return stats;
}
