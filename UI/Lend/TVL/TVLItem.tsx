import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import type { TVLItemProps } from './types'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const TVLItem: FC<TVLItemProps> = ({ value, title, icon }) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  const Title = useMemoEmpty(() =>
    styled(Typography)(({ theme }) => ({
      color: theme.palette.text.secondary,
      fontWeight: 'normal',
    }))
  )
  const Value = useMemoEmpty(() => styled(Typography)``)
  const ROOT = useMemoEmpty(
    () => styled(Card)`
      flex: 1;
    `
  )

  return (
    <ROOT variant="card" sx={{ maxWidth: matches ? '50%' : '100%' }}>
      <CardContent>
        <Stack spacing={1}>
          <Title variant="h6">
            <Stack spacing={1} direction="row">
              {icon}
              <span>{title}</span>
            </Stack>
          </Title>
          <Value variant="h4">{value}</Value>
        </Stack>
      </CardContent>
    </ROOT>
  )
}

export default TVLItem
