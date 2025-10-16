/**
 * API Route: /api/transactions/[id]
 *
 * Endpoints:
 * - GET: Busca uma transação específica
 * - PUT: Atualiza uma transação
 * - DELETE: Deleta uma transação
 */

import { NextRequest } from 'next/server';
import {
  handleGetTransaction,
  handleUpdateTransaction,
  handleDeleteTransaction
} from '@/server/controllers/transaction.controller';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return handleGetTransaction(id);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return handleUpdateTransaction(id, request);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return handleDeleteTransaction(id);
}
