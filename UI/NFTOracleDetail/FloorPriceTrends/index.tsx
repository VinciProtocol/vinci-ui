import type { FC } from 'react'
import { Fragment, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Paper from '@mui/material/Paper'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import NumberDisplay from 'components/math/NumberDisplay'
import RiseOrFall from 'components/math/RiseOrFall'

import Chart from './Chart'
import type { FloorPriceTrendsProps } from './types'
import { useChart } from './useChart'

const FloorPriceTrends: FC<FloorPriceTrendsProps> = () => {
  const { t } = useTranslation('borrow-detail')
  const ROOT = useMemoEmpty(() =>
    styled(Paper)(({ theme }) => ({
      padding: theme.spacing(2),
      borderRadius: '10px',
      flex: 8,
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
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  const left = useMemo(
    () => (
      <Left spacing={2} direction="row">
        <Typography variant="h5">
          <NumberDisplay
            sx={{
              width: '1.25rem',
              height: '1.25rem',
            }}
            value={chart.currentFloorPrice}
            type="network"
          />
        </Typography>
        <Change24h spacing={1} direction="row">
          <Typography variant="subtitle1" color="text.secondary">
            <span>{t('floorPriceTrends.change24h')}</span>
          </Typography>
          <RiseOrFall variant="subtitle1" value={chart.change24} />
        </Change24h>
      </Left>
    ),
    [Change24h, Left, chart.change24, chart.currentFloorPrice, t]
  )

  const right = useMemo(
    () => (
      <Right>
        <ToggleButtonGroup color="primary" value={chart.dayButton.value} exclusive onChange={chart.dayButton.onChange}>
          {chart.dayButton.list.map((day) => (
            <ToggleButton value={day} key={day} size="small">
              {day} {t('floorPriceTrends.days')}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Right>
    ),
    [Right, chart.dayButton.list, chart.dayButton.onChange, chart.dayButton.value, t]
  )

  return (
    <ROOT variant="card">
      <Stack spacing={2}>
        <Typography variant="h5">
          <Title>{t('floorPriceTrends.title')}</Title>
        </Typography>
        {matches ? (
          <SubTitle>
            {left}
            {right}
          </SubTitle>
        ) : (
          <Fragment>
            {left}
            {right}
          </Fragment>
        )}
        <Chart {...chart.props} />
      </Stack>
    </ROOT>
  )
}

export default FloorPriceTrends
