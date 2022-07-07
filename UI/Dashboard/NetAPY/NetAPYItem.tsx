import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import type { NetAPYItemProps } from './types'

const NetAPYItem: FC<NetAPYItemProps> = ({ children }) => {
  const ROOT = useMemoEmpty(
    () => styled(Card)`
      flex: 1;
    `
  )
  const Content = useMemoEmpty(
    () => styled(CardContent)`
      display: flex;
      justify-content: space-between;
    `
  )

  return (
    <ROOT variant="card">
      <Content>{children}</Content>
    </ROOT>
  )
}

export default NetAPYItem
