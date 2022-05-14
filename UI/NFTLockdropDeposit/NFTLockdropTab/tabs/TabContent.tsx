import type { FC } from 'react'
import { useMemo } from 'react'
import { styled } from '@mui/material/styles'

import { useApp } from 'app/App'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

import WalletTabpanel from './Tabpanels/WalletTabpanel'
import LockDepositTabpanel from './Tabpanels/LockDepositTabpanel'

const TabContent: FC = () => {
  const {
    pages: {
      lockdropDeposit: {
        lockdropDepositTabs: { value },
      },
    },
  } = useApp()
  const ROOT = useMemoEmpty(() =>
    styled('div')(({ theme }) => ({
      paddingTop: theme.spacing(2),
    }))
  )

  const tabpanelProps = useMemo(
    () => ({
      tabpanelValue: value,
    }),
    [value]
  )

  return (
    <ROOT>
      <WalletTabpanel {...tabpanelProps} />
      <LockDepositTabpanel {...tabpanelProps} />
    </ROOT>
  )
}

export default TabContent
