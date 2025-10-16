/**
 * Componente Previsto vs Realizado
 * Compara valores previstos (PAID + PENDING) com valores realizados (apenas PAID)
 */

'use client';

import * as React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress, Grid2 as Grid } from '@mui/material';
import { formatCurrency } from '@/lib/utils';
import { PredictedVsActual } from '@/shared/types';

interface PredictedVsActualCardProps {
    data: PredictedVsActual;
}

export function PredictedVsActualCard({ data }: PredictedVsActualCardProps) {
    const incomePct = data.predicted.income > 0 ? (data.actual.income / data.predicted.income) * 100 : 0;
    const expensePct = data.predicted.expense > 0 ? (data.actual.expense / data.predicted.expense) * 100 : 0;
    const balancePct = data.predicted.balance !== 0 ? (data.actual.balance / Math.abs(data.predicted.balance)) * 100 : 0;

    const Section = ({
        title,
        predicted,
        actual,
        pending,
        color
    }: {
        title: string;
        predicted: number;
        actual: number;
        pending: number;
        color: 'success' | 'error' | 'info';
    }) => (
        <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle2" sx={{ color: `${color}.main`, fontWeight: 700, mb: 1 }}>
                {title}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" color="text.secondary">Previsto</Typography>
                <Typography variant="caption" fontWeight={700}>{formatCurrency(predicted)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary">Realizado</Typography>
                <Typography variant="caption" fontWeight={700} color={`${color}.main`}>{formatCurrency(actual)}</Typography>
            </Box>
            <LinearProgress variant="determinate" value={predicted > 0 ? Math.min((actual / predicted) * 100, 100) : 0} sx={{ height: 6, borderRadius: 1, mb: 0.5 }} />
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>{(predicted > 0 ? (actual / predicted) * 100 : 0).toFixed(1)}% realizado</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="caption" color="warning.main">Pendente</Typography>
                <Typography variant="caption" fontWeight={700} color="warning.main">{formatCurrency(pending)}</Typography>
            </Box>
        </Box>
    );

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Previsto vs Realizado</Typography>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Section
                            title="Receitas"
                            predicted={data.predicted.income}
                            actual={data.actual.income}
                            pending={data.pending.income}
                            color="success"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Section
                            title="Despesas"
                            predicted={data.predicted.expense}
                            actual={data.actual.expense}
                            pending={data.pending.expense}
                            color="error"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Section
                            title="Saldo"
                            predicted={data.predicted.balance}
                            actual={data.actual.balance}
                            pending={data.pending.balance}
                            color="info"
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
