import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import type { NetAPYItemProps } from './types'

const NetAPYItem: FC<NetAPYItemProps> = ({ children }) => {
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

export default NetAPYItem
