/**
 * Estilos do MonthSelector
 */

import { SxProps, Theme } from '@mui/material';

export const containerStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  mb: 3,
  p: 2,
  backgroundColor: '#212121',
  border: '1px solid #333333',
  borderRadius: 2,
};

export const navButtonStyles: SxProps<Theme> = {
  color: '#ff4444'
};

export const centerBoxStyles: SxProps<Theme> = {
  flex: 1,
  textAlign: 'center'
};

export const monthTitleStyles: SxProps<Theme> = {
  color: '#ffffff',
  fontWeight: 600
};

export const captionStyles: SxProps<Theme> = {
  color: '#b0b0b0'
};

export const todayButtonStyles: SxProps<Theme> = {
  fontSize: '0.875rem',
  fontWeight: 600,
  color: '#ff4444',
  backgroundColor: '#333333',
  '&:hover': {
    backgroundColor: '#444444'
  }
};

