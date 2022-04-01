import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import type { TVLItemProps } from './types'

const TVLItem: FC<TVLItemProps> = ({ value, title }) => {
  const Title = useMemoEmpty(() =>
    styled(Typography)(({ theme }) => ({
      color: theme.palette.grey[500],
    }))
  )
  const Value = useMemoEmpty(() => styled(Typography)``)
  const ROOT = useMemoEmpty(
    () => styled(Paper)`
      ${({ theme }) => ({
        padding: `${theme.spacing(3)} 0`,
        backgroundColor: 'transparent',
      })}
    `
  )

  return (
    <ROOT elevation={0}>
      <Title variant="h6">{title}</Title>
      <Value variant="h4">{value}</Value>
    </ROOT>
  )
}

export default TVLItem
