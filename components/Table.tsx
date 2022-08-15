import type { FC } from 'react'
import { useMemo, useRef } from 'react'
import { useTheme } from '@mui/material/styles'
import type { TableCellRenderer, TableHeaderRenderer } from 'react-virtualized'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TableCell from '@mui/material/TableCell'
import { grey } from '@mui/material/colors'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import InsertLinkIcon from '@mui/icons-material/InsertLink'
import { format } from 'date-fns'
import { Line } from 'react-chartjs-2'

import { NFTIcon, NFTSmallIcon, TokenIcon } from 'app/web3/TokenIcon'
import NumberDisplay from 'components/math/NumberDisplay'
import { useTranslation } from 'next-i18next'
import HealthFactor from './HealthFactor'
import { valueToBigNumber } from 'utils/math'
import RiseOrFall from './math/RiseOrFall'
import { safeGet } from 'utils/get'
import type { FloorPriceTrendsChartProps } from 'UI/BorrowDetail/FloorPriceTrends/types'
import LinkToAddress from './LinkToAddress'

const Oracle7Trend: FC<{ nft: any }> = ({ nft }) => {
  const theme = useTheme()
  const lineChart = useRef({ width: 0, height: 0, gradient: undefined })
  const props = useMemo(
    () =>
      ({
        data: {
          datasets: [
            {
              label: nft?.collection,
              data: nft.oracle7Trend,
              backgroundColor: (context) => {
                const chart = context.chart
                const { ctx, chartArea } = chart
                if (!chartArea) return null
                const chartWidth = chartArea.right - chartArea.left
                const chartHeight = chartArea.bottom - chartArea.top
                if (!chartWidth) return null
                const { width, height } = lineChart.current
                let { gradient } = lineChart.current
                if (width !== chartWidth || height !== chartHeight) {
                  gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
                  gradient.addColorStop(0, 'rgb(249, 68, 50, 0)')
                  gradient.addColorStop(0.5, 'rgba(249, 68, 50, 0.5)')
                  gradient.addColorStop(1, 'rgba(249, 68, 50, 1)')
                  lineChart.current = {
                    width: chartWidth,
                    height: chartHeight,
                    gradient,
                  }
                }
                return gradient
              },
              fill: 'start',
              borderColor: theme.palette.primary.main,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  return ` ${context.parsed.y} ETH`
                },
                title: (context) => {
                  return `${context[0].label.split(',').slice(0, -1)}`
                },
              },
            },
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
              },
              display: false,
            },
            y: {
              display: false,
            },
          },
          elements: {
            point: {
              radius: 2,
            },
          },
        },
      } as FloorPriceTrendsChartProps),
    [nft?.collection, nft.oracle7Trend, theme.palette.primary.main]
  )

  return <Line width={250} height={60} {...props} />
}

export const Oracle7TrendCellRenderer: TableCellRenderer = ({ rowData }) => {
  return (
    <TableCell component="div">
      <Oracle7Trend nft={rowData} />
    </TableCell>
  )
}

export const DateCellRenderer: TableCellRenderer = ({ cellData }) => {
  return (
    <TableCell component="div">
      <span>{safeGet(() => format(cellData, 'MM/dd HH:mm')) || '-'}</span>
    </TableCell>
  )
}

export const IdCellRenderer: TableCellRenderer = ({ cellData }) => {
  return (
    <TableCell component="div">
      <LinkToAddress address={cellData} />
    </TableCell>
  )
}
export const Change24hCellRenderer: TableCellRenderer = ({ cellData }) => {
  return (
    <TableCell component="div">
      <RiseOrFall value={cellData} variant="body2" />
    </TableCell>
  )
}

export const BalanceCellRenderer: TableCellRenderer = ({ rowData, cellData, dataKey }) => {
  return (
    <TableCell component="div">
      <Stack spacing={1}>
        <Typography variant="body2">
          <NumberDisplay value={cellData} type="network" />
        </Typography>
        <Typography component="p" variant="caption" color={grey[500]}>
          <NumberDisplay value={rowData[dataKey + 'InUSD']} options="USD" />
        </Typography>
      </Stack>
    </TableCell>
  )
}

const InsufficientLiquidity: FC<{
  isInsufficientLiquidity: boolean
  value: string
  valueInUSD: string
}> = ({ isInsufficientLiquidity, value, valueInUSD }) => {
  const { t } = useTranslation('lend')
  const needTip = isInsufficientLiquidity && !parseFloat(value)
  if (needTip) {
    return <span>{t('lendingPools.insufficientLiquidity')}</span>
  }
  return <NumberDisplay value={valueInUSD} options="USD" />
}

export const AvailableToBorrowCellRenderer: TableCellRenderer = ({ rowData, cellData, dataKey }) => {
  return (
    <TableCell component="div">
      <Stack spacing={1}>
        <Typography variant="body2">
          <NumberDisplay value={cellData} type="network" />
        </Typography>
        <Typography component="p" variant="caption" color={grey[500]}>
          <InsufficientLiquidity
            isInsufficientLiquidity={rowData.isInsufficientLiquidity}
            value={cellData}
            valueInUSD={rowData[dataKey + 'InUSD']}
          />
        </Typography>
      </Stack>
    </TableCell>
  )
}
export const headerRenderer: TableHeaderRenderer = ({ label }) => {
  return (
    <TableCell align="center" component="div" variant="head">
      {label}
    </TableCell>
  )
}

export const leftHeaderRenderer: TableHeaderRenderer = ({ label }) => {
  return (
    <TableCell component="div" variant="head">
      {label}
    </TableCell>
  )
}

export const cellRenderer: TableCellRenderer = ({ cellData }) => {
  return (
    <TableCell align="center" component="div">
      {cellData || '-'}
    </TableCell>
  )
}

const TotalLockedNFTTooltip: FC = (props) => {
  const { t } = useTranslation()
  return (
    <Tooltip title={t('tips.NFTMarket')} placement="bottom-end" arrow>
      <Typography component="p" variant="caption" color="">
        {props.children}
      </Typography>
    </Tooltip>
  )
}

export const totalLockedNFTCellRenderer: TableCellRenderer = ({ cellData, rowData }) => {
  cellData = valueToBigNumber(cellData).toNumber()
  if (cellData > 0) {
    return (
      <TableCell align="center" component="div">
        <TotalLockedNFTTooltip>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              e.nativeEvent.stopImmediatePropagation()
              open('https://looksrare.org/accounts/' + rowData.nTokenAddress, '_blank')
            }}
            variant="text"
            endIcon={<InsertLinkIcon />}
          >
            {cellData}
          </Button>
        </TotalLockedNFTTooltip>
      </TableCell>
    )
  }
  return (
    <TableCell align="center" component="div">
      {cellData || '-'}
    </TableCell>
  )
}

export const leftCellRenderer: TableCellRenderer = ({ cellData }) => {
  return (
    <TableCell align="left" component="div">
      {cellData || '-'}
    </TableCell>
  )
}

const CollectionTooltip: FC = ({ children }) => {
  const { t } = useTranslation('lend')
  return (
    <Tooltip title={t('lendingPools.collectionTip', { name: children })} placement="bottom-end" arrow>
      <Typography component="p" variant="caption" color={grey[500]}>
        {children}
      </Typography>
    </Tooltip>
  )
}

export const symbolCellRenderer: TableCellRenderer = ({ cellData, rowData }) => {
  return (
    <TableCell component="div">
      <Stack spacing={2} direction="row">
        <Stack spacing={1}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={<NFTSmallIcon NFT_ID={rowData.NFT_ID} />}
          >
            <TokenIcon tokenSymbol={cellData} />
          </Badge>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="body2">{cellData}</Typography>
          <CollectionTooltip>{rowData.collection}</CollectionTooltip>
        </Stack>
      </Stack>
    </TableCell>
  )
}

export const SymbolAbbCellRenderer: TableCellRenderer = ({ cellData, rowData }) => {
  return (
    <TableCell component="div">
      <Stack spacing={2} direction="row">
        <Stack spacing={1}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={<NFTSmallIcon NFT_ID={rowData.NFT_ID} />}
          >
            <TokenIcon tokenSymbol={cellData} />
          </Badge>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="body2">{cellData}</Typography>
          <Typography component="p" variant="caption" color={grey[500]}>
            {rowData.collection}
          </Typography>
        </Stack>
      </Stack>
    </TableCell>
  )
}

export const collectionHeaderRenderer: TableHeaderRenderer = ({ label }) => {
  return (
    <TableCell align="left" component="div" variant="head">
      {label}
    </TableCell>
  )
}

export const collectionCellRenderer: TableCellRenderer = ({ cellData, rowData }) => {
  return (
    <TableCell align="left" component="div">
      <Stack spacing={1} direction="row">
        <NFTIcon NFT_ID={rowData.NFT_ID} />
        <Typography variant="body2" component="div" sx={{ lineHeight: '40px' }}>
          {cellData}
        </Typography>
      </Stack>
    </TableCell>
  )
}

export const USDCellRenderer: TableCellRenderer = ({ cellData }) => {
  return (
    <TableCell align="center" component="div">
      <NumberDisplay value={cellData} options="USD" />
    </TableCell>
  )
}

export const PercentCellRenderer: TableCellRenderer = ({ cellData }) => {
  return (
    <TableCell align="center" component="div">
      <NumberDisplay value={cellData} options="percent" />
    </TableCell>
  )
}

export const NumberCellRenderer: TableCellRenderer = ({ cellData }) => {
  return (
    <TableCell align="center" component="div">
      <NumberDisplay value={cellData} />
    </TableCell>
  )
}
export const HealthFactorCellRenderer: TableCellRenderer = ({ cellData }) => {
  return (
    <TableCell align="center" component="div">
      <HealthFactor value={cellData} />
    </TableCell>
  )
}
export const NumberDisplayCellRenderer: TableCellRenderer = ({ cellData }) => {
  return (
    <TableCell align="center" component="div">
      <NumberDisplay value={cellData} options="number" />
    </TableCell>
  )
}
export const DepositCountCellRenderer: TableCellRenderer = ({ cellData, rowData }) => {
  return (
    <TableCell align="center" component="div">
      <Stack spacing={1}>
        <Typography variant="body2">
          <NumberDisplay value={cellData} options="number" />
        </Typography>
        <Typography component="p" variant="caption" color={grey[500]}>
          <NumberDisplay value={rowData['collateralValueInUSD']} options="USD" />
        </Typography>
      </Stack>
    </TableCell>
  )
}
export const ETHCellRenderer: TableCellRenderer = ({ cellData }) => {
  return (
    <TableCell align="center" component="div">
      <NumberDisplay value={cellData} type="network" />
    </TableCell>
  )
}
export const VCICellRenderer: TableCellRenderer = ({ cellData }) => {
  return (
    <TableCell align="center" component="div">
      <NumberDisplay value={cellData} type="VCI" />
    </TableCell>
  )
}
