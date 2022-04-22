import type { ThemeOptions } from '@mui/material/styles'

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      light: '#ea7372',
      main: '#F94432',
      dark: '#d82e2c',
      contrastText: '#fff',
    },
    secondary: {
      light: '#b3302c',
      main: '#952225',
      dark: '#781717',
      contrastText: '#fff',
    },
    error: {
      light: '#ef5350',
      main: '#f44336',
      dark: '#e53935',
    },
    warning: {
      light: '#ffa726',
      main: '#ff9800',
      dark: '#fb8c00',
    },
    info: {
      light: '#29b6f6',
      main: '#03a9f4',
      dark: '#039be5',
    },
    success: {
      light: '#81c784',
      main: '#66bb6a',
      dark: '#43a047',
    },
    background: {
      papers: {
        primary: '#E58E8514',
        secondary: '#E58E8514',
      },
    },
  },
  typography: {
    fontFamily: ['brandon-grotesque', 'sans-serif'].join(','),
  },
}

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    background: {
      default: '#140200',
      paper: '#20100f',
      papers: {
        primary: '#360100',
        secondary: lightThemeOptions.palette.background.papers.secondary,
      },
    },
    divider: 'rgba(249, 68, 50, 0.25)',
  },
}
