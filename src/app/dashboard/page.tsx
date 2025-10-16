/**
 * Página do Dashboard
 */

'use client';

import * as React from 'react';
import {
    Box,
    Typography,
    Grid2 as Grid,
    Card,
    CardContent,
    Alert,
} from '@mui/material';
import {
    FaArrowTrendUp,
    FaArrowTrendDown,
    FaWallet,
    FaChartLine,
    FaChartPie
} from 'react-icons/fa6';
import { TbMoneybag } from 'react-icons/tb';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/common/StatsCard';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { MonthSelector } from '@/components/common/MonthSelector';
import { PendingTransactionsBanner } from '@/components/features/PendingTransactionsBanner';
import { AnimatedIcon } from '@/components/common/AnimatedIcon';
import { IncomeExpenseChart } from '@/components/charts/IncomeExpenseChart';
import { CategoryPieChart } from '@/components/charts/CategoryPieChart';
import { AccumulatedWealthChart } from '@/components/charts/AccumulatedWealthChart';
import { formatCurrency, formatDate } from '@/lib/utils';
import { DashboardStats } from '@/shared/types';

export default function DashboardPage() {
    const [stats, setStats] = React.useState<DashboardStats | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

    React.useEffect(() => {
        fetchDashboardStats();
    }, [selectedDate]);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            setError(null);

            // Formata a data para enviar à API (YYYY-MM)
            const year = selectedDate.getFullYear();
            const month = selectedDate.getMonth() + 1; // getMonth() retorna 0-11
            const dateParam = `${year}-${String(month).padStart(2, '0')}`;

            const response = await fetch(`/api/dashboard?date=${dateParam}`);
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

    const handleDateChange = (newDate: Date) => {
        setSelectedDate(newDate);
    };

    if (loading) {
        return (
            <DashboardLayout>
                <LoadingSpinner message="Carregando dashboard..." />
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
                <Typography variant="h4" gutterBottom fontWeight={600} sx={{ color: '#ffffff' }}>
                    Dashboard
                </Typography>
                <Typography variant="body2" sx={{ color: '#b0b0b0' }} gutterBottom>
                    Visão geral das suas finanças
                </Typography>

                {/* Seletor de Mês */}
                <MonthSelector selectedDate={selectedDate} onDateChange={handleDateChange} />

                {/* Alerta de Transações Pendentes */}
                <PendingTransactionsBanner transactions={stats.currentMonth.weeksSummary.flatMap(w => w.transactions)} />

                {/* Resumo Semanal */}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
                        Semana Atual ({formatDate(stats.currentWeek.weekStart)} - {formatDate(stats.currentWeek.weekEnd)})
                    </Typography>

                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <StatsCard
                                title="Receitas"
                                value={formatCurrency(stats.currentWeek.totalIncome)}
                                color="success"
                                subtitle={`${stats.currentWeek.transactions.filter(t => t.type === 'INCOME').length} transação(ões)`}
                                icon={<AnimatedIcon animationType="bounce" color="#4caf50"><FaArrowTrendUp size={40} /></AnimatedIcon>}
                                delay={0}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <StatsCard
                                title="Despesas"
                                value={formatCurrency(stats.currentWeek.totalExpense)}
                                color="error"
                                subtitle={`${stats.currentWeek.transactions.filter(t => t.type === 'EXPENSE').length} transação(ões)`}
                                icon={<AnimatedIcon animationType="pulse" color="#ff4444"><FaArrowTrendDown size={40} /></AnimatedIcon>}
                                delay={0.1}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <StatsCard
                                title="Saldo Semanal"
                                value={formatCurrency(stats.currentWeek.balance)}
                                color={stats.currentWeek.balance >= 0 ? 'success' : 'error'}
                                icon={<AnimatedIcon animationType="scale" color={stats.currentWeek.balance >= 0 ? '#4caf50' : '#ff4444'}><FaWallet size={40} /></AnimatedIcon>}
                                delay={0.2}
                            />
                        </Grid>
                    </Grid>
                </Box>

                {/* Resumo Mensal */}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
                        Mês Atual
                    </Typography>

                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <StatsCard
                                title="Receitas do Mês"
                                value={formatCurrency(stats.currentMonth.totalIncome)}
                                color="success"
                                icon={<AnimatedIcon animationType="bounce" color="#4caf50"><FaChartLine size={40} /></AnimatedIcon>}
                                delay={0.3}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <StatsCard
                                title="Despesas do Mês"
                                value={formatCurrency(stats.currentMonth.totalExpense)}
                                color="error"
                                icon={<AnimatedIcon animationType="pulse" color="#ff4444"><FaChartPie size={40} /></AnimatedIcon>}
                                delay={0.4}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <StatsCard
                                title="Saldo Mensal"
                                value={formatCurrency(stats.currentMonth.balance)}
                                color={stats.currentMonth.balance >= 0 ? 'success' : 'error'}
                                icon={<AnimatedIcon animationType="rotate" color={stats.currentMonth.balance >= 0 ? '#4caf50' : '#ff4444'}><TbMoneybag size={48} /></AnimatedIcon>}
                                delay={0.5}
                            />
                        </Grid>
                    </Grid>
                </Box>

                {/* Gráficos de Análise */}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#ffffff', mb: 3 }}>
                        Análise Financeira
                    </Typography>

                    <Grid container spacing={3}>
                        {/* Gráfico de Evolução Mensal */}
                        {stats.monthlyHistory && stats.monthlyHistory.length > 0 && (
                            <Grid size={{ xs: 12, lg: 8 }}>
                                <IncomeExpenseChart
                                    data={stats.monthlyHistory}
                                    title="Evolução de Receitas e Despesas (6 meses)"
                                />
                            </Grid>
                        )}

                        {/* Gráfico de Pizza de Categorias */}
                        {stats.topCategories.length > 0 && (
                            <Grid size={{ xs: 12, lg: 4 }}>
                                <CategoryPieChart
                                    data={stats.topCategories}
                                    title="Despesas por Categoria"
                                />
                            </Grid>
                        )}
                    </Grid>
                </Box>

                {/* Gráfico de Patrimônio Acumulado */}
                {stats.accumulatedWealth && stats.accumulatedWealth.length > 0 && (
                    <Box sx={{ mt: 4 }}>
                        <AccumulatedWealthChart
                            data={stats.accumulatedWealth}
                            title="Patrimônio Acumulado"
                        />
                    </Box>
                )}

                {/* Top Categorias (Tabela Detalhada) */}
                {stats.topCategories.length > 0 && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
                            Principais Categorias de Despesas
                        </Typography>

                        <Card sx={{
                            mt: 2,
                            backgroundColor: '#0a0a0a',
                            border: '1px solid #1a1a1a',
                            borderRadius: 2
                        }}>
                            <CardContent>
                                <Grid container spacing={2}>
                                    {stats.topCategories.map((cat, index) => (
                                        <Grid size={{ xs: 12 }} key={index}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography variant="body1" sx={{ color: '#ffffff' }}>
                                                    {cat.category}
                                                </Typography>
                                                <Box sx={{ textAlign: 'right' }}>
                                                    <Typography variant="body1" fontWeight={600} sx={{ color: '#ffffff' }}>
                                                        {formatCurrency(cat.total)}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                                                        {cat.percentage.toFixed(1)}% ({cat.transactionCount} transações)
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Box>
                )}
            </Box>
        </DashboardLayout>
    );
}

