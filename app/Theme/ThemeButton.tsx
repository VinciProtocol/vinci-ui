import type { FC } from 'react'
import { useCallback } from 'react'
import IconButton from '@mui/material/IconButton'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/ModeNight'

import { useBaseTheme } from '.'

const ThemeButton: FC = () => {
  const { mode, setMode } = useBaseTheme()
  const onClick = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark')
  }, [mode, setMode])

  switch (mode) {
    case 'light':
      return (
        <IconButton
          sx={{
            color: 'primary.contrastText',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
          }}
          onClick={onClick}
        >
          <DarkModeIcon />
        </IconButton>
      )
    case 'dark':
      return (
        <IconButton sx={{ color: 'primary.contrastText' }} onClick={onClick}>
          <LightModeIcon />
        </IconButton>
      )
  }
}

export default ThemeButton
