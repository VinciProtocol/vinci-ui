import type { FC } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import { useContractData } from 'domains'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import NumberDisplay from 'components/math/NumberDisplay'
import CardItem from './CardItem'
import type { CardProps } from './types'
import LockClockTwoTone from './icon/LockClockTwoTone.svg'
import LockTwoTone from './icon/LockTwoTone.svg'
import RewardTwoTone from './icon/RewardTwoTone.svg'
import TokenTwoTone from './icon/TokenTwoTone.svg'

const Card: FC<CardProps> = () => {
  const { t } = useTranslation('nft-lockdrop')
  const ROOT = useMemoEmpty(() =>
    styled(Stack)(({ theme }) => ({
      paddingTop: theme.spacing(2),
    }))
  )

  const { dashboard } = useContractData()

  return (
    <ROOT direction="row" spacing={2}>
      <CardItem
        title={t('Card.totalValueLocked')}
        value={<NumberDisplay value={dashboard.totalValueLockedInUSD} options="USD" />}
        icon={<Image src={LockTwoTone} alt="icon" />}
      />
      <CardItem
        title={t('Card.totalLockedNFT')}
        value={<NumberDisplay value={dashboard.totalValueLockedInUSD} options="number" />}
        icon={<Image src={TokenTwoTone} alt="icon" />}
      />
      <CardItem
        title={t('Card.userLockedNFT')}
        value={<NumberDisplay value={dashboard.totalValueLockedInUSD} options="number" />}
        icon={<Image src={LockClockTwoTone} alt="icon" />}
      />
      <CardItem
        title={t('Card.estmatedRewards')}
        value={<NumberDisplay value={dashboard.totalValueLockedInUSD} options="number" />}
        icon={<Image src={RewardTwoTone} alt="icon" />}
      />
    </ROOT>
  )
}

export default Card
