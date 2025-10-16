/**
 * Gráfico de Pizza - Distribuição por Categorias
 * Mostra a distribuição percentual de despesas por categoria usando Chart.js
 */

'use client';

import * as React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { CategorySummary } from '@/shared/types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';

// Registra os componentes do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryPieChartProps {
    data: CategorySummary[];
    title?: string;
}

// Paleta de cores vibrantes para as categorias
const COLORS = [
    '#ff4444', // Vermelho
    '#4caf50', // Verde
    '#2196f3', // Azul
    '#ff9800', // Laranja
    '#9c27b0', // Roxo
    '#00bcd4', // Ciano
    '#ffeb3b', // Amarelo
    '#e91e63', // Rosa
    '#795548', // Marrom
    '#607d8b', // Cinza Azulado
];

export function CategoryPieChart({ data, title = 'Distribuição por Categoria' }: CategoryPieChartProps) {
    const chartData = {
        labels: data.map(item => item.category),
        datasets: [
            {
                label: 'Valor',
                data: data.map(item => item.total),
                backgroundColor: COLORS.slice(0, data.length),
                borderColor: '#0a0a0a',
                borderWidth: 3,
                hoverBorderColor: '#ffffff',
                hoverBorderWidth: 3,
                hoverOffset: 15,
            },
        ],
    };

    const options: ChartOptions<'doughnut'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    color: '#e0e0e0',
                    font: {
                        size: 12,
                        weight: 500,
                    },
                    padding: 12,
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
                        const label = context.label || '';
                        const value = context.parsed;
                        const total = context.dataset.data.reduce((a, b) => (a as number) + (b as number), 0) as number;
                        const percentage = ((value / total) * 100).toFixed(1);

                        return [
                            `${label}`,
                            `Valor: ${new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(value)}`,
                            `Percentual: ${percentage}%`
                        ];
                    }
                }
            }
        },
        cutout: '65%',
        animation: {
            animateRotate: true,
            animateScale: true,
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -4 }}
        >
            <Card
                sx={{
                    backgroundColor: '#0a0a0a',
                    border: '1px solid #1a1a1a',
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '0 8px 32px rgba(255, 68, 68, 0.15)',
                        borderColor: '#ff4444',
                    }
                }}
            >
                <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#ffffff', mb: 3, fontWeight: 600 }}>
                        {title}
                    </Typography>

                    {data.length > 0 ? (
                        <div style={{ height: '300px' }}>
                            <Doughnut data={chartData} options={options} />
                        </div>
                    ) : (
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 300,
                            color: '#707070'
                        }}>
                            <Typography>Nenhum dado disponível</Typography>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}

