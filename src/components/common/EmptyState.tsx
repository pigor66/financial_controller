/**
 * Componente para estados vazios - Dark Mode
 */

'use client';

import { Box, Typography, Button } from '@mui/material';

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
    icon = <Typography sx={{ fontSize: 64, opacity: 0.5 }}>📭</Typography>,
}: EmptyStateProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '300px',
                gap: 2,
                textAlign: 'center',
                p: 4,
            }}
        >
            {icon}
            <Typography variant="h6" sx={{ color: '#ffffff' }}>
                {title}
            </Typography>
            {description && (
                <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                    {description}
                </Typography>
            )}
            {actionLabel && onAction && (
                <Button
                    variant="contained"
                    onClick={onAction}
                    sx={{
                        mt: 2,
                        backgroundColor: '#ff4444',
                        '&:hover': {
                            backgroundColor: '#cc0000',
                        }
                    }}
                >
                    {actionLabel}
                </Button>
            )}
        </Box>
    );
}

