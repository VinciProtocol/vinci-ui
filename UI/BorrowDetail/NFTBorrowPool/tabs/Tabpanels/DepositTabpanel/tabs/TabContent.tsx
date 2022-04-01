import type { FC } from 'react'
import { useMemo } from 'react'
import { styled } from '@mui/material/styles'

import { useApp } from 'app/App'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

import WalletTabpanel from './Tabpanels/WalletTabpanel'
import DepositTabpanel from './Tabpanels/DepositTabpanel'

const TabContent: FC = () => {
  const {
    pages: {
      borrowDetail: {
        NTFTabs: { value },
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
      <DepositTabpanel {...tabpanelProps} />
    </ROOT>
  )
}

export default TabContent
