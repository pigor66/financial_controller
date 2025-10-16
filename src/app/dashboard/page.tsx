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
import { PredictedVsActualCard } from '@/components/common/PredictedVsActualCard';
import { AnimatedIcon } from '@/components/common/AnimatedIcon';
import { IncomeExpenseChart } from '@/components/charts/IncomeExpenseChart';
import { CategoryPieChart } from '@/components/charts/CategoryPieChart';
import { PredictedVsActualBarChart } from '@/components/charts/PredictedVsActualBarChart';
import { CompositionDonutChart } from '@/components/charts/CompositionDonutChart';
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

        {/* Previsto vs Realizado (Card Resumido) */}
        {stats.predictedVsActual && (
          <Box sx={{ mb: 3 }}>
            <PredictedVsActualCard data={stats.predictedVsActual} />
          </Box>
        )}

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
                forecastValue={formatCurrency((stats.predictedVsActual?.predicted.income || 0))}
                progressPercent={(stats.predictedVsActual && stats.predictedVsActual.predicted.income > 0)
                  ? (stats.predictedVsActual.actual.income / stats.predictedVsActual.predicted.income) * 100
                  : 0}
                sparklineData={stats.weeklySparklineData?.income}
                sparklineType="line"
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
                forecastValue={formatCurrency((stats.predictedVsActual?.predicted.expense || 0))}
                progressPercent={(stats.predictedVsActual && stats.predictedVsActual.predicted.expense > 0)
                  ? (stats.predictedVsActual.actual.expense / stats.predictedVsActual.predicted.expense) * 100
                  : 0}
                sparklineData={stats.weeklySparklineData?.expense}
                sparklineType="line"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatsCard
                title="Saldo Semanal"
                value={formatCurrency(stats.currentWeek.balance)}
                color={stats.currentWeek.balance >= 0 ? 'success' : 'error'}
                icon={<AnimatedIcon animationType="scale" color={stats.currentWeek.balance >= 0 ? '#4caf50' : '#ff4444'}><FaWallet size={40} /></AnimatedIcon>}
                delay={0.2}
                forecastValue={formatCurrency((stats.predictedVsActual?.predicted.balance || 0))}
                progressPercent={(stats.predictedVsActual && stats.predictedVsActual.predicted.balance !== 0)
                  ? (stats.predictedVsActual.actual.balance / Math.abs(stats.predictedVsActual.predicted.balance)) * 100
                  : 0}
                sparklineData={stats.weeklySparklineData?.balance}
                sparklineType="line"
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
                sparklineData={stats.monthlySparklineData?.income}
                sparklineType="line"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatsCard
                title="Despesas do Mês"
                value={formatCurrency(stats.currentMonth.totalExpense)}
                color="error"
                icon={<AnimatedIcon animationType="pulse" color="#ff4444"><FaChartPie size={40} /></AnimatedIcon>}
                delay={0.4}
                sparklineData={stats.monthlySparklineData?.expense}
                sparklineType="line"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatsCard
                title="Saldo Mensal"
                value={formatCurrency(stats.currentMonth.balance)}
                color={stats.currentMonth.balance >= 0 ? 'success' : 'error'}
                icon={<AnimatedIcon animationType="rotate" color={stats.currentMonth.balance >= 0 ? '#4caf50' : '#ff4444'}><TbMoneybag size={48} /></AnimatedIcon>}
                delay={0.5}
                sparklineData={stats.monthlySparklineData?.balance}
                sparklineType="line"
              />
            </Grid>

            {/* Cofrinho (Safe Money) */}
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <StatsCard
                title="Cofrinho (Safe Money)"
                value={formatCurrency(stats.safeMoney || 0)}
                color="info"
                delay={0.6}
                sparklineData={{
                  labels: ['Cofrinho', 'Disponível'],
                  datasets: [{
                    data: [
                      stats.safeMoney || 0,
                      (stats.currentMonth.totalIncome - (stats.safeMoney || 0))
                    ],
                    backgroundColor: '#00bcd4',
                    borderColor: '#00bcd4',
                    borderWidth: 1
                  }]
                }}
                sparklineType="doughnut"
              />
            </Grid>

            {/* Disponível para Gastar */}
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <StatsCard
                title="Disponível para Gastar (Previsto | Real)"
                value={`${formatCurrency(stats.availableToSpendPredicted || stats.availableToSpend || 0)} | ${formatCurrency(stats.availableToSpendReal || 0)}`}
                color={(stats.availableToSpend || 0) >= 0 ? 'success' : 'error'}
                delay={0.7}
                sparklineData={{
                  labels: ['Previsto', 'Real'],
                  datasets: [{
                    data: [
                      stats.availableToSpendPredicted || stats.availableToSpend || 0,
                      stats.availableToSpendReal || 0
                    ],
                    backgroundColor: '#f59e0b',
                    borderColor: '#f59e0b',
                    borderWidth: 1
                  }]
                }}
                sparklineType="bar"
              />
            </Grid>
          </Grid>
        </Box>

        {/* Gráficos de Análise (prioridade para gráficos) */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#ffffff', mb: 3 }}>
            Análise Financeira
          </Typography>

          <Grid container spacing={3}>


            <Grid size={{ xs: 12, md: 5, lg: 4 }}>
              <CompositionDonutChart
                income={stats.currentMonth.totalIncome}
                expense={stats.currentMonth.totalExpense}
                safeMoney={stats.safeMoney || 0}
              />
            </Grid>

            {/* Linha 2: Evolução 6 meses + Patrimônio Acumulado */}
            {stats.monthlyHistory && stats.monthlyHistory.length > 0 && (
              <Grid size={{ xs: 12, md: 7, lg: 8 }}>
                <IncomeExpenseChart
                  data={stats.monthlyHistory}
                  title="Evolução de Receitas e Despesas (6 meses)"
                />
              </Grid>
            )}

            {stats.accumulatedWealth && stats.accumulatedWealth.length > 0 && (
              <Grid size={{ xs: 12 }}>
                <AccumulatedWealthChart
                  data={stats.accumulatedWealth}
                  title="Patrimônio Acumulado"
                />
              </Grid>
            )}

            {/* Linha 3: Pizza de Categorias (full width) */}
            {stats.topCategories.length > 0 && (
              <Grid size={{ xs: 12, md: 5, lg: 4 }}>
                <CategoryPieChart data={stats.topCategories} title="Despesas por Categoria" />
              </Grid>
            )}
            {/* Linha 1: Previsto vs Real (grande) + Composição (pequeno) */}
            {stats.predictedVsActual && (
              <Grid size={{ xs: 12, md: 7, lg: 8 }}>
                <PredictedVsActualBarChart data={stats.predictedVsActual} />
              </Grid>
            )}
          </Grid>
        </Box>



      </Box>
    </DashboardLayout>
  );
}

