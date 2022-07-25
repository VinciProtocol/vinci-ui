import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Paper from '@mui/material/Paper'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import NumberDisplay from 'components/math/NumberDisplay'

import Chart from './Chart'
import type { FloorPriceTrendsProps } from './types'
import { useChart } from './useChart'

const FloorPriceTrends: FC<FloorPriceTrendsProps> = () => {
  const { t } = useTranslation('borrow-detail')
  const ROOT = useMemoEmpty(() =>
    styled(Paper)(({ theme }) => ({
      padding: theme.spacing(2),
      borderRadius: '10px',
      minHeight: '530px',
    }))
  )
  const Title = useMemoEmpty(() => styled('div')``)
  const SubTitle = useMemoEmpty(
    () => styled('div')`
      display: flex;
      justify-content: space-between;
      align-items: 'center';
    `
  )
  const Left = useMemoEmpty(
    () => styled(Stack)`
      align-items: flex-end;
    `
  )
  const Change24h = useMemoEmpty(
    () => styled(Stack)`
      align-items: flex-end;
    `
  )
  const Right = useMemoEmpty(() => styled('div')``)

  const chart = useChart()

  return (
    <ROOT variant="card">
      <Stack spacing={2}>
        <Typography variant="h5">
          <Title>{t('floorPriceTrends.title')}</Title>
        </Typography>
        <SubTitle>
          <Left spacing={2} direction="row">
            <Typography variant="h5">
              <NumberDisplay
                sx={{
                  width: '1.5rem',
                  height: '1.5rem',
                }}
                value={chart.currentFloorPrice}
                options="USD"
                type="network"
              />
            </Typography>
            <Change24h spacing={1} direction="row">
              <Typography variant="caption" color="text.secondary">
                <span>{t('floorPriceTrends.change24h')}</span>
              </Typography>
              <Typography variant="body2" color="primary.main">
                <NumberDisplay value={chart.change24} options="percent" />
              </Typography>
            </Change24h>
          </Left>
          <Right>
            <ToggleButtonGroup
              color="primary"
              value={chart.dayButton.value}
              exclusive
              onChange={chart.dayButton.onChange}
            >
              {chart.dayButton.list.map((day) => (
                <ToggleButton value={day} key={day} size="small">
                  {day} {t('floorPriceTrends.days')}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Right>
        </SubTitle>
        <Chart {...chart.props} />
      </Stack>
    </ROOT>
  )
}

export default FloorPriceTrends
