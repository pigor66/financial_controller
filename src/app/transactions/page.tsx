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
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    TablePagination
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { EmptyState } from '@/components/common/EmptyState';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Transaction, PaymentStatus, TransactionType, TransactionCategory } from '@/shared/types';
import { CATEGORY_LABELS, TYPE_LABELS, STATUS_LABELS } from '@/shared/constants';
import { PredictedVsActualCard } from '@/components/common/PredictedVsActualCard';

export default function TransactionsPage() {
    const router = useRouter();
    const [transactions, setTransactions] = React.useState<Transaction[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    // Filtros
    const [q, setQ] = React.useState('');
    const [type, setType] = React.useState<TransactionType | ''>('');
    const [category, setCategory] = React.useState<TransactionCategory | ''>('');
    const [status, setStatus] = React.useState<PaymentStatus | ''>('');
    const [dateFrom, setDateFrom] = React.useState('');
    const [dateTo, setDateTo] = React.useState('');
    // Paginação
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

    const filtered = React.useMemo(() => {
        const search = q.trim().toLowerCase();
        return transactions.filter(t => {
            const matchesText = !search ||
                t.description.toLowerCase().includes(search) ||
                String(t.amount).includes(search) ||
                t.id.toLowerCase().includes(search);

            const matchesType = !type || t.type === type;
            const matchesCategory = !category || t.category === category;
            const matchesStatus = !status || t.status === status;

            const tDate = new Date(t.date);
            const matchesFrom = !dateFrom || tDate >= new Date(dateFrom);
            const matchesTo = !dateTo || tDate <= new Date(dateTo);

            return matchesText && matchesType && matchesCategory && matchesStatus && matchesFrom && matchesTo;
        });
    }, [transactions, q, type, category, status, dateFrom, dateTo]);

    const paged = React.useMemo(() => {
        const start = page * rowsPerPage;
        return filtered.slice(start, start + rowsPerPage);
    }, [filtered, page, rowsPerPage]);

    const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    // Calcula previsto vs realizado com base nos filtros aplicados
    const predictedVsActual = React.useMemo(() => {
        const actualIncome = filtered.filter(t => t.status === PaymentStatus.PAID && t.type === 'INCOME').reduce((s, t) => s + t.amount, 0);
        const actualExpense = filtered.filter(t => t.status === PaymentStatus.PAID && t.type === 'EXPENSE').reduce((s, t) => s + t.amount, 0);
        const pendingIncome = filtered.filter(t => t.status === PaymentStatus.PENDING && t.type === 'INCOME').reduce((s, t) => s + t.amount, 0);
        const pendingExpense = filtered.filter(t => t.status === PaymentStatus.PENDING && t.type === 'EXPENSE').reduce((s, t) => s + t.amount, 0);
        return {
            predicted: { income: actualIncome + pendingIncome, expense: actualExpense + pendingExpense, balance: (actualIncome + pendingIncome) - (actualExpense + pendingExpense) },
            actual: { income: actualIncome, expense: actualExpense, balance: actualIncome - actualExpense },
            pending: { income: pendingIncome, expense: pendingExpense, balance: pendingIncome - pendingExpense }
        };
    }, [filtered]);

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
                    <>
                        {/* Previsto vs Realizado (com filtros aplicados) */}
                        <Box sx={{ mb: 2 }}>
                            <PredictedVsActualCard data={predictedVsActual} />
                        </Box>
                        {/* Filtros */}
                        <Card sx={{ mb: 2 }}>
                            <CardContent>
                                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} useFlexGap flexWrap="wrap">
                                    <TextField size="small" label="Buscar" placeholder="Descrição, valor ou ID" value={q} onChange={(e) => setQ(e.target.value)} />
                                    <TextField size="small" type="date" label="De" InputLabelProps={{ shrink: true }} value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                                    <TextField size="small" type="date" label="Até" InputLabelProps={{ shrink: true }} value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
                                    <FormControl size="small" sx={{ minWidth: 160 }}>
                                        <InputLabel>Tipo</InputLabel>
                                        <Select label="Tipo" value={type} onChange={(e) => setType(e.target.value as TransactionType)}>
                                            <MenuItem value="">Todos</MenuItem>
                                            <MenuItem value={TransactionType.INCOME}>{TYPE_LABELS[TransactionType.INCOME]}</MenuItem>
                                            <MenuItem value={TransactionType.EXPENSE}>{TYPE_LABELS[TransactionType.EXPENSE]}</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl size="small" sx={{ minWidth: 200 }}>
                                        <InputLabel>Categoria</InputLabel>
                                        <Select label="Categoria" value={category} onChange={(e) => setCategory(e.target.value as TransactionCategory)}>
                                            <MenuItem value="">Todas</MenuItem>
                                            {Object.values(TransactionCategory).map((c) => (
                                                <MenuItem key={c} value={c}>{CATEGORY_LABELS[c]}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl size="small" sx={{ minWidth: 160 }}>
                                        <InputLabel>Status</InputLabel>
                                        <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value as PaymentStatus)}>
                                            <MenuItem value="">Todos</MenuItem>
                                            <MenuItem value={PaymentStatus.PAID}>{STATUS_LABELS.PAID}</MenuItem>
                                            <MenuItem value={PaymentStatus.PENDING}>{STATUS_LABELS.PENDING}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </CardContent>
                        </Card>

                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Data</TableCell>
                                        <TableCell>Descrição</TableCell>
                                        <TableCell>Tipo</TableCell>
                                        <TableCell>Categoria</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell align="right">Valor</TableCell>
                                        <TableCell align="center">Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paged.map((transaction) => (
                                        <TableRow
                                            key={transaction.id}
                                            hover
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
                                                    color={transaction.type === 'INCOME' ? 'success.main' : 'error.main'}
                                                >
                                                    {transaction.type === 'INCOME' ? '+' : '-'} {formatCurrency(transaction.amount)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => router.push(`/transactions/edit/${transaction.id}`)}
                                                    title="Editar"
                                                    color="primary"
                                                >
                                                    ✏️
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleDelete(transaction.id)}
                                                    title="Deletar"
                                                    color="error"
                                                >
                                                    🗑️
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            component="div"
                            count={filtered.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={[5, 10, 25, 50]}
                        />
                    </>
                )}
            </Box>
        </DashboardLayout>
    );
}

