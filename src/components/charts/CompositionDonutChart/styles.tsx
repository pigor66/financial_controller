/**
 * Estilos do CompositionDonutChart
 */

import { SxProps, Theme } from '@mui/material';

export const cardStyles: SxProps<Theme> = {
    backgroundColor: '#0a0a0a',
    border: '1px solid #1a1a1a',
    borderRadius: 3,
    transition: 'all 0.3s ease',
    '&:hover': {
        boxShadow: '0 12px 48px rgba(255, 152, 0, 0.2), 0 0 0 1px rgba(255, 152, 0, 0.3)',
        borderColor: '#ff9800',
    }
};

export const titleStyles: SxProps<Theme> = {
    color: '#ffffff',
    mb: 3,
    fontWeight: 700,
    fontSize: '1.1rem',
    letterSpacing: '-0.02em'
};

export const chartOptions = {
    plugins: {
        legend: {
            labels: {
                color: '#e0e0e0',
                font: { size: 13, weight: 500 },
                padding: 15,
                usePointStyle: true,
            },
            position: 'bottom' as const
        },
        tooltip: {
            backgroundColor: '#0a0a0a',
            titleColor: '#ffffff',
            bodyColor: '#e0e0e0',
            borderColor: '#333',
            borderWidth: 1,
            padding: 12,
            callbacks: {
                label: (ctx: any) => new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(Number(ctx.parsed))
            }
        }
    },
    cutout: '68%',
    animation: {
        animateRotate: true,
        animateScale: true,
    },
};

