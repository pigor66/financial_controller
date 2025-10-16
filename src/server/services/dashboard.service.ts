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
  isWithinInterval,
  parseISO,
  addDays,
  isAfter
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FINANCIAL_WEEK_CONFIG } from '@/shared/constants';

/**
 * Calcula as semanas financeiras do mês baseado no dia configurado
 * Exemplo: se START_DAY = 15, as semanas são:
 * - 01 a 14 (semana parcial)
 * - 15 a 21 (semana 1)
 * - 22 a 28 (semana 2)
 * - 29 a 31 (semana 3)
 */
function getFinancialWeeksOfMonth(targetDate: Date): { weekStart: Date; weekEnd: Date }[] {
  const startDay = FINANCIAL_WEEK_CONFIG.START_DAY;
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();
  const monthEnd = endOfMonth(targetDate);

  const weeks: { weekStart: Date; weekEnd: Date }[] = [];

  // Semana parcial antes do dia inicial (se START_DAY > 1)
  if (startDay > 1) {
    weeks.push({
      weekStart: startOfMonth(targetDate),
      weekEnd: new Date(year, month, startDay - 1)
    });
  }

  // Semanas normais de 7 dias
  let currentStart = new Date(year, month, startDay);
  while (currentStart <= monthEnd) {
    let currentEnd = addDays(currentStart, 6);
    if (isAfter(currentEnd, monthEnd)) {
      currentEnd = monthEnd;
    }

    weeks.push({
      weekStart: new Date(currentStart),
      weekEnd: new Date(currentEnd)
    });

    currentStart = addDays(currentEnd, 1);
  }

  return weeks;
}

/**
 * Calcula o início e fim da semana financeira baseado no dia configurado
 * Exemplo: se START_DAY = 15, as semanas são:
 * - 01 a 14 (semana parcial)
 * - 15 a 21 (semana 1)
 * - 22 a 28 (semana 2)
 * - 29 a 31 (semana 3)
 */
function getFinancialWeek(targetDate: Date): {
  weekStart: Date;
  weekEnd: Date;
} {
  const weeks = getFinancialWeeksOfMonth(targetDate);

  // Encontra a semana que contém a data atual
  const currentWeek = weeks.find((week) =>
    isWithinInterval(targetDate, { start: week.weekStart, end: week.weekEnd })
  );

  if (!currentWeek) {
    // Fallback: retorna o mês inteiro
    return {
      weekStart: startOfMonth(targetDate),
      weekEnd: endOfMonth(targetDate)
    };
  }

  return currentWeek;
}

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

  console.log('📊 Dashboard Stats Debug:');
  console.log(`  Total transactions found: ${allTransactions.length}`);
  console.log(
    `  Date range: ${oldestDate.toISOString().split('T')[0]} to ${
      newestDate.toISOString().split('T')[0]
    }`
  );

  if (allTransactions.length > 0) {
    console.log(
      `  First transaction: ${allTransactions[0].date} - ${allTransactions[0].description}`
    );
    console.log(
      `  Last transaction: ${allTransactions[allTransactions.length - 1].date}`
    );
  }

  // Semana atual (baseado no FINANCIAL_WEEK_CONFIG)
  const { weekStart, weekEnd } = getFinancialWeek(targetDate);
  console.log(
    `  Current week: ${weekStart.toISOString().split('T')[0]} to ${
      weekEnd.toISOString().split('T')[0]
    }`
  );
  console.log(
    `  FINANCIAL_WEEK_CONFIG.START_DAY: ${FINANCIAL_WEEK_CONFIG.START_DAY}`
  );
  console.log(`  Target date: ${targetDate.toISOString().split('T')[0]}`);

  const weekTransactions = allTransactions.filter((t) => {
    const transDate = parseISO(t.date);
    const isInWeek = isWithinInterval(transDate, {
      start: weekStart,
      end: weekEnd
    });

    if (allTransactions.length <= 5) {
      console.log(
        `    Transaction ${t.description} (${t.date}): ${
          isInWeek ? '✅' : '❌'
        } in week`
      );
    }

    return isInWeek;
  });
  console.log(`  Week transactions: ${weekTransactions.length}`);

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

  // Calcula semanas do mês atual para o reports
  const weeksSummary = getFinancialWeeksOfMonth(targetDate).map(({ weekStart, weekEnd }) => {
    const weekTransactions = monthTransactions.filter((t) => {
      const transactionDate = parseISO(t.date);
      return isWithinInterval(transactionDate, { start: weekStart, end: weekEnd });
    });
    
    const weekStats = calculateStats(weekTransactions);
    return {
      weekStart: weekStart.toISOString(),
      weekEnd: weekEnd.toISOString(),
      totalIncome: weekStats.totalIncome,
      totalExpense: weekStats.totalExpense,
      balance: weekStats.balance,
      transactions: weekTransactions
    };
  });

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
      weeksSummary
    },
    topCategories,
    monthlyHistory
  };
}
