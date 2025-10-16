/**
 * Estilos do PredictedVsActualCard
 */

import { SxProps, Theme } from '@mui/material';

export const sectionBoxStyles: SxProps<Theme> = {
  p: 2,
  bgcolor: 'background.default',
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider'
};

export const titleStyles: SxProps<Theme> = {
  fontWeight: 700,
  mb: 1
};

export const rowStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between'
};

export const progressBarStyles: SxProps<Theme> = {
  height: 6,
  borderRadius: 1,
  mb: 0.5
};

export const progressTextStyles: SxProps<Theme> = {
  display: 'block'
};

export const cardTitleStyles: SxProps<Theme> = {
  mb: 2,
  fontWeight: 700
};

