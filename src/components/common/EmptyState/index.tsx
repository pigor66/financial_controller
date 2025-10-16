/**
 * Componente para estados vazios - Dark Mode
 */

'use client';

import { Box, Typography, Button } from '@mui/material';
import * as styles from './styles';

interface EmptyStateProps {
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
    icon?: React.ReactNode;
}

export function EmptyState({
    title,
    description,
    actionLabel,
    onAction,
    icon = <Typography sx={styles.defaultIconStyles}>📭</Typography>,
}: EmptyStateProps) {
    return (
        <Box sx={styles.containerStyles}>
            {icon}
            <Typography variant="h6" sx={styles.titleStyles}>
                {title}
            </Typography>
            {description && (
                <Typography variant="body2" sx={styles.descriptionStyles}>
                    {description}
                </Typography>
            )}
            {actionLabel && onAction && (
                <Button variant="contained" onClick={onAction} sx={styles.buttonStyles}>
                    {actionLabel}
                </Button>
            )}
        </Box>
    );
}

