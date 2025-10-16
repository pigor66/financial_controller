/**
 * Página de Relatórios
 */

'use client';

import * as React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid2 as Grid,
    Alert,
} from '@mui/material';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { formatCurrency } from '@/lib/utils';
import { DashboardStats } from '@/shared/types';
import { CATEGORY_LABELS } from '@/shared/constants';

export default function ReportsPage() {
    const [stats, setStats] = React.useState<DashboardStats | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/dashboard');
            const data = await response.json();

            if (data.success) {
                setStats(data.data);
            } else {
                setError(data.error || 'Erro ao carregar dados');
            }
        } catch (err) {
            setError('Erro ao conectar com o servidor');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <LoadingSpinner message="Carregando relatórios..." />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout>
                <Alert severity="error">{error}</Alert>
            </DashboardLayout>
        );
    }

    if (!stats) {
        return (
            <DashboardLayout>
                <Alert severity="warning">Nenhum dado disponível</Alert>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <Box>
                <Typography variant="h4" gutterBottom fontWeight={600}>
                    Relatórios
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Análise detalhada das suas finanças
                </Typography>

                {/* Resumo Mensal */}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Resumo do Mês Atual
                    </Typography>

                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Card>
                                <CardContent>
                                    <Typography color="text.secondary" gutterBottom>
                                        Total de Receitas
                                    </Typography>
                                    <Typography variant="h4" color="success.main" fontWeight={600}>
                                        {formatCurrency(stats.currentMonth.totalIncome)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Card>
                                <CardContent>
                                    <Typography color="text.secondary" gutterBottom>
                                        Total de Despesas
                                    </Typography>
                                    <Typography variant="h4" color="error.main" fontWeight={600}>
                                        {formatCurrency(stats.currentMonth.totalExpense)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Card>
                                <CardContent>
                                    <Typography color="text.secondary" gutterBottom>
                                        Saldo do Mês
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        color={stats.currentMonth.balance >= 0 ? 'success.main' : 'error.main'}
                                        fontWeight={600}
                                    >
                                        {formatCurrency(stats.currentMonth.balance)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>

                {/* Distribuição por Semanas */}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Distribuição Semanal
                    </Typography>

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        {stats.currentMonth.weeksSummary.map((week, index) => (
                            <Grid size={{ xs: 12, md: 6 }} key={index}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                            Semana {index + 1}
                                        </Typography>

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">
                                                    Receitas
                                                </Typography>
                                                <Typography variant="h6" color="success.main">
                                                    {formatCurrency(week.totalIncome)}
                                                </Typography>
                                            </Box>

                                            <Box>
                                                <Typography variant="caption" color="text.secondary">
                                                    Despesas
                                                </Typography>
                                                <Typography variant="h6" color="error.main">
                                                    {formatCurrency(week.totalExpense)}
                                                </Typography>
                                            </Box>

                                            <Box>
                                                <Typography variant="caption" color="text.secondary">
                                                    Saldo
                                                </Typography>
                                                <Typography
                                                    variant="h6"
                                                    color={week.balance >= 0 ? 'success.main' : 'error.main'}
                                                >
                                                    {formatCurrency(week.balance)}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                                            {week.transactions.length} transação(ões)
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Análise por Categorias */}
                {stats.topCategories.length > 0 && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Análise por Categorias de Despesas
                        </Typography>

                        <Card sx={{ mt: 2 }}>
                            <CardContent>
                                <Grid container spacing={2}>
                                    {stats.topCategories.map((cat, index) => (
                                        <Grid size={{ xs: 12 }} key={index}>
                                            <Box>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                                    <Typography variant="body1" fontWeight={500}>
                                                        {CATEGORY_LABELS[cat.category]}
                                                    </Typography>
                                                    <Typography variant="h6" fontWeight={600}>
                                                        {formatCurrency(cat.total)}
                                                    </Typography>
                                                </Box>

                                                <Box sx={{ display: 'flex', gap: 2 }}>
                                                    <Box
                                                        sx={{
                                                            flex: 1,
                                                            height: 8,
                                                            bgcolor: 'grey.200',
                                                            borderRadius: 1,
                                                            overflow: 'hidden',
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                width: `${cat.percentage}%`,
                                                                height: '100%',
                                                                bgcolor: 'error.main',
                                                            }}
                                                        />
                                                    </Box>
                                                    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 60 }}>
                                                        {cat.percentage.toFixed(1)}%
                                                    </Typography>
                                                </Box>

                                                <Typography variant="caption" color="text.secondary">
                                                    {cat.transactionCount} transação(ões)
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Box>
                )}

                {/* Insights */}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Insights
                    </Typography>

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        {stats.currentMonth.balance >= 0 ? (
                            <Grid size={{ xs: 12 }}>
                                <Alert severity="success">
                                    Parabéns! Você teve um saldo positivo de {formatCurrency(stats.currentMonth.balance)} este mês.
                                    Continue assim! 💪
                                </Alert>
                            </Grid>
                        ) : (
                            <Grid size={{ xs: 12 }}>
                                <Alert severity="warning">
                                    Atenção! Suas despesas ultrapassaram suas receitas em {formatCurrency(Math.abs(stats.currentMonth.balance))}.
                                    Tente reduzir gastos nas categorias principais.
                                </Alert>
                            </Grid>
                        )}

                        <Grid size={{ xs: 12 }}>
                            <Alert severity="info">
                                Você registrou {stats.currentMonth.weeksSummary.reduce((total, week) => total + week.transactions.length, 0)} transações este mês.
                                {stats.topCategories.length > 0 && ` Sua maior despesa foi em ${CATEGORY_LABELS[stats.topCategories[0].category]}.`}
                            </Alert>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </DashboardLayout>
    );
}

