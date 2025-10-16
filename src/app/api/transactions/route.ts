/**
 * API Route: /api/transactions
 *
 * Endpoints:
 * - GET: Lista todas as transações (com filtros opcionais)
 * - POST: Cria uma nova transação
 */

import { NextRequest } from 'next/server';
import {
  handleGetTransactions,
  handleCreateTransaction
} from '@/server/controllers/transaction.controller';

export async function GET(request: NextRequest) {
  return handleGetTransactions(request);
}

export async function POST(request: NextRequest) {
  return handleCreateTransaction(request);
}
