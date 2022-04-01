import type { FC } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import { Hook, Console } from 'console-feed'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

const key = '[send]'

export const log = (...args: any[]) => {
  console.log(key, ...args)
}

export const Log: FC = () => {
  const theme = useTheme()
  const [logs, setLogs] = useState([])
  const ROOT = useMemoEmpty(() =>
    styled(Paper)(() => ({
      height: '200px',
      overflowY: 'scroll',
    }))
  )

  useEffect(() => {
    Hook(
      window.console,
      (log) => {
        if (!log) return
        const display = log.data[0] === key
        if (!display) return
        log.data.shift()
        setLogs((logs) => [...logs, log])
      },
      false
    )
  }, [])

  return (
    <ROOT>
      <Console logs={logs} variant={theme.palette.mode} />
    </ROOT>
  )
}
