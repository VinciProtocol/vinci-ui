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
import Lend from './Lend'
import Borrow from './Borrow'

const Dashboard: FC = () => {
  const { t } = useTranslation('my-dashboard')
  const Content = useMemoEmpty(() =>
    styled(Container)(() => ({
      minHeight: 'calc(100vh - 256px)',
    }))
  )

  const ContentItem = useMemoEmpty(() =>
    styled(Stack)(({ theme }) => ({
      width: `calc(50% - ${theme.spacing(1)})`,
    }))
  )

  return (
    <Content>
      <Stack spacing={2}>
        <PageTitle title={t('title')} subTitle={t('subTitle')} />
        <Stack spacing={2} direction="row">
          <ContentItem spacing={2}>
            <TVL />
            <Supplies />
            <Lend />
          </ContentItem>
          <ContentItem spacing={2}>
            <NetAPY />
            <Loans />
            <Borrow />
          </ContentItem>
        </Stack>
      </Stack>
    </Content>
  )
}

export default Dashboard
