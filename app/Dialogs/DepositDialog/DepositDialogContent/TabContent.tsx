import type { FC } from 'react'
import { useMemo } from 'react'
import { styled } from '@mui/material/styles'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import DepositTabpanel from './Tabpanels/DepositTabpanel'
import WithdrawTabpanel from './Tabpanels/WithdrawTabpanel'
import type { TabContentProps } from './types'

const TabContent: FC<TabContentProps> = ({ tabs: { value } }) => {
  const ROOT = useMemoEmpty(() => styled('div')``)

  const tabpanelProps = useMemo(
    () => ({
      tabpanelValue: value,
    }),
    [value]
  )

  return (
    <ROOT>
      <DepositTabpanel {...tabpanelProps} />
      <WithdrawTabpanel {...tabpanelProps} />
    </ROOT>
  )
}

export default TabContent
