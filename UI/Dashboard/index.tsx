import type { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import PageTitle from 'UI/Layout/components/PageTitle'

import TVL from './TVL'
import NetAPY from './NetAPY'
import Supplies from './Supplies'
import Loans from './Loans'

const Dashboard: FC = () => {
  const { t } = useTranslation('my-dashboard')
  const Content = useMemoEmpty(() =>
    styled(Container)(() => ({
      minHeight: 'calc(100vh - 256px)',
    }))
  )

  return (
    <Content>
      <Stack spacing={2}>
        <PageTitle title={t('title')} subTitle={t('subTitle')} />
        <Stack spacing={2} direction="row">
          <Stack spacing={2}>
            <TVL />
            <Supplies />
          </Stack>
          <Stack spacing={2}>
            <NetAPY />
            <Loans />
          </Stack>
        </Stack>
      </Stack>
    </Content>
  )
}

export default Dashboard
