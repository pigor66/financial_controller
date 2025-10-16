/**
 * Gráfico de barras - Previsto vs Real (mês atual)
 */

'use client';

import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { PredictedVsActual } from '@/shared/types';
import * as styles from './styles';

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
                backgroundColor: 'rgba(76, 175, 80, 0.7)',
                borderColor: '#4caf50',
                borderWidth: 2,
                borderRadius: 8,
                hoverBackgroundColor: 'rgba(76, 175, 80, 0.9)',
            },
            {
                label: 'Real',
                data: [data.actual.income, data.actual.expense, data.actual.balance],
                backgroundColor: 'rgba(33, 150, 243, 0.7)',
                borderColor: '#2196f3',
                borderWidth: 2,
                borderRadius: 8,
                hoverBackgroundColor: 'rgba(33, 150, 243, 0.9)',
            },
        ],
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -4 }}
        >
            <Card sx={styles.cardStyles}>
                <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={styles.titleStyles}>
                        {title}
                    </Typography>
                    <div style={{ height: 340 }}>
                        <Bar data={chartData} options={styles.chartOptions} />
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

