/**
 * Componente de loading centralizado - Dark Mode
 */

'use client';

import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps {
    message?: string;
}

export function LoadingSpinner({ message = 'Carregando...' }: LoadingSpinnerProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '200px',
                gap: 2,
            }}
        >
            <CircularProgress sx={{ color: '#ff4444' }} />
            <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                {message}
            </Typography>
        </Box>
    );
}

