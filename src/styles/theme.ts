/**
 * Tema customizado do Material-UI - Dark Mode (padrão anterior)
 */

import { createTheme } from '@mui/material/styles';
import { ptBR } from '@mui/material/locale';

export const theme = createTheme(
  {
    palette: {
      mode: 'dark',
      primary: {
        main: '#ff4444',
        light: '#ff6666',
        dark: '#cc0000'
      },
      secondary: {
        main: '#ff6b35',
        light: '#ff8a65',
        dark: '#d84315'
      },
      success: {
        main: '#4caf50',
        light: '#81c784',
        dark: '#388e3c'
      },
      error: {
        main: '#f44336',
        light: '#e57373',
        dark: '#d32f2f'
      },
      warning: {
        main: '#ff9800',
        light: '#ffb74d',
        dark: '#f57c00'
      },
      info: {
        main: '#2196f3',
        light: '#64b5f6',
        dark: '#1976d2'
      },
      background: {
        default: '#000000',
        paper: '#0a0a0a'
      },
      text: {
        primary: '#ffffff',
        secondary: '#b0b0b0'
      }
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontSize: '2.5rem', fontWeight: 600 },
      h2: { fontSize: '2rem', fontWeight: 600 },
      h3: { fontSize: '1.75rem', fontWeight: 600 },
      h4: { fontSize: '1.5rem', fontWeight: 600 },
      h5: { fontSize: '1.25rem', fontWeight: 600 },
      h6: { fontSize: '1rem', fontWeight: 600 }
    },
    shape: { borderRadius: 8 },
    components: {
      MuiButton: {
        styleOverrides: { root: { textTransform: 'none', fontWeight: 600 } }
      },
      MuiCard: {
        styleOverrides: { root: { boxShadow: '0 2px 8px rgba(0,0,0,0.1)' } }
      }
    }
  },
  ptBR
);
