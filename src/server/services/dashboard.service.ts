/**
 * Service de Dashboard - Lógica de negócio para estatísticas
 * OTIMIZADO: Busca dados uma única vez e processa localmente
 */

import {
  DashboardStats,
  TransactionType,
  MonthlyHistoryData,
  Transaction
} from '@/shared/types';
import { getTransactions } from './transaction.service';
import {
  startOfMonth,
  endOfMonth,
  subMonths,
  format,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  parseISO
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

/**
 * Calcula estatísticas de uma lista de transações
 */
function calculateStats(transactions: Transaction[]) {
  const income = transactions
    .filter((t) => t.type === TransactionType.INCOME)
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === TransactionType.EXPENSE)
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalIncome: income,
    totalExpense: expense,
    balance: income - expense
  };
}

/**
 * Agrupa transações por categoria
 */
function getCategoryBreakdown(transactions: Transaction[]) {
  const categoryMap = new Map<string, { total: number; count: number }>();

  transactions
    .filter((t) => t.type === TransactionType.EXPENSE)
    .forEach((t) => {
      const current = categoryMap.get(t.category) || { total: 0, count: 0 };
      categoryMap.set(t.category, {
        total: current.total + t.amount,
        count: current.count + 1
      });
    });

  const totalExpense = Array.from(categoryMap.values()).reduce(
    (sum, cat) => sum + cat.total,
    0
  );

  return Array.from(categoryMap.entries())
    .map(([category, data]) => ({
      category: category as any,
      total: data.total,
      percentage: totalExpense > 0 ? (data.total / totalExpense) * 100 : 0,
      transactionCount: data.count
    }))
    .sort((a, b) => b.total - a.total);
}

/**
 * Obtém todas as estatísticas do dashboard
 * OTIMIZADO: Faz apenas 1 requisição ao Google Sheets
 */
export async function getDashboardStats(
  targetDate: Date = new Date(),
  includeHistory: boolean = true
): Promise<DashboardStats> {
  // Calcula o range de datas (últimos 6 meses até o mês atual)
  const oldestDate = subMonths(startOfMonth(targetDate), 5);
  const newestDate = endOfMonth(targetDate);

  // BUSCA TODAS AS TRANSAÇÕES DE UMA VEZ (1 requisição apenas!)
  const allTransactions = await getTransactions({
    startDate: oldestDate.toISOString(),
    endDate: newestDate.toISOString()
  });

  // Semana atual
  const weekStart = startOfWeek(targetDate, { locale: ptBR });
  const weekEnd = endOfWeek(targetDate, { locale: ptBR });
  const weekTransactions = allTransactions.filter((t) =>
    isWithinInterval(parseISO(t.date), { start: weekStart, end: weekEnd })
  );
  const weekStats = calculateStats(weekTransactions);

  // Mês atual
  const monthStart = startOfMonth(targetDate);
  const monthEnd = endOfMonth(targetDate);
  const monthTransactions = allTransactions.filter((t) =>
    isWithinInterval(parseISO(t.date), { start: monthStart, end: monthEnd })
  );
  const monthStats = calculateStats(monthTransactions);

  // Categorias do mês
  const topCategories = getCategoryBreakdown(monthTransactions).slice(0, 5);

  // Histórico mensal (últimos 6 meses)
  const monthlyHistory: MonthlyHistoryData[] = [];
  if (includeHistory) {
    for (let i = 5; i >= 0; i--) {
      const monthDate = subMonths(targetDate, i);
      const mStart = startOfMonth(monthDate);
      const mEnd = endOfMonth(monthDate);

      const monthTxs = allTransactions.filter((t) =>
        isWithinInterval(parseISO(t.date), { start: mStart, end: mEnd })
      );

      const stats = calculateStats(monthTxs);

      monthlyHistory.push({
        month: format(monthDate, 'MMM/yy', { locale: ptBR }),
        income: stats.totalIncome,
        expense: stats.totalExpense,
        balance: stats.balance
      });
    }
  }

  return {
    currentWeek: {
      weekStart: weekStart.toISOString(),
      weekEnd: weekEnd.toISOString(),
      totalIncome: weekStats.totalIncome,
      totalExpense: weekStats.totalExpense,
      balance: weekStats.balance,
      transactions: weekTransactions
    },
    currentMonth: {
      month: format(targetDate, 'yyyy-MM'),
      totalIncome: monthStats.totalIncome,
      totalExpense: monthStats.totalExpense,
      balance: monthStats.balance,
      weeksSummary: [] // Não precisa para o dashboard principal
    },
    topCategories,
    monthlyHistory
  };
}
