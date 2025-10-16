/**
 * Componente de loading centralizado - Dark Mode
 */

'use client';

import { Box, CircularProgress, Typography } from '@mui/material';
import * as styles from './styles';

interface LoadingSpinnerProps {
    message?: string;
}

export function LoadingSpinner({ message = 'Carregando...' }: LoadingSpinnerProps) {
    return (
        <Box sx={styles.containerStyles}>
            <CircularProgress sx={styles.spinnerStyles} />
            <Typography variant="body2" sx={styles.messageStyles}>
                {message}
            </Typography>
        </Box>
    );
}

