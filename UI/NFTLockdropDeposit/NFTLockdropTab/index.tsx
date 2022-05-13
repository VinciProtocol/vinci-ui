import type { FC } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import CardContent from '@mui/material/CardContent'

import { useApp } from 'app/App'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

import TabTitle from './tabs/TabTitle'
import TabContent from './tabs/TabContent'

const NFTBorrowPool: FC = () => {
  const ROOT = useMemoEmpty(
    () => styled(Paper)`
      .basic-table {
        min-height: 438px;
      }
    `
  )
  const router = useRouter()
  const {
    pages: {
      lockdropDeposit: {
        lockdropDepositTabs: { setTab },
      },
    },
  } = useApp()

  useEffect(() => {
    if (router.query.tabpanelKey) {
      setTab(router.query.tabpanelKey as any)
    }
  }, [router.query, setTab])

  return (
    <ROOT variant="card">
      <CardContent>
        <TabTitle />
        <TabContent />
      </CardContent>
    </ROOT>
  )
}

export default NFTBorrowPool
