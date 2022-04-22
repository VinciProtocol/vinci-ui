import type { TableCellRenderer, TableHeaderRenderer } from 'react-virtualized'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import TableCell from '@mui/material/TableCell'
import { grey } from '@mui/material/colors'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'

import { NFTIcon, NFTSmallIcon, TokenIcon } from 'app/web3/TokenIcon'
import NumberDisplay from 'components/math/NumberDisplay'
import type { FC } from 'react'
import { useTranslation } from 'next-i18next'

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
            badgeContent={<NFTSmallIcon collection={rowData.collection} />}
          >
            <TokenIcon tokenSymbol={cellData} />
          </Badge>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="body2">{cellData}</Typography>
          <CollectionTooltip>{rowData.collectionName}</CollectionTooltip>
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
            badgeContent={<NFTSmallIcon collection={rowData.collection} />}
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
        <NFTIcon collection={cellData} />
        <Typography variant="body2" component="div" sx={{ lineHeight: '40px' }}>
          {rowData.name}
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
export const NumberDisplayCellRenderer: TableCellRenderer = ({ cellData }) => {
  return (
    <TableCell align="center" component="div">
      <NumberDisplay value={cellData} options="number" />
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
