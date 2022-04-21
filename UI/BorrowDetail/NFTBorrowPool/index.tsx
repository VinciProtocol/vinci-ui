import type { FC } from 'react'
import { useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import { useRouter } from 'next/router'

import { useApp } from 'app/App'
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
  const router = useRouter()
  const {
    pages: {
      borrowDetail: {
        borrowPoolTabs: { setTab },
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
      <TabTitle />
      <TabContent />
    </ROOT>
  )
}

export default NFTBorrowPool
