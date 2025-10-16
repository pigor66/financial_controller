/**
 * Página de listagem de transações
 */

'use client';

import * as React from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Chip,
    IconButton,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { EmptyState } from '@/components/common/EmptyState';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Transaction, PaymentStatus } from '@/shared/types';
import { CATEGORY_LABELS, TYPE_LABELS, STATUS_LABELS } from '@/shared/constants';

export default function TransactionsPage() {
    const router = useRouter();
    const [transactions, setTransactions] = React.useState<Transaction[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/transactions');
            const data = await response.json();

            if (data.success) {
                setTransactions(data.data);
            } else {
                setError(data.error || 'Erro ao carregar transações');
            }
        } catch (err) {
            setError('Erro ao conectar com o servidor');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja deletar esta transação?')) {
            return;
        }

        try {
            const response = await fetch(`/api/transactions/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                setTransactions(transactions.filter(t => t.id !== id));
            } else {
                alert(data.error || 'Erro ao deletar transação');
            }
        } catch (err) {
            alert('Erro ao conectar com o servidor');
            console.error(err);
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <LoadingSpinner message="Carregando transações..." />
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box>
                        <Typography variant="h4" gutterBottom fontWeight={600} sx={{ color: '#ffffff' }}>
                            Transações
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                            Gerencie todas as suas transações financeiras
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        onClick={() => router.push('/transactions/new')}
                        sx={{
                            backgroundColor: '#ff4444',
                            '&:hover': {
                                backgroundColor: '#cc0000',
                            }
                        }}
                    >
                        + Nova Transação
                    </Button>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {transactions.length === 0 ? (
                    <EmptyState
                        title="Nenhuma transação encontrada"
                        description="Comece adicionando sua primeira transação financeira"
                        actionLabel="Nova Transação"
                        onAction={() => router.push('/transactions/new')}
                    />
                ) : (
                    <TableContainer
                        component={Paper}
                        sx={{
                            backgroundColor: '#212121',
                            border: '1px solid #333333',
                            borderRadius: 2
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#333333' }}>
                                    <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Data</TableCell>
                                    <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Descrição</TableCell>
                                    <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Tipo</TableCell>
                                    <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Categoria</TableCell>
                                    <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Status</TableCell>
                                    <TableCell align="right" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Valor</TableCell>
                                    <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.map((transaction) => (
                                    <TableRow
                                        key={transaction.id}
                                        hover
                                        sx={{
                                            '&:hover': { backgroundColor: '#333333' },
                                            '& td': { color: '#ffffff', borderColor: '#333333' }
                                        }}
                                    >
                                        <TableCell>{formatDate(transaction.date)}</TableCell>
                                        <TableCell>{transaction.description}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={TYPE_LABELS[transaction.type]}
                                                color={transaction.type === 'INCOME' ? 'success' : 'error'}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>{CATEGORY_LABELS[transaction.category]}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={STATUS_LABELS[transaction.status || PaymentStatus.PAID]}
                                                color={transaction.status === PaymentStatus.PAID ? 'success' : 'warning'}
                                                size="small"
                                                variant={transaction.status === PaymentStatus.PENDING ? 'outlined' : 'filled'}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography
                                                variant="body2"
                                                fontWeight={600}
                                                sx={{
                                                    color: transaction.type === 'INCOME' ? '#4caf50' : '#f44336'
                                                }}
                                            >
                                                {transaction.type === 'INCOME' ? '+' : '-'} {formatCurrency(transaction.amount)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                size="small"
                                                onClick={() => router.push(`/transactions/edit/${transaction.id}`)}
                                                title="Editar"
                                                sx={{ color: '#ff4444' }}
                                            >
                                                ✏️
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleDelete(transaction.id)}
                                                title="Deletar"
                                                sx={{ color: '#f44336' }}
                                            >
                                                🗑️
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </DashboardLayout>
    );
}

