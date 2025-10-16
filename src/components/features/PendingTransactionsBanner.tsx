/**
 * Banner mostrando transações pendentes - Dark Mode
 */

'use client';

import * as React from 'react';
import { Alert, Box, Typography } from '@mui/material';
import { Transaction, PaymentStatus } from '@/shared/types';
import { formatCurrency } from '@/lib/utils';

interface PendingTransactionsBannerProps {
    transactions: Transaction[];
}

export function PendingTransactionsBanner({ transactions }: PendingTransactionsBannerProps) {
    const pendingTransactions = transactions.filter(t => t.status === PaymentStatus.PENDING);

    if (pendingTransactions.length === 0) {
        return null;
    }

    const totalPendingExpenses = pendingTransactions
        .filter(t => t.type === 'EXPENSE')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalPendingIncome = pendingTransactions
        .filter(t => t.type === 'INCOME')
        .reduce((sum, t) => sum + t.amount, 0);

    return (
        <Alert
            severity="warning"
            sx={{
                mb: 3,
                backgroundColor: '#2d2d2d',
                border: '1px solid #ff9800',
                '& .MuiAlert-icon': {
                    color: '#ff9800'
                }
            }}
        >
            <Typography variant="body2" fontWeight={600} gutterBottom sx={{ color: '#ffffff' }}>
                ⚠️ Você tem {pendingTransactions.length} transação(ões) pendente(s)
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, mt: 1 }}>
                {totalPendingExpenses > 0 && (
                    <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                        Despesas pendentes: <strong style={{ color: '#f44336' }}>{formatCurrency(totalPendingExpenses)}</strong>
                    </Typography>
                )}
                {totalPendingIncome > 0 && (
                    <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                        Receitas pendentes: <strong style={{ color: '#4caf50' }}>{formatCurrency(totalPendingIncome)}</strong>
                    </Typography>
                )}
            </Box>
        </Alert>
    );
}

