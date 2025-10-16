/**
 * Configuração e utilitários para Google Sheets API
 *
 * Este arquivo gerencia a conexão com a API do Google Sheets
 * usando uma Service Account para autenticação.
 */

import { google } from 'googleapis';
import { SHEETS_COLUMN_ORDER } from '@/shared/constants';
import { Transaction } from '@/shared/types';

// Configurações do Google Sheets
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

/**
 * Cria e retorna um cliente autenticado do Google Sheets
 */
export async function getSheetsClient() {
  // Debug - mostra o que está configurado
  console.log('📊 Google Sheets Config:');
  console.log('  GOOGLE_SPREADSHEET_ID:', process.env.GOOGLE_SPREADSHEET_ID ? '✅ SET' : '❌ NOT SET');
  console.log('  GOOGLE_SERVICE_ACCOUNT_EMAIL:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? '✅ SET' : '❌ NOT SET');
  console.log('  GOOGLE_PRIVATE_KEY:', process.env.GOOGLE_PRIVATE_KEY ? '✅ SET' : '❌ NOT SET');
  
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    throw new Error('❌ Google Sheets credentials not configured in .env.local');
  }

  try {
    // Autenticação usando Service Account
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
      },
      scopes: SCOPES
    });

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient as any });

    return sheets;
  } catch (error) {
    console.error('❌ Error authenticating with Google Sheets:', error);
    throw new Error('Failed to authenticate with Google Sheets');
  }
}

/**
 * Obtém o ID da planilha a partir das variáveis de ambiente
 */
export function getSpreadsheetId(): string {
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

  if (!spreadsheetId) {
    console.error('❌ GOOGLE_SPREADSHEET_ID not configured in .env.local');
    throw new Error('GOOGLE_SPREADSHEET_ID not configured');
  }

  return spreadsheetId;
}

/**
 * Inicializa a planilha com os cabeçalhos, se necessário
 */
export async function initializeSheet() {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();
    const sheetName = process.env.GOOGLE_SHEET_NAME || 'Transações';

    // Verifica se a planilha já tem dados
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1:I1`
    });

    // Se não tem dados, adiciona os cabeçalhos
    if (!response.data.values || response.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1:I1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [SHEETS_COLUMN_ORDER]
        }
      });

      console.log('Planilha inicializada com cabeçalhos');
    }
  } catch (error) {
    console.error('Erro ao inicializar planilha:', error);
    throw error;
  }
}

/**
 * Converte uma linha do Sheets em objeto Transaction
 */
export function rowToTransaction(row: any[]): Transaction {
  return {
    id: row[0] || '',
    description: row[1] || '',
    amount: parseFloat(row[2]) || 0,
    type: row[3] || '',
    category: row[4] || '',
    date: row[5] || '',
    status: row[6] || 'PAID', // Padrão PAID para compatibilidade com dados antigos
    createdAt: row[7] || '',
    updatedAt: row[8] || ''
  } as Transaction;
}

/**
 * Converte um objeto Transaction em uma linha do Sheets
 */
export function transactionToRow(transaction: Transaction): any[] {
  return [
    transaction.id,
    transaction.description,
    transaction.amount,
    transaction.type,
    transaction.category,
    transaction.date,
    transaction.status,
    transaction.createdAt,
    transaction.updatedAt
  ];
}

/**
 * Gera um ID único para uma nova transação
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Obtém a data/hora atual em formato ISO
 */
export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}
