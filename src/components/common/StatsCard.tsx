/**
 * Card de estatísticas reutilizável - Dark Mode
 */

'use client';

import * as React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface StatsCardProps {
    title: string;
    value: string;
    subtitle?: string;
    icon?: React.ReactNode;
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
}

export function StatsCard({ title, value, subtitle, icon, color = 'primary' }: StatsCardProps) {
    return (
        <Card
            sx={{
                backgroundColor: '#212121',
                border: '1px solid #333333',
                borderRadius: 2,
                '&:hover': {
                    boxShadow: '0 4px 20px rgba(255, 68, 68, 0.1)',
                }
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    {/* Ícone grande no topo */}
                    {icon && (
                        <Box
                            sx={{
                                color: '#ff4444',
                                fontSize: '3rem',
                                mb: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {icon}
                        </Box>
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

                    {/* Valor principal */}
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{
                            color: '#ffffff',
                            fontWeight: 'bold',
                            fontSize: '1.8rem',
                            mb: subtitle ? 1 : 0
                        }}
                    >
                        {value}
                    </Typography>

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
                </Box>
            </CardContent>
        </Card>
    );
}

