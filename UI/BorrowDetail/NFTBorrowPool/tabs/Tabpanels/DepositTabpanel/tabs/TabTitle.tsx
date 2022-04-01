import type { FC } from 'react'
import React, { useMemo } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

import { useApp } from 'app/App'

const TabTitle: FC = () => {
  const {
    pages: {
      borrowDetail: {
        NTFTabs: { value, onChange, tabProps },
      },
    },
  } = useApp()

  const tabList = useMemo(() => tabProps.map((item) => <Tab key={item.value} {...item} />), [tabProps])

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={onChange}>
        {tabList}
      </Tabs>
    </Box>
  )
}

export default TabTitle
