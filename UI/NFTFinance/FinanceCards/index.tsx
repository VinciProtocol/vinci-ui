import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import ListAltTwoToneIcon from '@mui/icons-material/ListAltTwoTone'
import PlaylistAddCircleTwoToneIcon from '@mui/icons-material/PlaylistAddCircleTwoTone'
import GppGoodTwoToneIcon from '@mui/icons-material/GppGoodTwoTone'
import WavesTwoToneIcon from '@mui/icons-material/WavesTwoTone'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import FinanceCard from './FinanceCard'
import type { FinanceCardsProps } from './types'

const FinanceCards: FC<FinanceCardsProps> = () => {
  const { t } = useTranslation('nft-finance')
  const ROOT = useMemoEmpty(() =>
    styled(Stack)(() => ({
      ['.MuiSvgIcon-root']: {
        fontSize: '30px',
      },
    }))
  )

  return (
    <ROOT spacing={2}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <FinanceCard
          title={t('cards.poolModel.title')}
          subTitle={t('cards.poolModel.subTitle')}
          learnMoreUrl="https://docs.vinci.io/nft-finance/"
          icon={<ListAltTwoToneIcon color="primary" />}
        />
        <FinanceCard
          title={t('cards.listing.title')}
          subTitle={t('cards.listing.subTitle')}
          learnMoreUrl="https://docs.vinci.io/smart-contract/"
          icon={<PlaylistAddCircleTwoToneIcon color="primary" />}
        />
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <FinanceCard
          title={t('cards.mechanism.title')}
          subTitle={t('cards.mechanism.subTitle')}
          learnMoreUrl="https://docs.vinci.io/nft-finance/lending-market/lending-pool"
          icon={<WavesTwoToneIcon color="primary" />}
        />
        <FinanceCard
          title={t('cards.permissionless.title')}
          subTitle={t('cards.permissionless.subTitle')}
          learnMoreUrl="https://docs.vinci.io/nft-finance/lending-market/audits"
          icon={<GppGoodTwoToneIcon color="primary" />}
        />
      </Stack>
    </ROOT>
  )
}

export default FinanceCards
