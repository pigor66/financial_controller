/**
 * Card de estatísticas reutilizável - Dark Mode com Animações
 */

'use client';

import * as React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

interface StatsCardProps {
    title: string;
    value: string;
    subtitle?: string;
    icon?: React.ReactNode;
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
    delay?: number;
    // Comparativo previsto vs realizado
    forecastValue?: string; // valor previsto formatado
    progressPercent?: number; // 0-100 de realizado sobre previsto
}

export function StatsCard({ title, value, subtitle, icon, color = 'primary', delay = 0, forecastValue, progressPercent }: StatsCardProps) {
    const [isHovered, setIsHovered] = React.useState(false);

    // Cores baseadas no tipo
    const colorMap = {
        primary: '#2196f3',
        secondary: '#9c27b0',
        success: '#4caf50',
        error: '#ff4444',
        warning: '#ff9800',
        info: '#00bcd4'
    };

    const selectedColor = colorMap[color];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.6,
                delay,
                type: "spring",
                stiffness: 100
            }}
            whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.2 }
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <Card
                sx={{
                    backgroundColor: '#0a0a0a',
                    border: `2px solid ${isHovered ? selectedColor : '#1a1a1a'}`,
                    borderRadius: 3,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: `linear-gradient(90deg, ${selectedColor}, ${selectedColor}aa)`,
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                    },
                    '&:hover': {
                        boxShadow: `0 12px 40px ${selectedColor}40, 0 0 0 1px ${selectedColor}30`,
                        backgroundColor: '#0f0f0f',
                    }
                }}
            >
                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        {/* Ícone grande no topo com animação */}
                        {icon && (
                            <motion.div
                                animate={{
                                    scale: isHovered ? 1.2 : 1,
                                    rotate: isHovered ? [0, -5, 5, 0] : 0,
                                }}
                                transition={{
                                    duration: 0.4,
                                    rotate: {
                                        duration: 0.5,
                                        ease: "easeInOut"
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        color: selectedColor,
                                        fontSize: '3rem',
                                        mb: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        filter: isHovered
                                            ? `drop-shadow(0 0 16px ${selectedColor}) drop-shadow(0 0 32px ${selectedColor}80)`
                                            : 'none',
                                        transition: 'filter 0.3s ease'
                                    }}
                                >
                                    {icon}
                                </Box>
                            </motion.div>
                        )}

                        {/* Título */}
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#b0b0b0',
                                mb: 1,
                                fontSize: '0.9rem',
                                fontWeight: 500
                            }}
                        >
                            {title}
                        </Typography>

                        {/* Valor principal com animação */}
                        <motion.div
                            animate={{
                                scale: isHovered ? 1.08 : 1,
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <Typography
                                variant="h4"
                                component="div"
                                sx={{
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                    fontSize: '1.8rem',
                                    mb: subtitle ? 1 : 0,
                                    textShadow: isHovered ? `0 0 20px ${selectedColor}60` : 'none',
                                    transition: 'text-shadow 0.3s ease'
                                }}
                            >
                                {value}
                            </Typography>
                        </motion.div>

                        {/* Subtítulo */}
                        {subtitle && (
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#b0b0b0',
                                    fontSize: '0.8rem'
                                }}
                            >
                                {subtitle}
                            </Typography>
                        )}

                        {/* Previsto vs Realizado embutido */}
                        {forecastValue !== undefined && progressPercent !== undefined && (
                            <Box sx={{ width: '100%', mt: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                    <Typography variant="caption" sx={{ color: '#b0b0b0' }}>Previsto</Typography>
                                    <Typography variant="caption" sx={{ color: '#ffffff', fontWeight: 600 }}>{forecastValue}</Typography>
                                </Box>
                                <Box sx={{ height: 6, bgcolor: '#1a1a1a', borderRadius: 1, overflow: 'hidden' }}>
                                    <Box sx={{ height: '100%', width: `${Math.min(Math.max(progressPercent, 0), 100)}%`, bgcolor: selectedColor }} />
                                </Box>
                                <Typography variant="caption" sx={{ color: '#b0b0b0', mt: 0.5, display: 'block' }}>{Math.min(Math.max(progressPercent, 0), 100).toFixed(1)}% realizado</Typography>
                            </Box>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    );
}

