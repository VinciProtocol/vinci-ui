import type { FC } from 'react'
import React, { useMemo } from 'react'
import { styled } from '@mui/material/styles'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import { useApp } from 'app/App'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

const TabTitle: FC = () => {
  const {
    pages: {
      borrowDetail: {
        borrowPoolTabs: { value, onChange, tabProps },
      },
    },
  } = useApp()

  const MainTabs = useMemoEmpty(() =>
    styled(Tabs)(({ theme }) => ({
      padding: `${theme.spacing(3)} ${theme.spacing(2)}`,
      ['.MuiTabs-indicator']: {
        display: 'none',
      },
    }))
  )

  const ButtonTab = useMemoEmpty(() =>
    styled(Tab)(({ theme }) => ({
      overflow: 'hidden',
      borderRadius: '4px',
      minHeight: '40px',
      '&:hover': {
        color: theme.palette.primary.main,
        opacity: 1,
      },
      '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
      },
    }))
  )

  const tabList = useMemo(() => tabProps.map((item) => <ButtonTab key={item.value} {...item} />), [ButtonTab, tabProps])

  return (
    <MainTabs value={value} onChange={onChange}>
      {tabList}
    </MainTabs>
  )
}

export default TabTitle
