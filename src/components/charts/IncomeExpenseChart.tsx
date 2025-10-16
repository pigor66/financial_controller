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
    ChartOptions,
} from 'chart.js';

// Registra os componentes do Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

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
    const chartData = {
        labels: data.map(item => item.month),
        datasets: [
            {
                label: 'Receitas',
                data: data.map(item => item.income),
                borderColor: '#4caf50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: '#4caf50',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
            },
            {
                label: 'Despesas',
                data: data.map(item => item.expense),
                borderColor: '#ff4444',
                backgroundColor: 'rgba(255, 68, 68, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: '#ff4444',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
            },
            {
                label: 'Saldo',
                data: data.map(item => item.balance),
                borderColor: '#2196f3',
                backgroundColor: 'rgba(33, 150, 243, 0.05)',
                borderWidth: 2,
                borderDash: [5, 5],
                fill: false,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#2196f3',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#e0e0e0',
                    font: {
                        size: 13,
                        weight: 500,
                    },
                    padding: 15,
                    usePointStyle: true,
                    pointStyle: 'circle',
                },
            },
            tooltip: {
                backgroundColor: '#0a0a0a',
                titleColor: '#ffffff',
                bodyColor: '#e0e0e0',
                borderColor: '#333',
                borderWidth: 1,
                padding: 12,
                displayColors: true,
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: '#1a1a1a',
                    lineWidth: 1,
                },
                ticks: {
                    color: '#b0b0b0',
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                grid: {
                    color: '#1a1a1a',
                    lineWidth: 1,
                },
                ticks: {
                    color: '#b0b0b0',
                    font: {
                        size: 12,
                    },
                    callback: function (value) {
                        return 'R$ ' + (Number(value) / 1000).toFixed(0) + 'k';
                    }
                },
            },
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
        >
            <Card
                sx={{
                    backgroundColor: '#0a0a0a',
                    border: '1px solid #1a1a1a',
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '0 8px 32px rgba(33, 150, 243, 0.15)',
                        borderColor: '#2196f3',
                    }
                }}
            >
                <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#ffffff', mb: 3, fontWeight: 600 }}>
                        {title}
                    </Typography>

                    <div style={{ height: '300px' }}>
                        <Line data={chartData} options={options} />
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

