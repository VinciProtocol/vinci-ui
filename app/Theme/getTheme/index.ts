import type { PaletteMode } from '@mui/material'
import type { ThemeOptions } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import { merge } from 'lodash'

declare module '@mui/material/Button/Button' {
  interface ButtonPropsVariantOverrides {
    linear: true
    linearOutlined: true
  }
}

declare module '@mui/material/Paper/Paper' {
  interface PaperPropsVariantOverrides {
    card: true
    primary: true
    secondary: true
    table: true
  }
}

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    default: string
    paper: string
    papers: {
      primary: string
      secondary: string
    }
  }
}

export const getTheme = (options: ThemeOptions) => {
  const theme = createTheme(options)
  const { background, primary, divider } = theme.palette

  return createTheme(options, {
    components: {
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'capitalize',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'capitalize',
          },
        },
        variants: [
          {
            props: { variant: 'linear' },
            style: {
              willChange: 'transform',
              color: '#fff',
              backgroundImage: `linear-gradient(135deg, ${primary.dark}, ${primary.main}, ${primary.dark})`,
              backgroundSize: '200%',
              transition: theme.transitions.create('all'),
              ':hover': {
                backgroundPosition: 'right',
              },
              ':disabled': {
                color: '#fff',
                opacity: '50%',
              },
            },
          },
          {
            props: { variant: 'linear', size: 'small' },
            style: {
              padding: '4px 10px',
              fontSize: theme.typography.pxToRem(13),
              large: {
                padding: '8px 22px',
                fontSize: theme.typography.pxToRem(15),
              },
            },
          },
          {
            props: { variant: 'linear', size: 'large' },
            style: {
              padding: '8px 22px',
              fontSize: theme.typography.pxToRem(15),
            },
          },
          {
            props: { variant: 'linearOutlined' },
            style: {
              willChange: 'transform',
              color: '#F94432',
              backgroundImage: `linear-gradient(135deg, ${primary.dark}, ${primary.main}, ${primary.dark})`,
              backgroundSize: '200%',
              transition: theme.transitions.create('all'),
              ':hover': {
                color: '#fff',
                boxShadow: 'none',
              },
              ':disabled': {
                color: '#F94432',
                opacity: '50%',
              },
              border: 'solid 1px transparent',
              backgroundOrigin: 'border-box',
              boxShadow: '2px 1000px 1px #fff inset',
            },
          },
          {
            props: { variant: 'linearOutlined', size: 'small' },
            style: {
              padding: '4px 10px',
              fontSize: theme.typography.pxToRem(13),
              large: {
                padding: '8px 22px',
                fontSize: theme.typography.pxToRem(15),
              },
            },
          },
          {
            props: { variant: 'linearOutlined', size: 'large' },
            style: {
              padding: '8px 22px',
              fontSize: theme.typography.pxToRem(15),
            },
          },
          {
            props: { variant: 'outlined' },
            style: {
              ':hover': {
                color: '#fff',
                background: primary.main,
              },
            },
          },
        ],
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            color: '#000',
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            border: `solid 1px ${divider}`,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            border: `solid 1px ${divider}`,
            backgroundImage: 'none',
          },
        },
      },
      MuiPaper: {
        variants: [
          {
            props: { variant: 'card' },
            style: {
              border: `1px solid ${divider}`,
              borderRadius: theme.shape.borderRadius,
              transition: theme.transitions.create('box-shadow'),
              boxShadow: theme.shadows[0],
              ':hover': {
                boxShadow: theme.shadows[0],
              },
            },
          },
          {
            props: { variant: 'primary' },
            style: {
              backgroundColor: background.papers.primary,
            },
          },
          {
            props: { variant: 'secondary' },
            style: {
              backgroundColor: background.papers.secondary,
            },
          },
        ],
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundImage: 'none',
            border: `solid 1px ${divider}`,
          },
        },
      },
      MuiSlider: {
        styleOverrides: {
          valueLabel: {
            background: primary.main,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          arrow: {
            color: primary.dark,
          },
          tooltip: {
            background: primary.dark,
            fontSize: theme.typography.pxToRem(14),
          }
        },
      }
    },
  })
}

export const createThemeOptions = (
  mode: PaletteMode,
  themeOptions: {
    lightThemeOptions: ThemeOptions
    darkThemeOptions: ThemeOptions
  }
) =>
  createTheme(
    mode === 'light'
      ? themeOptions.lightThemeOptions
      : merge({}, themeOptions.lightThemeOptions, themeOptions.darkThemeOptions)
  )
