/**
 * Componente seletor de mês - Dark Mode
 * Permite navegar entre meses anteriores, atual e futuros
 */

'use client';

import * as React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { format, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FINANCIAL_WEEK_CONFIG } from '@/shared/constants';
import * as styles from './styles';

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
        <Box sx={styles.containerStyles}>
            <IconButton
                onClick={handlePreviousMonth}
                size="small"
                title="Mês anterior"
                sx={styles.navButtonStyles}
            >
                ◀
            </IconButton>

            <Box sx={styles.centerBoxStyles}>
                <Typography variant="h6" sx={styles.monthTitleStyles}>
                    {format(selectedDate, 'MMMM yyyy', { locale: ptBR })}
                </Typography>
                <Typography variant="caption" sx={styles.captionStyles}>
                    {FINANCIAL_WEEK_CONFIG.MODE === 'MONDAY'
                        ? 'Semanas começam na segunda-feira'
                        : `Semana 1 começa no dia ${FINANCIAL_WEEK_CONFIG.START_DAY}`
                    }
                </Typography>
            </Box>

            {!isCurrentMonth() && (
                <IconButton
                    onClick={handleCurrentMonth}
                    size="small"
                    title="Voltar ao mês atual"
                    sx={styles.todayButtonStyles}
                >
                    Hoje
                </IconButton>
            )}

            <IconButton
                onClick={handleNextMonth}
                size="small"
                title="Próximo mês"
                sx={styles.navButtonStyles}
            >
                ▶
            </IconButton>
        </Box>
    );
}

