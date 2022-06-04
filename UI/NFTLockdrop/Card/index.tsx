import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import { useThegraph } from 'domains'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import NumberDisplay from 'components/math/NumberDisplay'
import CardItem from './CardItem'
import type { CardProps } from './types'
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone'
import LockTwoTone from '@mui/icons-material/LockTwoTone'
import RewardTwoTone from '@mui/icons-material/EmojiEventsTwoTone'
import TokenTwoTone from '@mui/icons-material/TokenTwoTone'

const Card: FC<CardProps> = () => {
  const { t } = useTranslation('nft-lockdrop')
  const ROOT = useMemoEmpty(() =>
    styled(Stack)(() => ({
      ['.MuiSvgIcon-root']: {
        fontSize: '30px',
      },
    }))
  )

  const { timeLockedDashboard } = useThegraph()

  return (
    <ROOT direction="row" spacing={2}>
      <CardItem
        title={t('Card.totalValueLocked')}
        value={
          <NumberDisplay
            value={timeLockedDashboard.TVL}
            type="network"
            sx={{
              width: '2.125rem',
              height: '2.125rem',
              marginRight: '8px',
            }}
          />
        }
        icon={<LockTwoTone color="primary" />}
      />
      <CardItem
        title={t('Card.totalLockedNFT')}
        value={<NumberDisplay value={timeLockedDashboard.totalLocked} options="number" />}
        icon={<TokenTwoTone color="primary" />}
      />
      <CardItem
        title={t('Card.rewardAPR')}
        value={<NumberDisplay value={timeLockedDashboard.rewardAPR} options="percent" />}
        icon={<MonetizationOnTwoToneIcon color="primary" />}
      />
      <CardItem
        title={t('Card.estmatedRewards')}
        value={
          <NumberDisplay
            value={timeLockedDashboard.estmatedRewards}
            type="VCI"
            sx={{
              width: '2.125rem',
              height: '2.125rem',
              marginRight: '8px',
            }}
          />
        }
        icon={<RewardTwoTone color="primary" />}
      />
    </ROOT>
  )
}

export default Card
