/**
 * Controller de Transações
 *
 * Camada de apresentação - recebe requests e formata responses
 */

import { NextRequest, NextResponse } from 'next/server';
import * as transactionService from '../services/transaction.service';
import { TransactionFormData, FilterParams, ApiResponse } from '@/shared/types';

/**
 * Handler para GET /api/transactions
 */
export async function handleGetTransactions(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters: FilterParams = {};

    if (searchParams.get('startDate')) {
      filters.startDate = searchParams.get('startDate')!;
    }
    if (searchParams.get('endDate')) {
      filters.endDate = searchParams.get('endDate')!;
    }
    if (searchParams.get('type')) {
      filters.type = searchParams.get('type') as any;
    }
    if (searchParams.get('category')) {
      filters.category = searchParams.get('category') as any;
    }

    const transactions = await transactionService.getTransactions(filters);

    const response: ApiResponse<typeof transactions> = {
      success: true,
      data: transactions
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    const response: ApiResponse<null> = {
      success: false,
      error: error.message || 'Erro ao buscar transações'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

/**
 * Handler para POST /api/transactions
 */
export async function handleCreateTransaction(request: NextRequest) {
  try {
    const body: TransactionFormData = await request.json();

    // Validações básicas
    if (
      !body.description ||
      !body.amount ||
      !body.type ||
      !body.category ||
      !body.date ||
      !body.status
    ) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Todos os campos são obrigatórios'
      };
      return NextResponse.json(response, { status: 400 });
    }

    const transaction = await transactionService.addTransaction(body);

    const response: ApiResponse<typeof transaction> = {
      success: true,
      data: transaction,
      message: 'Transação criada com sucesso'
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    const response: ApiResponse<null> = {
      success: false,
      error: error.message || 'Erro ao criar transação'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

/**
 * Handler para GET /api/transactions/[id]
 */
export async function handleGetTransaction(id: string) {
  try {
    const transaction = await transactionService.getTransactionById(id);

    if (!transaction) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Transação não encontrada'
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<typeof transaction> = {
      success: true,
      data: transaction
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    const response: ApiResponse<null> = {
      success: false,
      error: error.message || 'Erro ao buscar transação'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

/**
 * Handler para PUT /api/transactions/[id]
 */
export async function handleUpdateTransaction(
  id: string,
  request: NextRequest
) {
  try {
    const body: Partial<TransactionFormData> = await request.json();

    const transaction = await transactionService.modifyTransaction(id, body);

    if (!transaction) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Transação não encontrada'
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<typeof transaction> = {
      success: true,
      data: transaction,
      message: 'Transação atualizada com sucesso'
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    const response: ApiResponse<null> = {
      success: false,
      error: error.message || 'Erro ao atualizar transação'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

/**
 * Handler para DELETE /api/transactions/[id]
 */
export async function handleDeleteTransaction(id: string) {
  try {
    const deleted = await transactionService.removeTransaction(id);

    if (!deleted) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Transação não encontrada'
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<null> = {
      success: true,
      message: 'Transação deletada com sucesso'
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    const response: ApiResponse<null> = {
      success: false,
      error: error.message || 'Erro ao deletar transação'
    };
    return NextResponse.json(response, { status: 500 });
  }
}
