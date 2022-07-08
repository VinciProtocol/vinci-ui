import type { FC } from 'react'
import { useTranslation } from 'next-i18next'
import Stack from '@mui/material/Stack'

import PageTitle from 'UI/Layout/components/PageTitle'

import TVL from './TVL'
import NetAPY from './NetAPY'
import Supplies from './Supplies'
import Loans from './Loans'
import Lend from './Lend'
import Borrow from './Borrow'

const MobileDashboard: FC = () => {
  const { t } = useTranslation('my-dashboard')

  return (
    <Stack spacing={2}>
      <PageTitle title={t('title')} subTitle={t('subTitle')} />
      <TVL />
      <NetAPY />
      <Supplies />
      <Lend />
      <Loans />
      <Borrow />
    </Stack>
  )
}

export default MobileDashboard
