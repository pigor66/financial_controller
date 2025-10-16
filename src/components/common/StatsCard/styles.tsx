/**
 * Estilos do StatsCard
 */

import { SxProps, Theme } from '@mui/material';

export const colorMap = {
    primary: '#2196f3',
    secondary: '#9c27b0',
    success: '#4caf50',
    error: '#ff4444',
    warning: '#ff9800',
    info: '#00bcd4'
};

export const getCardStyles = (isHovered: boolean, selectedColor: string): SxProps<Theme> => ({
    backgroundColor: '#0a0a0a',
    borderRadius: 3,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(90deg, ${selectedColor}, ${selectedColor}aa)`,
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
    },
    '&:hover': {
        boxShadow: `0 12px 40px ${selectedColor}40, 0 0 0 1px ${selectedColor}30`,
        // backgroundColor: '#0f0f0f',
    }
});

export const contentBoxStyles: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
};

export const getIconBoxStyles = (isHovered: boolean, selectedColor: string): SxProps<Theme> => ({
    color: selectedColor,
    fontSize: '3rem',
    mb: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    filter: isHovered
        ? `drop-shadow(0 0 16px ${selectedColor}) drop-shadow(0 0 32px ${selectedColor}80)`
        : 'none',
    transition: 'filter 0.3s ease'
});

export const titleStyles: SxProps<Theme> = {
    color: '#b0b0b0',
    mb: 1,
    fontSize: '0.9rem',
    fontWeight: 500
};

export const getValueStyles = (isHovered: boolean, selectedColor: string, hasSubtitle: boolean): SxProps<Theme> => ({
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '1.8rem',
    mb: hasSubtitle ? 1 : 0,
    textShadow: isHovered ? `0 0 20px ${selectedColor}60` : 'none',
    transition: 'text-shadow 0.3s ease'
});

export const subtitleStyles: SxProps<Theme> = {
    color: '#b0b0b0',
    fontSize: '0.8rem'
};

export const forecastContainerStyles: SxProps<Theme> = {
    width: '100%',
    mt: 2
};

export const forecastRowStyles: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'space-between',
    mb: 0.5
};

export const forecastLabelStyles: SxProps<Theme> = {
    color: '#b0b0b0'
};

export const forecastValueStyles: SxProps<Theme> = {
    color: '#ffffff',
    fontWeight: 600
};

export const progressBarContainerStyles: SxProps<Theme> = {
    height: 6,
    bgcolor: '#1a1a1a',
    borderRadius: 1,
    overflow: 'hidden'
};

export const getProgressBarStyles = (selectedColor: string): SxProps<Theme> => ({
    height: '100%',
    bgcolor: selectedColor
});

export const progressTextStyles: SxProps<Theme> = {
    color: '#b0b0b0',
    mt: 0.5,
    display: 'block'
};

export const sparklineContainerStyles: SxProps<Theme> = {
    width: '100%',
    mt: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8
};

