import type { FC } from 'react'
import { useMemo } from 'react'
import { styled } from '@mui/material/styles'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import BorrowTabpanel from './Tabpanels/BorrowTabpanel'
import RepayTabpanel from './Tabpanels/RepayTabpanel'
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
      <BorrowTabpanel {...tabpanelProps} />
      <RepayTabpanel {...tabpanelProps} />
    </ROOT>
  )
}

export default TabContent
