/**
 * Estilos do EmptyState
 */

import { SxProps, Theme } from '@mui/material';

export const containerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '300px',
  gap: 2,
  textAlign: 'center',
  p: 4,
};

export const defaultIconStyles: SxProps<Theme> = {
  fontSize: 64,
  opacity: 0.5
};

export const titleStyles: SxProps<Theme> = {
  color: '#ffffff'
};

export const descriptionStyles: SxProps<Theme> = {
  color: '#b0b0b0'
};

export const buttonStyles: SxProps<Theme> = {
  mt: 2,
  backgroundColor: '#ff4444',
  '&:hover': {
    backgroundColor: '#cc0000',
  }
};

