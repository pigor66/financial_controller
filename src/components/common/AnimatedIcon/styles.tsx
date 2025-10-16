/**
 * Estilos do AnimatedIcon
 */

import { SxProps, Theme } from '@mui/material';
import { Variants } from 'framer-motion';

export const getIconBoxStyles = (color: string, size: string): SxProps<Theme> => ({
    color: color,
    fontSize: size,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
});

export const animations: Variants = {
    bounce: {
        y: [0, -10, 0],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: [0.42, 0, 0.58, 1]
        }
    },
    pulse: {
        scale: [1, 1.1, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: [0.42, 0, 0.58, 1]
        }
    },
    rotate: {
        rotate: [0, 360],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: [0, 0, 1, 1]
        }
    },
    scale: {
        scale: [1, 1.05, 1],
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: [0.42, 0, 0.58, 1]
        }
    }
};

