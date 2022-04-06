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
      light: '#ff9500',
      main: '#ff5f05',
      dark: '#d65104',
    },
    warning: {
      light: '#f7f995',
      main: '#f8fc46',
      dark: '#fae700',
    },
    info: {
      light: '#dff7ff',
      main: '#74ddff',
      dark: '#00c2ff',
    },
    success: {
      light: '#ddfff1',
      main: '#5affc4',
      dark: '#00f59e',
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
