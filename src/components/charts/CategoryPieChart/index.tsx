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
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import * as styles from './styles';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryPieChartProps {
    data: CategorySummary[];
    title?: string;
}

export function CategoryPieChart({ data, title = 'Distribuição por Categoria' }: CategoryPieChartProps) {
    const chartData = {
        labels: data.map(item => item.category),
        datasets: [
            {
                ...styles.getDatasetConfig(data.length),
                data: data.map(item => item.total),
            },
        ],
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -4 }}
        >
            <Card sx={styles.cardStyles}>
                <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom sx={styles.titleStyles}>
                        {title}
                    </Typography>

                    {data.length > 0 ? (
                        <div style={{ height: '340px' }}>
                            <Doughnut data={chartData} options={styles.chartOptions} />
                        </div>
                    ) : (
                        <Box sx={styles.emptyStateStyles}>
                            <Typography>Nenhum dado disponível</Typography>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}

