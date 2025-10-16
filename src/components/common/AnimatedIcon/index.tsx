/**
 * Componente de ícone animado
 * Adiciona animações suaves aos ícones usando framer-motion
 */

'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';
import * as styles from './styles';

interface AnimatedIconProps {
    children: React.ReactNode;
    color?: string;
    size?: string;
    animationType?: 'bounce' | 'pulse' | 'rotate' | 'scale';
}

export function AnimatedIcon({
    children,
    color = '#ff4444',
    size = '3rem',
    animationType = 'bounce'
}: AnimatedIconProps) {
    return (
        <motion.div
            animate={animationType}
            variants={styles.animations}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
        >
            <Box sx={styles.getIconBoxStyles(color, size)}>
                {children}
            </Box>
        </motion.div>
    );
}

