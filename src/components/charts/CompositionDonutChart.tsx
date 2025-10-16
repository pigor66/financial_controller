/**
 * Donut - Composição (Receitas x Despesas x Cofrinho)
 */

'use client';

import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
    income: number;
    expense: number;
    safeMoney: number;
    title?: string;
}

export function CompositionDonutChart({ income, expense, safeMoney, title = 'Composição do Mês' }: Props) {
    const data = {
        labels: ['Receitas', 'Despesas', 'Cofrinho'],
        datasets: [
            {
                data: [income, expense, safeMoney],
                backgroundColor: ['#4caf50', '#ff4444', '#2196f3'],
                borderColor: ['#4caf50', '#ff4444', '#2196f3'],
                borderWidth: 1
            }
        ]
    };

    const options = {
        plugins: {
            legend: { labels: { color: '#e0e0e0' } },
            tooltip: {
                callbacks: {
                    label: (ctx: any) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(ctx.parsed))
                }
            }
        }
    } as const;

    return (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Card sx={{ backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a' }}>
                <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ color: '#ffffff', mb: 2, fontWeight: 600 }}>{title}</Typography>
                    <div style={{ height: 300 }}>
                        <Doughnut data={data} options={options} />
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
