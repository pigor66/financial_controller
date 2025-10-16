/**
 * Model de Transação - Camada de acesso aos dados do Google Sheets
 *
 * Responsável por todas as operações CRUD na planilha
 */

import {
  getSheetsClient,
  getSpreadsheetId,
  rowToTransaction,
  transactionToRow,
  generateId,
  getCurrentTimestamp
} from '@/lib/googleSheets';
import { Transaction, TransactionFormData } from '@/shared/types';

const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || 'Transações';

/**
 * Busca todas as transações da planilha
 */
export async function findAllTransactions(): Promise<Transaction[]> {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${SHEET_NAME}!A2:I` // A2 para pular o cabeçalho, I para incluir status
    });

    const rows = response.data.values || [];
    const transactions = rows.map(rowToTransaction);

    console.log('📊 Google Sheets Data:');
    console.log(`  Total rows in sheet: ${rows.length}`);

    if (transactions.length > 0) {
      console.log(`  First 3 transactions:`);
      transactions.slice(0, 3).forEach((t, i) => {
        console.log(
          `    ${i + 1}. Date: ${t.date} | ${t.description} | R$ ${
            t.amount
          } | ${t.type}`
        );
      });

      // Agrupa por ano para ver distribuição
      const byYear = transactions.reduce((acc, t) => {
        const year = t.date?.split('-')[0] || 'invalid';
        acc[year] = (acc[year] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      console.log(`  Transactions by year:`, byYear);
    } else {
      console.log(`  ⚠️  NO TRANSACTIONS FOUND IN GOOGLE SHEETS!`);
      console.log(
        `  Check: https://docs.google.com/spreadsheets/d/${spreadsheetId}`
      );
    }

    return transactions;
  } catch (error) {
    console.error('❌ Error fetching transactions:', error);
    throw new Error('Failed to fetch transactions');
  }
}

/**
 * Busca uma transação específica por ID
 */
export async function findTransactionById(
  id: string
): Promise<Transaction | null> {
  const transactions = await findAllTransactions();
  return transactions.find((t) => t.id === id) || null;
}

/**
 * Cria uma nova transação
 */
export async function createTransaction(
  data: TransactionFormData
): Promise<Transaction> {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();

    const now = getCurrentTimestamp();
    const newTransaction: Transaction = {
      id: generateId(),
      ...data,
      createdAt: now,
      updatedAt: now
    };

    const row = transactionToRow(newTransaction);

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${SHEET_NAME}!A:I`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [row]
      }
    });

    return newTransaction;
  } catch (error) {
    console.error('Erro ao criar transação:', error);
    throw new Error('Falha ao criar transação');
  }
}

/**
 * Atualiza uma transação existente
 */
export async function updateTransaction(
  id: string,
  data: Partial<TransactionFormData>
): Promise<Transaction | null> {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();

    // Busca todas as transações
    const transactions = await findAllTransactions();
    const index = transactions.findIndex((t) => t.id === id);

    if (index === -1) {
      return null;
    }

    // Atualiza a transação
    const updatedTransaction: Transaction = {
      ...transactions[index],
      ...data,
      updatedAt: getCurrentTimestamp()
    };

    const row = transactionToRow(updatedTransaction);
    const rowNumber = index + 2; // +2 porque: +1 para header, +1 para índice baseado em 1

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_NAME}!A${rowNumber}:I${rowNumber}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [row]
      }
    });

    return updatedTransaction;
  } catch (error) {
    console.error('Erro ao atualizar transação:', error);
    throw new Error('Falha ao atualizar transação');
  }
}

/**
 * Deleta uma transação
 */
export async function deleteTransaction(id: string): Promise<boolean> {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();

    // Busca todas as transações
    const transactions = await findAllTransactions();
    const index = transactions.findIndex((t) => t.id === id);

    if (index === -1) {
      return false;
    }

    const rowNumber = index + 2; // +2 porque: +1 para header, +1 para índice baseado em 1

    // Deleta a linha
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 0, // ID da primeira aba
                dimension: 'ROWS',
                startIndex: rowNumber - 1, // -1 porque o índice é baseado em 0
                endIndex: rowNumber
              }
            }
          }
        ]
      }
    });

    return true;
  } catch (error) {
    console.error('Erro ao deletar transação:', error);
    throw new Error('Falha ao deletar transação');
  }
}
