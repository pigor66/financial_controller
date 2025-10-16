/**
 * Estilos do LoadingSpinner
 */

import { SxProps, Theme } from '@mui/material';

export const containerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '200px',
  gap: 2,
};

export const spinnerStyles: SxProps<Theme> = {
  color: '#ff4444'
};

export const messageStyles: SxProps<Theme> = {
  color: '#b0b0b0'
};

