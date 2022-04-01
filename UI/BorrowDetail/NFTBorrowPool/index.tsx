import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

import TabTitle from './tabs/TabTitle'
import TabContent from './tabs/TabContent'

const NFTBorrowPool: FC = () => {
  const ROOT = useMemoEmpty(
    () => styled(Paper)`
      border-radius: 10px;
      .basic-table {
        min-height: 438px;
      }
    `
  )

  return (
    <ROOT variant="card">
      <TabTitle />
      <TabContent />
    </ROOT>
  )
}

export default NFTBorrowPool
