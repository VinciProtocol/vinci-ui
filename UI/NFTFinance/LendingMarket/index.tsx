import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import Stack from '@mui/material/Stack'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import PageTitle from 'UI/Layout/components/PageTitle'

import Lend from '../../Dashboard/Lend'
import Borrow from '../../Dashboard/Borrow'

const LendingMarket: FC = () => {
  const { t } = useTranslation('nft-finance')
  const ContentItem = useMemoEmpty(() =>
    styled(Stack)(({ theme }) => ({
      width: `calc(50% - ${theme.spacing(1)})`,
    }))
  )

  return (
    <Stack spacing={2}>
      <PageTitle title={t('title')} subTitle={t('subTitle')} />
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
        <ContentItem>
          <Lend />
        </ContentItem>
        <ContentItem>
          <Borrow />
        </ContentItem>
      </Stack>
    </Stack>
  )
}

export default LendingMarket
