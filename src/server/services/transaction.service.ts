/**
 * Service de Transações - Lógica de negócio
 *
 * Camada intermediária entre controllers e models
 * Responsável por validações e regras de negócio
 */

import {
  findAllTransactions,
  findTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction
} from '../models/Transaction.model';
import {
  Transaction,
  TransactionFormData,
  FilterParams,
  WeeklySummary,
  MonthlySummary,
  CategorySummary,
  TransactionType
} from '@/shared/types';
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  parseISO,
  isWithinInterval,
  addDays,
  isBefore,
  isAfter
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FINANCIAL_WEEK_CONFIG } from '@/shared/constants';

/**
 * Busca todas as transações com filtros opcionais
 */
export async function getTransactions(
  filters?: FilterParams
): Promise<Transaction[]> {
  let transactions = await findAllTransactions();

  // Aplica filtros se fornecidos
  if (filters) {
    if (filters.startDate || filters.endDate) {
      transactions = transactions.filter((t) => {
        const transactionDate = parseISO(t.date);

        if (filters.startDate && filters.endDate) {
          return isWithinInterval(transactionDate, {
            start: parseISO(filters.startDate),
            end: parseISO(filters.endDate)
          });
        }

        if (filters.startDate) {
          return transactionDate >= parseISO(filters.startDate);
        }

        if (filters.endDate) {
          return transactionDate <= parseISO(filters.endDate);
        }

        return true;
      });
    }

    if (filters.type) {
      transactions = transactions.filter((t) => t.type === filters.type);
    }

    if (filters.category) {
      transactions = transactions.filter(
        (t) => t.category === filters.category
      );
    }
  }

  // Ordena por data decrescente
  return transactions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Busca transação por ID
 */
export async function getTransactionById(
  id: string
): Promise<Transaction | null> {
  return await findTransactionById(id);
}

/**
 * Cria uma nova transação
 */
export async function addTransaction(
  data: TransactionFormData
): Promise<Transaction> {
  // Validações adicionais podem ser feitas aqui
  if (data.amount <= 0) {
    throw new Error('O valor deve ser maior que zero');
  }

  return await createTransaction(data);
}

/**
 * Atualiza uma transação
 */
export async function modifyTransaction(
  id: string,
  data: Partial<TransactionFormData>
): Promise<Transaction | null> {
  // Validações
  if (data.amount !== undefined && data.amount <= 0) {
    throw new Error('O valor deve ser maior que zero');
  }

  return await updateTransaction(id, data);
}

/**
 * Remove uma transação
 */
export async function removeTransaction(id: string): Promise<boolean> {
  return await deleteTransaction(id);
}

/**
 * Obtém resumo semanal
 */
export async function getWeeklySummary(
  date: Date = new Date()
): Promise<WeeklySummary> {
  const weekStart = startOfWeek(date, { locale: ptBR });
  const weekEnd = endOfWeek(date, { locale: ptBR });

  const transactions = await getTransactions({
    startDate: weekStart.toISOString(),
    endDate: weekEnd.toISOString()
  });

  const totalIncome = transactions
    .filter((t) => t.type === TransactionType.INCOME)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === TransactionType.EXPENSE)
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    weekStart: weekStart.toISOString(),
    weekEnd: weekEnd.toISOString(),
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    transactions
  };
}

/**
 * Calcula as semanas financeiras do mês baseado no dia configurado
 * Exemplo: Se START_DAY = 13, então:
 * - Semana 1: 13 ao 19
 * - Semana 2: 20 ao 26
 * - E assim por diante...
 */
function getFinancialWeeksOfMonth(
  date: Date
): { weekStart: Date; weekEnd: Date }[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const startDay = FINANCIAL_WEEK_CONFIG.START_DAY;

  const weeks: { weekStart: Date; weekEnd: Date }[] = [];

  // Primeira semana começa no dia configurado
  let weekStart = new Date(year, month, startDay);

  // Se o dia configurado não existe no mês (ex: dia 31 em fevereiro),
  // ajusta para o último dia do mês
  const monthEnd = endOfMonth(date);
  if (weekStart > monthEnd) {
    weekStart = monthEnd;
  }

  // Gera as semanas (períodos de 7 dias)
  while (weekStart <= monthEnd) {
    let weekEnd = addDays(weekStart, 6); // 7 dias (0-6)

    // Se o fim da semana ultrapassar o mês, ajusta para o último dia do mês
    if (weekEnd > monthEnd) {
      weekEnd = monthEnd;
    }

    weeks.push({
      weekStart: new Date(weekStart),
      weekEnd: new Date(weekEnd)
    });

    // Próxima semana começa no dia seguinte
    weekStart = addDays(weekEnd, 1);
  }

  // Se o dia inicial não é 1, adiciona a semana parcial do início do mês
  if (startDay > 1) {
    const firstDayOfMonth = startOfMonth(date);
    const preWeekEnd = addDays(new Date(year, month, startDay), -1);

    weeks.unshift({
      weekStart: firstDayOfMonth,
      weekEnd: preWeekEnd
    });
  }

  return weeks;
}

/**
 * Obtém resumo mensal com semanas financeiras personalizadas
 */
export async function getMonthlySummary(
  date: Date = new Date()
): Promise<MonthlySummary> {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);

  // Busca todas as transações do mês
  const allTransactions = await getTransactions({
    startDate: monthStart.toISOString(),
    endDate: monthEnd.toISOString()
  });

  const totalIncome = allTransactions
    .filter((t) => t.type === TransactionType.INCOME)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = allTransactions
    .filter((t) => t.type === TransactionType.EXPENSE)
    .reduce((sum, t) => sum + t.amount, 0);

  // Calcula as semanas financeiras baseadas no dia configurado
  const financialWeeks = getFinancialWeeksOfMonth(date);

  // Agrupa transações por semana financeira
  const weeks: WeeklySummary[] = financialWeeks.map(
    ({ weekStart, weekEnd }) => {
      // Filtra transações desta semana
      const weekTransactions = allTransactions.filter((t) => {
        const transactionDate = parseISO(t.date);
        return isWithinInterval(transactionDate, {
          start: weekStart,
          end: weekEnd
        });
      });

      const weekIncome = weekTransactions
        .filter((t) => t.type === TransactionType.INCOME)
        .reduce((sum, t) => sum + t.amount, 0);

      const weekExpense = weekTransactions
        .filter((t) => t.type === TransactionType.EXPENSE)
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        weekStart: weekStart.toISOString(),
        weekEnd: weekEnd.toISOString(),
        totalIncome: weekIncome,
        totalExpense: weekExpense,
        balance: weekIncome - weekExpense,
        transactions: weekTransactions
      };
    }
  );

  return {
    month: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0'
    )}`,
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    weeksSummary: weeks
  };
}

/**
 * Obtém resumo por categorias
 */
export async function getCategorySummary(
  type: TransactionType,
  startDate?: Date,
  endDate?: Date
): Promise<CategorySummary[]> {
  const filters: FilterParams = { type };

  if (startDate) filters.startDate = startDate.toISOString();
  if (endDate) filters.endDate = endDate.toISOString();

  const transactions = await getTransactions(filters);

  // Agrupa por categoria
  const categoryMap = new Map<string, { total: number; count: number }>();

  transactions.forEach((t) => {
    const current = categoryMap.get(t.category) || { total: 0, count: 0 };
    categoryMap.set(t.category, {
      total: current.total + t.amount,
      count: current.count + 1
    });
  });

  // Calcula o total geral
  const totalAmount = Array.from(categoryMap.values()).reduce(
    (sum, cat) => sum + cat.total,
    0
  );

  // Converte para array e calcula percentuais
  const summary: CategorySummary[] = Array.from(categoryMap.entries()).map(
    ([category, data]) => ({
      category: category as any,
      total: data.total,
      percentage: totalAmount > 0 ? (data.total / totalAmount) * 100 : 0,
      transactionCount: data.count
    })
  );

  // Ordena por total decrescente
  return summary.sort((a, b) => b.total - a.total);
}
