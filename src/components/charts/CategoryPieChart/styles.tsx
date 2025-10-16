/**
 * Estilos do CategoryPieChart
 */

import { SxProps, Theme } from '@mui/material';
import { ChartOptions } from 'chart.js';

export const COLORS = [
    '#FF6B6B', // Vermelho coral
    '#4ECDC4', // Turquesa
    '#45B7D1', // Azul céu
    '#FFA07A', // Salmão
    '#98D8C8', // Verde menta
    '#F7DC6F', // Amarelo ouro
    '#BB8FCE', // Roxo lavanda
    '#F8B88B', // Pêssego
    '#85C1E2', // Azul claro
    '#F6A5C0', // Rosa suave
];

export const cardStyles: SxProps<Theme> = {
    backgroundColor: '#0a0a0a',
    border: '1px solid #1a1a1a',
    borderRadius: 3,
    transition: 'all 0.3s ease',
    '&:hover': {
        boxShadow: '0 12px 48px rgba(255, 68, 68, 0.2), 0 0 0 1px rgba(255, 68, 68, 0.3)',
        borderColor: '#ff4444',
    }
};

export const titleStyles: SxProps<Theme> = {
    color: '#ffffff',
    mb: 3,
    fontWeight: 700,
    fontSize: '1.1rem',
    letterSpacing: '-0.02em'
};

export const emptyStateStyles: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    color: '#707070'
};

export const getDatasetConfig = (dataLength: number) => ({
    label: 'Valor',
    backgroundColor: COLORS.slice(0, dataLength),
    borderColor: '#0a0a0a',
    borderWidth: 3,
    hoverBorderColor: '#ffffff',
    hoverBorderWidth: 4,
    hoverOffset: 20,
});

export const chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                color: '#e0e0e0',
                font: { size: 12, weight: 500 },
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
    cutout: '68%',
    animation: {
        animateRotate: true,
        animateScale: true,
    },
};

