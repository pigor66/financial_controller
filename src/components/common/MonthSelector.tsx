/**
 * Componente seletor de mês - Dark Mode
 * Permite navegar entre meses anteriores, atual e futuros
 */

'use client';

import * as React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { format, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface MonthSelectorProps {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
}

export function MonthSelector({ selectedDate, onDateChange }: MonthSelectorProps) {
    const handlePreviousMonth = () => {
        onDateChange(subMonths(selectedDate, 1));
    };

    const handleNextMonth = () => {
        onDateChange(addMonths(selectedDate, 1));
    };

    const handleCurrentMonth = () => {
        onDateChange(new Date());
    };

    const isCurrentMonth = () => {
        const now = new Date();
        return (
            selectedDate.getMonth() === now.getMonth() &&
            selectedDate.getFullYear() === now.getFullYear()
        );
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 3,
                p: 2,
                backgroundColor: '#212121',
                border: '1px solid #333333',
                borderRadius: 2,
            }}
        >
            <IconButton
                onClick={handlePreviousMonth}
                size="small"
                title="Mês anterior"
                sx={{ color: '#ff4444' }}
            >
                ◀
            </IconButton>

            <Box sx={{ flex: 1, textAlign: 'center' }}>
                <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff' }}>
                    {format(selectedDate, 'MMMM yyyy', { locale: ptBR })}
                </Typography>
                <Typography variant="caption" sx={{ color: '#b0b0b0' }}>
                    Semana 1 começa no dia 15
                </Typography>
            </Box>

            {!isCurrentMonth() && (
                <IconButton
                    onClick={handleCurrentMonth}
                    size="small"
                    title="Voltar ao mês atual"
                    sx={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#ff4444',
                        backgroundColor: '#333333',
                        '&:hover': {
                            backgroundColor: '#444444'
                        }
                    }}
                >
                    Hoje
                </IconButton>
            )}

            <IconButton
                onClick={handleNextMonth}
                size="small"
                title="Próximo mês"
                sx={{ color: '#ff4444' }}
            >
                ▶
            </IconButton>
        </Box>
    );
}

