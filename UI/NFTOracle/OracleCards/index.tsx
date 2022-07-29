import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import AnalyticsTwoToneIcon from '@mui/icons-material/AnalyticsTwoTone'
import SecurityTwoToneIcon from '@mui/icons-material/SecurityTwoTone'
import IntegrationInstructionsTwoToneIcon from '@mui/icons-material/IntegrationInstructionsTwoTone'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import OracleCard from './OracleCard'
import type { OracleCardsProps } from './types'

const OracleCards: FC<OracleCardsProps> = () => {
  const { t } = useTranslation('nft-oracle')
  const ROOT = useMemoEmpty(() =>
    styled(Stack)(() => ({
      ['.MuiSvgIcon-root']: {
        fontSize: '30px',
      },
    }))
  )

  return (
    <ROOT direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <OracleCard
        title={t('oracleCards.dataSources.title')}
        subTitle={t('oracleCards.dataSources.subTitle')}
        learnMoreUrl="https://docs.vinci.io/nft-price-oracle/data-sources"
        icon={<AnalyticsTwoToneIcon color="primary" />}
      />
      <OracleCard
        title={t('oracleCards.pricingStrategies.title')}
        subTitle={t('oracleCards.pricingStrategies.subTitle')}
        learnMoreUrl="https://docs.vinci.io/nft-price-oracle/pricing-strategies"
        icon={<SecurityTwoToneIcon color="primary" />}
      />
      <OracleCard
        title={t('oracleCards.dataFeeds.title')}
        subTitle={t('oracleCards.dataFeeds.subTitle')}
        learnMoreUrl="https://docs.vinci.io/nft-price-oracle/data-feeds"
        icon={<IntegrationInstructionsTwoToneIcon color="primary" />}
      />
    </ROOT>
  )
}

export default OracleCards
