import type { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import PageTitle from 'UI/Layout/components/PageTitle'

import NFTCollateralCollections from './NFTCollateralCollections'
import TVL from './TVL'

const Borrow: FC = () => {
  const { t } = useTranslation('borrow')
  const Content = useMemoEmpty(() =>
    styled(Container)(() => ({
      minHeight: 'calc(100vh - 256px)',
    }))
  )

  return (
    <Content>
      <Stack spacing={2}>
        <PageTitle title={t('title')} subTitle={t('subTitle')} />
        <TVL />
        <NFTCollateralCollections />
      </Stack>
    </Content>
  )
}

export default Borrow
