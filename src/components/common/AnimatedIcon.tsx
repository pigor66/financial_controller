/**
 * Componente de ícone animado
 * Adiciona animações suaves aos ícones usando framer-motion
 */

'use client';

import * as React from 'react';
import { motion, Variants } from 'framer-motion';
import { Box } from '@mui/material';

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
    const animations: Variants = {
        bounce: {
            y: [0, -10, 0],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: [0.42, 0, 0.58, 1] // easeInOut
            }
        },
        pulse: {
            scale: [1, 1.1, 1],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: [0.42, 0, 0.58, 1] // easeInOut
            }
        },
        rotate: {
            rotate: [0, 360],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: [0, 0, 1, 1] // linear
            }
        },
        scale: {
            scale: [1, 1.05, 1],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: [0.42, 0, 0.58, 1] // easeInOut
            }
        }
    };

    return (
        <motion.div
            animate={animationType}
            variants={animations}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
        >
            <Box
                sx={{
                    color: color,
                    fontSize: size,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                }}
            >
                {children}
            </Box>
        </motion.div>
    );
}

