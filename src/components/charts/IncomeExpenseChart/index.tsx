/**
 * Gráfico de Linha - Evolução de Receitas e Despesas
 * Mostra a evolução mensal de receitas e despesas ao longo do tempo usando Chart.js
 */

'use client';

import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import * as styles from './styles';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export interface MonthlyData {
    month: string;
    income: number;
    expense: number;
    balance: number;
}

interface IncomeExpenseChartProps {
    data: MonthlyData[];
    title?: string;
}

export function IncomeExpenseChart({ data, title = 'Evolução Mensal' }: IncomeExpenseChartProps) {
    const chartRef = React.useRef<any>(null);

    const chartData = {
        labels: data.map(item => item.month),
        datasets: [
            {
                ...styles.getIncomeDataset(),
                data: data.map(item => item.income),
                backgroundColor: (context: any) => {
                    const ctx = context.chart.ctx;
                    return styles.createGradient(ctx, 'rgba(76, 175, 80, 0.3)', 'rgba(76, 175, 80, 0.01)');
                },
            },
            {
                ...styles.getExpenseDataset(),
                data: data.map(item => item.expense),
                backgroundColor: (context: any) => {
                    const ctx = context.chart.ctx;
                    return styles.createGradient(ctx, 'rgba(255, 68, 68, 0.3)', 'rgba(255, 68, 68, 0.01)');
                },
            },
            {
                ...styles.getBalanceDataset(),
                data: data.map(item => item.balance),
                backgroundColor: (context: any) => {
                    const ctx = context.chart.ctx;
                    return styles.createGradient(ctx, 'rgba(33, 150, 243, 0.2)', 'rgba(33, 150, 243, 0.01)');
                },
            },
        ],
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
        >
            <Card sx={styles.cardStyles}>
                <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom sx={styles.titleStyles}>
                        {title}
                    </Typography>

                    <div style={{ height: '340px' }}>
                        <Line ref={chartRef} data={chartData} options={styles.chartOptions} />
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

