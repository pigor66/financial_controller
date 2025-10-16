/**
 * Gráfico de barras - Previsto vs Real (mês atual)
 */

'use client';

import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions
} from 'chart.js';
import { PredictedVsActual } from '@/shared/types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
    data: PredictedVsActual;
    title?: string;
}

export function PredictedVsActualBarChart({ data, title = 'Previsto vs Real (mês atual)' }: Props) {
    const labels = ['Receitas', 'Despesas', 'Saldo'];

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Previsto',
                data: [data.predicted.income, data.predicted.expense, data.predicted.balance],
                backgroundColor: 'rgba(76, 175, 80, 0.6)',
                borderColor: '#4caf50',
                borderWidth: 1,
            },
            {
                label: 'Real',
                data: [data.actual.income, data.actual.expense, data.actual.balance],
                backgroundColor: 'rgba(33, 150, 243, 0.6)',
                borderColor: '#2196f3',
                borderWidth: 1,
            },
        ],
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: '#e0e0e0' }
            },
            tooltip: {
                callbacks: {
                    label: (ctx) => {
                        return `${ctx.dataset.label}: ` + new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(ctx.parsed.y || 0));
                    }
                }
            },
            title: { display: false }
        },
        scales: {
            x: { ticks: { color: '#b0b0b0' }, grid: { color: '#1a1a1a' } },
            y: { ticks: { color: '#b0b0b0' }, grid: { color: '#1a1a1a' } }
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Card sx={{ backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a' }}>
                <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ color: '#ffffff', mb: 2, fontWeight: 600 }}>{title}</Typography>
                    <div style={{ height: 320 }}>
                        <Bar data={chartData} options={options} />
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
