import { TransactionCategory, TransactionType } from '../types';

export const CATEGORY_LABELS: Record<TransactionCategory, string> = {
  [TransactionCategory.ADEGA]: 'Adega',
  [TransactionCategory.ALIMENTACAO]: 'Alimentação',
  [TransactionCategory.TRANSPORTE]: 'Transporte',
  [TransactionCategory.MORADIA]: 'Moradia',
  [TransactionCategory.SAUDE]: 'Saúde',
  [TransactionCategory.LAZER]: 'Lazer',
  [TransactionCategory.EDUCACAO]: 'Educação',
  [TransactionCategory.COMPRAS]: 'Compras',
  [TransactionCategory.CONTAS]: 'Contas',
  [TransactionCategory.PETS]: 'Pets',
  [TransactionCategory.STREAMING]: 'Streaming',
  [TransactionCategory.OUTRO]: 'Outro',
  [TransactionCategory.OUTROS_GASTOS]: 'Outros Gastos',
  [TransactionCategory.SALARIO]: 'Salário',
  [TransactionCategory.FREELANCE]: 'Freelance',
  [TransactionCategory.INVESTIMENTOS]: 'Investimentos',
  [TransactionCategory.OUTROS_GANHOS]: 'Outros Ganhos'
};

export const TYPE_LABELS: Record<TransactionType, string> = {
  [TransactionType.INCOME]: 'Receita',
  [TransactionType.EXPENSE]: 'Despesa'
};

export const STATUS_LABELS: Record<
  import('@/shared/types').PaymentStatus,
  string
> = {
  PAID: 'Pago',
  PENDING: 'Pendente'
};

export const EXPENSE_CATEGORIES: TransactionCategory[] = [
  TransactionCategory.ADEGA,
  TransactionCategory.ALIMENTACAO,
  TransactionCategory.TRANSPORTE,
  TransactionCategory.MORADIA,
  TransactionCategory.SAUDE,
  TransactionCategory.LAZER,
  TransactionCategory.EDUCACAO,
  TransactionCategory.COMPRAS,
  TransactionCategory.CONTAS,
  TransactionCategory.PETS,
  TransactionCategory.STREAMING,
  TransactionCategory.OUTRO,
  TransactionCategory.OUTROS_GASTOS
];

export const INCOME_CATEGORIES: TransactionCategory[] = [
  TransactionCategory.SALARIO,
  TransactionCategory.FREELANCE,
  TransactionCategory.INVESTIMENTOS,
  TransactionCategory.OUTROS_GANHOS
];

export const CATEGORY_COLORS: Record<TransactionCategory, string> = {
  [TransactionCategory.ADEGA]: '#8B0000',
  [TransactionCategory.ALIMENTACAO]: '#FF6384',
  [TransactionCategory.TRANSPORTE]: '#36A2EB',
  [TransactionCategory.MORADIA]: '#FFCE56',
  [TransactionCategory.SAUDE]: '#4BC0C0',
  [TransactionCategory.LAZER]: '#9966FF',
  [TransactionCategory.EDUCACAO]: '#FF9F40',
  [TransactionCategory.COMPRAS]: '#FF6384',
  [TransactionCategory.CONTAS]: '#C9CBCF',
  [TransactionCategory.PETS]: '#F4A460',
  [TransactionCategory.STREAMING]: '#DA70D6',
  [TransactionCategory.OUTRO]: '#708090',
  [TransactionCategory.OUTROS_GASTOS]: '#8B8B8B',
  [TransactionCategory.SALARIO]: '#4CAF50',
  [TransactionCategory.FREELANCE]: '#8BC34A',
  [TransactionCategory.INVESTIMENTOS]: '#00BCD4',
  [TransactionCategory.OUTROS_GANHOS]: '#009688'
};

export const CURRENCY_CONFIG = {
  locale: 'pt-BR',
  currency: 'BRL'
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100]
};

export const FINANCIAL_WEEK_CONFIG = {
  START_DAY: 15
};

export const SHEETS_COLUMNS = {
  ID: 'id',
  DESCRIPTION: 'description',
  AMOUNT: 'amount',
  TYPE: 'type',
  CATEGORY: 'category',
  DATE: 'date',
  STATUS: 'status',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt'
};

export const SHEETS_COLUMN_ORDER = [
  SHEETS_COLUMNS.ID,
  SHEETS_COLUMNS.DESCRIPTION,
  SHEETS_COLUMNS.AMOUNT,
  SHEETS_COLUMNS.TYPE,
  SHEETS_COLUMNS.CATEGORY,
  SHEETS_COLUMNS.DATE,
  SHEETS_COLUMNS.STATUS,
  SHEETS_COLUMNS.CREATED_AT,
  SHEETS_COLUMNS.UPDATED_AT
];
