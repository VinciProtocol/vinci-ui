import type { FC } from 'react'
import { useCallback } from 'react'
import IconButton from '@mui/material/IconButton'
import LightModeIcon from '@mui/icons-material/LightMode'
import Brightness4Icon from '@mui/icons-material/Brightness4'

import { useBaseTheme } from '.'

const ThemeButton: FC = () => {
  const { mode, setMode } = useBaseTheme()
  const onClick = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark')
  }, [mode, setMode])

  switch (mode) {
    case 'light':
      return (
        <IconButton color="primary" onClick={onClick}>
          <Brightness4Icon />
        </IconButton>
      )
    case 'dark':
      return (
        <IconButton color="primary" onClick={onClick}>
          <LightModeIcon />
        </IconButton>
      )
  }
}

export default ThemeButton
