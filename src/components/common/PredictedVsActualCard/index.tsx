/**
 * Componente Previsto vs Realizado
 * Compara valores previstos (PAID + PENDING) com valores realizados (apenas PAID)
 */

'use client';

import * as React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress, Grid2 as Grid } from '@mui/material';
import { formatCurrency } from '@/lib/utils';
import { PredictedVsActual } from '@/shared/types';
import * as styles from './styles';

interface PredictedVsActualCardProps {
    data: PredictedVsActual;
}

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
    <Box sx={styles.sectionBoxStyles}>
        <Typography variant="subtitle2" sx={{ ...styles.titleStyles, color: `${color}.main` }}>
            {title}
        </Typography>
        <Box sx={{ ...styles.rowStyles, mb: 1 }}>
            <Typography variant="caption" color="text.secondary">Previsto</Typography>
            <Typography variant="caption" fontWeight={700}>{formatCurrency(predicted)}</Typography>
        </Box>
        <Box sx={{ ...styles.rowStyles, mb: 0.5 }}>
            <Typography variant="caption" color="text.secondary">Realizado</Typography>
            <Typography variant="caption" fontWeight={700} color={`${color}.main`}>
                {formatCurrency(actual)}
            </Typography>
        </Box>
        <LinearProgress 
            variant="determinate" 
            value={predicted > 0 ? Math.min((actual / predicted) * 100, 100) : 0} 
            sx={styles.progressBarStyles} 
        />
        <Typography variant="caption" color="text.secondary" sx={styles.progressTextStyles}>
            {(predicted > 0 ? (actual / predicted) * 100 : 0).toFixed(1)}% realizado
        </Typography>
        <Box sx={{ ...styles.rowStyles, mt: 1 }}>
            <Typography variant="caption" color="warning.main">Pendente</Typography>
            <Typography variant="caption" fontWeight={700} color="warning.main">
                {formatCurrency(pending)}
            </Typography>
        </Box>
    </Box>
);

export function PredictedVsActualCard({ data }: PredictedVsActualCardProps) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" sx={styles.cardTitleStyles}>
                    Previsto vs Realizado
                </Typography>
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

