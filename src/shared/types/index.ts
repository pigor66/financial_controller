export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export enum PaymentStatus {
  PAID = 'PAID',
  PENDING = 'PENDING'
}

export enum TransactionCategory {
  ADEGA = 'ADEGA',
  ALIMENTACAO = 'ALIMENTACAO',
  TRANSPORTE = 'TRANSPORTE',
  MORADIA = 'MORADIA',
  SAUDE = 'SAUDE',
  LAZER = 'LAZER',
  EDUCACAO = 'EDUCACAO',
  COMPRAS = 'COMPRAS',
  CONTAS = 'CONTAS',
  PETS = 'PETS',
  STREAMING = 'STREAMING',
  OUTRO = 'OUTRO',
  OUTROS_GASTOS = 'OUTROS_GASTOS',
  SALARIO = 'SALARIO',
  FREELANCE = 'FREELANCE',
  INVESTIMENTOS = 'INVESTIMENTOS',
  OUTROS_GANHOS = 'OUTROS_GANHOS'
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface WeeklySummary {
  weekStart: string;
  weekEnd: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactions: Transaction[];
}

export interface MonthlySummary {
  month: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  weeksSummary: WeeklySummary[];
}

export interface CategorySummary {
  category: TransactionCategory;
  total: number;
  percentage: number;
  transactionCount: number;
}

export interface MonthlyHistoryData {
  month: string;
  income: number;
  expense: number;
  balance: number;
}

export interface DashboardStats {
  currentWeek: WeeklySummary;
  currentMonth: MonthlySummary;
  topCategories: CategorySummary[];
  monthlyHistory?: MonthlyHistoryData[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface TransactionFormData {
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string;
  status: PaymentStatus;
}

export interface FilterParams {
  startDate?: string;
  endDate?: string;
  type?: TransactionType;
  category?: TransactionCategory;
}
