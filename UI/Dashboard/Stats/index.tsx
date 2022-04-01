import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import StatsItem from './StatsItem'
import type { StatsProps } from './types'
import { useContractData } from 'domains'
import NumberDisplay from 'components/math/NumberDisplay'

const Stats: FC<StatsProps> = () => {
  const { t } = useTranslation()
  const ROOT = useMemoEmpty(() =>
    styled('div')(({ theme }) => ({
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: `${theme.spacing(4)} ${theme.spacing(16)}`,
    }))
  )
  const { dashboard } = useContractData()

  const Ring: FC = () => (
    <svg viewBox="0 0 80 80" width="100%">
      <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth={1} fill="none" />
    </svg>
  )

  const NetAPYBox = useMemoEmpty(() =>
    styled('div')(() => ({
      position: 'relative',
      width: 240,
      height: 240,
    }))
  )

  const NetAPYRing = useMemoEmpty(() =>
    styled('div')(({ theme }) => ({
      color: theme.palette.primary.main,
    }))
  )

  const NetAPYDesc = useMemoEmpty(() =>
    styled('div')(() => ({
      position: 'absolute',
      top: '25%',
      left: 0,
      right: 0,
      bottom: 0,
      ['& .MuiPaper-root']: {
        backgroundColor: 'transparent',
      },
    }))
  )

  return (
    <ROOT>
      <StatsItem
        title={t('my-dashboard:stats.supplyBalance')}
        value={<NumberDisplay value={dashboard.supplyBalanceInUSD} options="USD" />}
      />
      <NetAPYBox>
        <NetAPYRing>
          <Ring />
        </NetAPYRing>
        <NetAPYDesc>
          <StatsItem
            title={t('my-dashboard:stats.netAPY')}
            value={<NumberDisplay value={dashboard.netAPY} options="percent" />}
          />
        </NetAPYDesc>
      </NetAPYBox>
      <StatsItem
        title={t('my-dashboard:stats.norrowBalance')}
        value={<NumberDisplay value={dashboard.borrowBalanceInUSD} options="USD" />}
      />
    </ROOT>
  )
}

export default Stats
