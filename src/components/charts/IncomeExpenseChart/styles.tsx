/**
 * Estilos do IncomeExpenseChart
 */

import { SxProps, Theme } from '@mui/material';
import { ChartOptions } from 'chart.js';

export const cardStyles: SxProps<Theme> = {
    backgroundColor: '#0a0a0a',
    border: '1px solid #1a1a1a',
    borderRadius: 3,
    transition: 'all 0.3s ease',
    '&:hover': {
        boxShadow: '0 12px 48px rgba(76, 175, 80, 0.15), 0 0 0 1px rgba(76, 175, 80, 0.2)',
        borderColor: '#4caf50',
        transform: 'translateY(-2px)',
    }
};

export const titleStyles: SxProps<Theme> = {
    color: '#ffffff',
    mb: 3,
    fontWeight: 700,
    fontSize: '1.1rem',
    letterSpacing: '-0.02em'
};

export const createGradient = (ctx: CanvasRenderingContext2D, color1: string, color2: string) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
};

export const getIncomeDataset = () => ({
    label: 'Receitas',
    borderColor: '#4caf50',
    borderWidth: 4,
    fill: true,
    tension: 0.4,
    pointRadius: 8,
    pointHoverRadius: 12,
    pointBackgroundColor: '#4caf50',
    pointBorderColor: '#fff',
    pointBorderWidth: 3,
    pointHoverBorderWidth: 4,
    shadowOffsetX: 0,
    shadowOffsetY: 4,
    shadowBlur: 10,
    shadowColor: 'rgba(76, 175, 80, 0.5)',
});

export const getExpenseDataset = () => ({
    label: 'Despesas',
    borderColor: '#ff4444',
    borderWidth: 4,
    fill: true,
    tension: 0.4,
    pointRadius: 8,
    pointHoverRadius: 12,
    pointBackgroundColor: '#ff4444',
    pointBorderColor: '#fff',
    pointBorderWidth: 3,
    pointHoverBorderWidth: 4,
    shadowOffsetX: 0,
    shadowOffsetY: 4,
    shadowBlur: 10,
    shadowColor: 'rgba(255, 68, 68, 0.5)',
});

export const getBalanceDataset = () => ({
    label: 'Saldo',
    borderColor: '#2196f3',
    borderWidth: 3,
    borderDash: [8, 4],
    fill: true,
    tension: 0.4,
    pointRadius: 6,
    pointHoverRadius: 10,
    pointBackgroundColor: '#2196f3',
    pointBorderColor: '#fff',
    pointBorderWidth: 3,
    pointHoverBorderWidth: 4,
});

export const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'top',
            labels: {
                color: '#e0e0e0',
                font: { size: 13, weight: 500 },
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
                    if (label) label += ': ';
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
            grid: { color: '#1a1a1a', lineWidth: 1 },
            ticks: { color: '#b0b0b0', font: { size: 12 } },
        },
        y: {
            grid: { color: '#1a1a1a', lineWidth: 1 },
            ticks: {
                color: '#b0b0b0',
                font: { size: 12 },
                callback: function (value) {
                    return 'R$ ' + (Number(value) / 1000).toFixed(0) + 'k';
                }
            },
        },
    },
    interaction: { intersect: false, mode: 'index' },
};

