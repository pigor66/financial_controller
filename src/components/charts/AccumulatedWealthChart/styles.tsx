/**
 * Estilos do AccumulatedWealthChart
 */

import { SxProps, Theme } from '@mui/material';
import { ChartOptions } from 'chart.js';

export const getCardStyles = (currentValue: number): SxProps<Theme> => ({
    backgroundColor: '#0a0a0a',
    border: '1px solid #1a1a1a',
    borderRadius: 3,
    transition: 'all 0.3s ease',
    '&:hover': {
        boxShadow: currentValue >= 0
            ? '0 12px 48px rgba(76, 175, 80, 0.2), 0 0 0 1px rgba(76, 175, 80, 0.3)'
            : '0 12px 48px rgba(255, 68, 68, 0.2), 0 0 0 1px rgba(255, 68, 68, 0.3)',
        borderColor: currentValue >= 0 ? '#4caf50' : '#ff4444',
    }
});

export const headerBoxStyles: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    mb: 3
};

export const getIconBoxStyles = (currentValue: number): SxProps<Theme> => ({
    p: 1.5,
    borderRadius: 2,
    backgroundColor: currentValue >= 0
        ? 'rgba(76, 175, 80, 0.15)'
        : 'rgba(255, 68, 68, 0.15)',
    color: currentValue >= 0 ? '#4caf50' : '#ff4444',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const headerTextBoxStyles: SxProps<Theme> = {
    flex: 1
};

export const titleStyles: SxProps<Theme> = {
    color: '#ffffff',
    fontWeight: 700,
    fontSize: '1.1rem',
    letterSpacing: '-0.02em'
};

export const subtitleStyles: SxProps<Theme> = {
    color: '#b0b0b0'
};

export const summaryBoxStyles: SxProps<Theme> = {
    mb: 3,
    p: 2,
    backgroundColor: '#121212',
    borderRadius: 2
};

export const summaryLabelStyles: SxProps<Theme> = {
    color: '#b0b0b0',
    display: 'block',
    mb: 1
};

export const getCurrentValueStyles = (currentValue: number): SxProps<Theme> => ({
    color: currentValue >= 0 ? '#4caf50' : '#ff4444',
    fontWeight: 700,
    mb: 1
});

export const growthBoxStyles: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
    gap: 1
};

export const getGrowthTextStyles = (growth: number): SxProps<Theme> => ({
    color: growth >= 0 ? '#4caf50' : '#ff4444',
    fontWeight: 600
});

export const periodLabelStyles: SxProps<Theme> = {
    color: '#b0b0b0'
};

export const createGradient = (ctx: CanvasRenderingContext2D, isPositive: boolean) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 280);
    if (isPositive) {
        gradient.addColorStop(0, 'rgba(76, 175, 80, 0.4)');
        gradient.addColorStop(1, 'rgba(76, 175, 80, 0.01)');
    } else {
        gradient.addColorStop(0, 'rgba(255, 68, 68, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 68, 68, 0.01)');
    }
    return gradient;
};

export const getChartOptions = (): ChartOptions<'line'> => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
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
                    const numValue = Number(value);
                    if (Math.abs(numValue) >= 1000) {
                        return 'R$ ' + (numValue / 1000).toFixed(1) + 'k';
                    }
                    return 'R$ ' + numValue.toFixed(0);
                }
            },
        },
    },
    interaction: { intersect: false, mode: 'index' },
});

