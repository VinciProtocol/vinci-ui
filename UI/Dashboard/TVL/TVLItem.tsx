import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import type { TVLItemProps } from './types'

const TVLItem: FC<TVLItemProps> = ({ children }) => {
  const ROOT = useMemoEmpty(
    () => styled(Card)`
      flex: 1;
    `
  )

  return (
    <ROOT variant="card">
      <CardContent>
        <Stack spacing={1}>{children}</Stack>
      </CardContent>
    </ROOT>
  )
}

export default TVLItem
