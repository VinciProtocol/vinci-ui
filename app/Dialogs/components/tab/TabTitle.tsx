import type { FC } from 'react'
import React, { useMemo } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import type { TabTitleProps } from './types'

const TabTitle: FC<TabTitleProps> = ({ tabs: { value, onChange, tabProps } }) => {
  const tabList = useMemo(() => tabProps.map((item: any) => <Tab key={item.value} {...item} />), [tabProps])

  return (
    <Tabs variant="fullWidth" value={value} onChange={onChange}>
      {tabList}
    </Tabs>
  )
}

export default TabTitle
