import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import type { StatsItemProps } from './types'

const StatsItem: FC<StatsItemProps> = ({ value, title }) => {
  const Title = useMemoEmpty(() =>
    styled(Typography)(({ theme }) => ({
      color: theme.palette.grey[500],
      textAlign: 'center',
    }))
  )
  const Value = useMemoEmpty(() =>
    styled(Typography)(() => ({
      textAlign: 'center',
    }))
  )
  const ROOT = useMemoEmpty(
    () => styled(Paper)`
      ${({ theme }) => ({
        padding: `${theme.spacing(3)} 0`,
        background: 'transparent',
      })}
    `
  )

  return (
    <ROOT elevation={0}>
      <Value variant="h4">{value}</Value>
      <Title variant="h6">{title}</Title>
    </ROOT>
  )
}

export default StatsItem
