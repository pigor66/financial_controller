/**
 * Donut - Composição (Receitas x Despesas x Cofrinho)
 */

'use client';

import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import * as styles from './styles';

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
                borderWidth: 2,
                hoverBorderWidth: 4,
                hoverBorderColor: '#ffffff',
                hoverOffset: 15,
            }
        ]
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -4 }}
        >
            <Card sx={styles.cardStyles}>
                <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={styles.titleStyles}>
                        {title}
                    </Typography>
                    <div style={{ height: 340 }}>
                        <Doughnut data={data} options={styles.chartOptions} />
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

