import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import type { CardItemProps } from './types'

const CardItem: FC<CardItemProps> = ({ value, title, icon }) => {
  const Title = useMemoEmpty(() =>
    styled(Typography)(({ theme }) => ({
      color: theme.palette.grey[500],
    }))
  )
  const Value = useMemoEmpty(() => styled(Typography)``)
  const ROOT = useMemoEmpty(
    () => styled(Card)`
      flex: 1;
    `
  )

  return (
    <ROOT variant="card">
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

export default CardItem
