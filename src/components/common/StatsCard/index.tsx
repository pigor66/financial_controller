/**
 * Card de estatísticas reutilizável - Dark Mode com Animações
 */

'use client';

import * as React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { Sparkline } from '../Sparkline';
import { SparklineData } from '../Sparkline/types';
import * as styles from './styles';

interface StatsCardProps {
    title: string;
    value: string;
    subtitle?: string;
    icon?: React.ReactNode;
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
    delay?: number;
    forecastValue?: string;
    progressPercent?: number;
    sparklineData?: SparklineData;
    sparklineType?: 'line' | 'bar' | 'doughnut';
}

export function StatsCard({
    title,
    value,
    subtitle,
    icon,
    color = 'primary',
    delay = 0,
    forecastValue,
    progressPercent,
    sparklineData,
    sparklineType = 'line'
}: StatsCardProps) {
    const [isHovered, setIsHovered] = React.useState(false);
    const selectedColor = styles.colorMap[color];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
            whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.2 } }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <Box sx={{ position: 'relative' }} mt={2}>
                <Card sx={styles.getCardStyles(isHovered, selectedColor)}>
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={styles.contentBoxStyles}>
                            {icon && (
                                <motion.div
                                    animate={{
                                        scale: isHovered ? 1.2 : 1,
                                        rotate: isHovered ? [0, -5, 5, 0] : 0,
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        rotate: { duration: 0.5, ease: "easeInOut" }
                                    }}
                                >
                                    <Box sx={styles.getIconBoxStyles(isHovered, selectedColor)}>
                                        {icon}
                                    </Box>
                                </motion.div>
                            )}

                            <Typography variant="body2" sx={styles.titleStyles}>
                                {title}
                            </Typography>

                            <motion.div
                                animate={{ scale: isHovered ? 1.08 : 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Typography
                                    variant="h4"
                                    component="div"
                                    sx={styles.getValueStyles(isHovered, selectedColor, !!subtitle)}
                                >
                                    {value}
                                </Typography>
                            </motion.div>

                            {subtitle && (
                                <Typography variant="body2" sx={styles.subtitleStyles}>
                                    {subtitle}
                                </Typography>
                            )}

                            {forecastValue !== undefined && progressPercent !== undefined && (
                                <Box sx={styles.forecastContainerStyles}>
                                    <Box sx={styles.forecastRowStyles}>
                                        <Typography variant="caption" sx={styles.forecastLabelStyles}>
                                            Previsto
                                        </Typography>
                                        <Typography variant="caption" sx={styles.forecastValueStyles}>
                                            {forecastValue}
                                        </Typography>
                                    </Box>
                                    <Box sx={styles.progressBarContainerStyles}>
                                        <Box
                                            sx={{
                                                ...styles.getProgressBarStyles(selectedColor),
                                                width: `${Math.min(Math.max(progressPercent, 0), 100)}%`
                                            }}
                                        />
                                    </Box>
                                    <Typography variant="caption" sx={styles.progressTextStyles}>
                                        {Math.min(Math.max(progressPercent, 0), 100).toFixed(1)}% realizado
                                    </Typography>
                                </Box>
                            )}

                            {sparklineData && (
                                <Box sx={styles.sparklineContainerStyles}>
                                    <Sparkline
                                        type={sparklineType}
                                        data={sparklineData}
                                        width={100}
                                        height={30}
                                    />
                                </Box>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </Box >
        </motion.div>
    );
}

