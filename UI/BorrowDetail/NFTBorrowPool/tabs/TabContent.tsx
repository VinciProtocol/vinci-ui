import type { FC } from 'react'
import { useMemo } from 'react'
import { styled } from '@mui/material/styles'

import { useApp } from 'app/App'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

import BorrowTabpanel from './Tabpanels/BorrowTabpanel'
import DepositTabpanel from './Tabpanels/DepositTabpanel'

const TabContent: FC = () => {
  const {
    pages: {
      borrowDetail: {
        borrowPoolTabs: { value },
      },
    },
  } = useApp()
  const ROOT = useMemoEmpty(() => styled('div')``)

  const tabpanelProps = useMemo(
    () => ({
      tabpanelValue: value,
    }),
    [value]
  )

  return (
    <ROOT>
      <BorrowTabpanel {...tabpanelProps} />
      <DepositTabpanel {...tabpanelProps} />
    </ROOT>
  )
}

export default TabContent
