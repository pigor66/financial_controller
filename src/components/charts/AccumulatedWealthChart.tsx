/**
 * Gráfico de Patrimônio Acumulado
 * Mostra a evolução do patrimônio total ao longo do tempo
 */

'use client';

import * as React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { TbMoneybag } from 'react-icons/tb';
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

export interface AccumulatedWealthDataPoint {
    month: string;
    accumulated: number;
}

interface AccumulatedWealthChartProps {
    data: AccumulatedWealthDataPoint[];
    title?: string;
}

export function AccumulatedWealthChart({
    data,
    title = 'Patrimônio Acumulado'
}: AccumulatedWealthChartProps) {
    // Calcula o valor inicial e final para mostrar o crescimento
    const initialValue = data.length > 0 ? data[0].accumulated : 0;
    const currentValue = data.length > 0 ? data[data.length - 1].accumulated : 0;
    const growth = currentValue - initialValue;
    const growthPercentage = initialValue !== 0 ? ((growth / Math.abs(initialValue)) * 100) : 0;

    const chartData = {
        labels: data.map(item => item.month),
        datasets: [
            {
                label: 'Patrimônio Acumulado',
                data: data.map(item => item.accumulated),
                borderColor: currentValue >= 0 ? '#4caf50' : '#ff4444',
                backgroundColor: currentValue >= 0
                    ? 'rgba(76, 175, 80, 0.1)'
                    : 'rgba(255, 68, 68, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: currentValue >= 0 ? '#4caf50' : '#ff4444',
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
                display: false,
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
                        const numValue = Number(value);
                        if (Math.abs(numValue) >= 1000) {
                            return 'R$ ' + (numValue / 1000).toFixed(1) + 'k';
                        }
                        return 'R$ ' + numValue.toFixed(0);
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
                        boxShadow: currentValue >= 0
                            ? '0 8px 32px rgba(76, 175, 80, 0.15)'
                            : '0 8px 32px rgba(255, 68, 68, 0.15)',
                        borderColor: currentValue >= 0 ? '#4caf50' : '#ff4444',
                    }
                }}
            >
                <CardContent sx={{ p: 3 }}>
                    {/* Header com ícone e título */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Box
                            sx={{
                                p: 1.5,
                                borderRadius: 2,
                                backgroundColor: currentValue >= 0
                                    ? 'rgba(76, 175, 80, 0.1)'
                                    : 'rgba(255, 68, 68, 0.1)',
                                color: currentValue >= 0 ? '#4caf50' : '#ff4444',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <TbMoneybag size={24} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {title}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#b0b0b0' }}>
                                Evolução total do seu patrimônio
                            </Typography>
                        </Box>
                    </Box>

                    {/* Valor atual e crescimento */}
                    <Box sx={{ mb: 3, p: 2, backgroundColor: '#121212', borderRadius: 2 }}>
                        <Typography variant="caption" sx={{ color: '#b0b0b0', display: 'block', mb: 1 }}>
                            Patrimônio Atual
                        </Typography>
                        <Typography
                            variant="h4"
                            sx={{
                                color: currentValue >= 0 ? '#4caf50' : '#ff4444',
                                fontWeight: 700,
                                mb: 1
                            }}
                        >
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(currentValue)}
                        </Typography>

                        {growth !== 0 && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: growth >= 0 ? '#4caf50' : '#ff4444',
                                        fontWeight: 600
                                    }}
                                >
                                    {growth >= 0 ? '+' : ''}{new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(growth)}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: growth >= 0 ? '#4caf50' : '#ff4444',
                                        fontWeight: 600
                                    }}
                                >
                                    ({growth >= 0 ? '+' : ''}{growthPercentage.toFixed(1)}%)
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#b0b0b0' }}>
                                    nos últimos {data.length} meses
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    {/* Gráfico */}
                    <div style={{ height: '280px' }}>
                        <Line data={chartData} options={options} />
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

