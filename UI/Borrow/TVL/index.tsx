import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import LockTwoTone from '@mui/icons-material/LockTwoTone'
import MonetizationOnTwoTone from '@mui/icons-material/MonetizationOnTwoTone'
import { useContractData } from 'domains'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import NumberDisplay from 'components/math/NumberDisplay'
import TVLItem from './TVLItem'
import type { TVLProps } from './types'

const TVL: FC<TVLProps> = () => {
  const { t } = useTranslation('borrow')
  const ROOT = useMemoEmpty(() =>
    styled(Stack)(() => ({
      ['.MuiSvgIcon-root']: {
        fontSize: '30px',
      },
    }))
  )

  const { dashboard } = useContractData()

  return (
    <ROOT direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <TVLItem
        title={t('TVL.totalCollateralledValue')}
        value={
          <NumberDisplay
            sx={{
              width: '2.125rem',
              height: '2.125rem',
              marginRight: '8px',
            }}
            value={dashboard.totalCollateralledValue}
            type="network"
          />
        }
        icon={<LockTwoTone color="primary" />}
      />
      <TVLItem
        title={t('TVL.totalBorrowed')}
        value={
          <NumberDisplay
            sx={{
              width: '2.125rem',
              height: '2.125rem',
              marginRight: '8px',
            }}
            value={dashboard.totalBorrowed}
            type="network"
          />
        }
        icon={<MonetizationOnTwoTone color="primary" />}
      />
    </ROOT>
  )
}

export default TVL
