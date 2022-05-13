import type { FC } from 'react'
import React, { useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import { styled } from '@mui/material/styles'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useApp } from 'app/App'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

const TabTitle: FC = () => {
  const { t } = useTranslation()
  const {
    pages: {
      lockdropDeposit: {
        lockdropDepositTabs: { value, onChange, tabProps },
      },
    },
  } = useApp()
  const Title = useMemoEmpty(() =>
    styled(Typography)(({ theme }) => ({
      ...theme.typography.h5,
      padding: theme.spacing(2),
    }))
  )

  const tabList = useMemo(() => tabProps.map((item) => <Tab key={item.value} {...item} />), [tabProps])

  return (
    <Stack sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Title>{t('nft-lockdrop-deposit:title')}</Title>
      <Tabs value={value} onChange={onChange}>
        {tabList}
      </Tabs>
    </Stack>
  )
}

export default TabTitle
