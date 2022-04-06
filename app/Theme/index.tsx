import type { FC } from 'react'
import { useMemo, useState, useCallback } from 'react'

import type { PaletteMode } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useMount } from 'app/hooks/useMount'

import { getItem, setItem } from 'utils/cache/localStorage'
import { createContext } from 'utils/createContext'

import { createThemeOptions, getTheme } from './getTheme'

import * as DefaultThemeOptions from './themes/default'

const THEME_MODE_KEY = 'THEME_MODE'
export const useThemeService = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setM] = useState<PaletteMode>(prefersDarkMode ? 'dark' : 'light')
  const setMode = useCallback((value: PaletteMode) => {
    setItem(THEME_MODE_KEY, value)
    setM(value)
  }, [])
  const t = useMemo(() => {
    const returnValue = getTheme(createThemeOptions(mode, DefaultThemeOptions))
    if (!__SERVER__ && __DEV__) {
      ;(window as any).theme = returnValue
      console.log('[@mui/material/styles] theme update', mode)
    }
    return returnValue
  }, [mode])

  useMount(() => {
    const m = getItem(THEME_MODE_KEY)
    if (m && m != mode) setM(m)
  })

  return {
    theme: t,
    mode,
    setMode,
  }
}

export const { Context, Provider: BaseThemeProvider, createUseContext } = createContext(useThemeService)
export const useBaseTheme = createUseContext()

const Theme: FC = (props) => {
  const { theme } = useBaseTheme()
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
}

const BaseTheme: FC = (props) => {
  return (
    <BaseThemeProvider>
      <Theme>{props.children}</Theme>
    </BaseThemeProvider>
  )
}

export default BaseTheme
