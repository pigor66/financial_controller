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
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import * as styles from './styles';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export interface AccumulatedWealthDataPoint {
    month: string;
    accumulated: number;
}

interface AccumulatedWealthChartProps {
    data: AccumulatedWealthDataPoint[];
    title?: string;
}

export function AccumulatedWealthChart({ data, title = 'Patrimônio Acumulado' }: AccumulatedWealthChartProps) {
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
                backgroundColor: (context: any) => {
                    const ctx = context.chart.ctx;
                    return styles.createGradient(ctx, currentValue >= 0);
                },
                borderWidth: 4,
                fill: true,
                tension: 0.4,
                pointRadius: 8,
                pointHoverRadius: 12,
                pointBackgroundColor: currentValue >= 0 ? '#4caf50' : '#ff4444',
                pointBorderColor: '#fff',
                pointBorderWidth: 3,
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
            <Card sx={styles.getCardStyles(currentValue)}>
                <CardContent sx={{ p: 3 }}>
                    <Box sx={styles.headerBoxStyles}>
                        <Box sx={styles.getIconBoxStyles(currentValue)}>
                            <TbMoneybag size={24} />
                        </Box>
                        <Box sx={styles.headerTextBoxStyles}>
                            <Typography variant="h6" sx={styles.titleStyles}>{title}</Typography>
                            <Typography variant="caption" sx={styles.subtitleStyles}>
                                Evolução total do seu patrimônio
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={styles.summaryBoxStyles}>
                        <Typography variant="caption" sx={styles.summaryLabelStyles}>
                            Patrimônio Atual
                        </Typography>
                        <Typography variant="h4" sx={styles.getCurrentValueStyles(currentValue)}>
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(currentValue)}
                        </Typography>

                        {growth !== 0 && (
                            <Box sx={styles.growthBoxStyles}>
                                <Typography variant="body2" sx={styles.getGrowthTextStyles(growth)}>
                                    {growth >= 0 ? '+' : ''}{new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(growth)}
                                </Typography>
                                <Typography variant="body2" sx={styles.getGrowthTextStyles(growth)}>
                                    ({growth >= 0 ? '+' : ''}{growthPercentage.toFixed(1)}%)
                                </Typography>
                                <Typography variant="caption" sx={styles.periodLabelStyles}>
                                    nos últimos {data.length} meses
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    <div style={{ height: '280px' }}>
                        <Line data={chartData} options={styles.getChartOptions()} />
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

