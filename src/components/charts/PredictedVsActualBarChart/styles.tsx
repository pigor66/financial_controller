/**
 * Estilos do PredictedVsActualBarChart
 */

import { SxProps, Theme } from '@mui/material';
import { ChartOptions } from 'chart.js';

export const cardStyles: SxProps<Theme> = {
    backgroundColor: '#0a0a0a',
    border: '1px solid #1a1a1a',
    borderRadius: 3,
    transition: 'all 0.3s ease',
    '&:hover': {
        boxShadow: '0 12px 48px rgba(33, 150, 243, 0.2), 0 0 0 1px rgba(33, 150, 243, 0.3)',
        borderColor: '#2196f3',
    }
};

export const titleStyles: SxProps<Theme> = {
    color: '#ffffff',
    mb: 3,
    fontWeight: 700,
    fontSize: '1.1rem',
    letterSpacing: '-0.02em'
};

export const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                color: '#e0e0e0',
                font: { size: 13, weight: 500 },
                padding: 15,
                usePointStyle: true,
            }
        },
        tooltip: {
            backgroundColor: '#0a0a0a',
            titleColor: '#ffffff',
            bodyColor: '#e0e0e0',
            borderColor: '#333',
            borderWidth: 1,
            padding: 12,
            callbacks: {
                label: (ctx) => {
                    return `${ctx.dataset.label}: ` + new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(Number(ctx.parsed.y || 0));
                }
            }
        },
    },
    scales: {
        x: {
            ticks: { color: '#b0b0b0', font: { size: 13, weight: 500 } },
            grid: { color: '#1a1a1a' }
        },
        y: {
            ticks: {
                color: '#b0b0b0',
                font: { size: 12 },
                callback: (value) => 'R$ ' + (Number(value) / 1000).toFixed(1) + 'k'
            },
            grid: { color: '#1a1a1a' }
        }
    }
};

