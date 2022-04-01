import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import { useContractData } from 'domains'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import NumberDisplay from 'components/math/NumberDisplay'
import TVLItem from './TVLItem'
import type { TVLProps } from './types'

const TVL: FC<TVLProps> = () => {
  const { t } = useTranslation('lend')
  const ROOT = useMemoEmpty(() => styled(Stack)``)

  const { dashboard } = useContractData()

  return (
    <ROOT direction="row" spacing={2}>
      <TVLItem
        title={t('TVL.totalValueLocked')}
        value={<NumberDisplay value={dashboard.totalValueLockedInUSD} options="USD" />}
      />
    </ROOT>
  )
}

export default TVL
