import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { TableCellRenderer } from 'react-virtualized'
import { useContractData, useDialogs } from 'domains'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TableCell from '@mui/material/TableCell'

import type { TableColumnsProps, VirtualizedTableProps } from 'lib/table/VirtualizedTable'
import {
  collectionHeaderRenderer,
  collectionCellRenderer,
  headerRenderer,
  NumberCellRenderer,
  leftHeaderRenderer,
  BalanceCellRenderer,
} from 'components/Table'
import { TabValue } from 'app/Dialogs/constants'

export const useTable = (): VirtualizedTableProps => {
  const { t } = useTranslation()

  const { nftAssets } = useContractData()
  const { actions } = useDialogs()

  const FunctionButtonsCellRenderer: TableCellRenderer = useCallback(
    ({ rowData }) => {
      return (
        <TableCell component="div">
          <Stack spacing={2} direction="row">
            <Button
              variant="outlined"
              size="small"
              onClick={() =>
                actions.nftDetailsDialogOpen(TabValue.deposit, {
                  underlyingAsset: rowData.underlyingAsset,
                  id: rowData.id,
                  lendingPoolAddress: rowData.lendingPoolAddress,
                })
              }
            >
              {t('common:wallet.btn.details')}
            </Button>
          </Stack>
        </TableCell>
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, actions]
  )

  const columns = useMemo(
    () =>
      (
        [
          {
            dataKey: 'collection',
            width: 300,
            headerRenderer: collectionHeaderRenderer,
            cellRenderer: collectionCellRenderer,
          },
          {
            dataKey: 'collateralValue',
            width: 250,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: BalanceCellRenderer,
          },
          {
            dataKey: 'borrowBalance',
            width: 250,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: BalanceCellRenderer,
          },
          {
            dataKey: 'currentFloorPrice',
            width: 250,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: BalanceCellRenderer,
          },
          {
            dataKey: 'liquidationPrice',
            width: 250,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: BalanceCellRenderer,
          },
          {
            dataKey: 'healthFactor',
            width: 200,
            headerRenderer,
            cellRenderer: NumberCellRenderer,
          },
          {
            dataKey: 'functionButtons',
            width: 180,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: FunctionButtonsCellRenderer,
          },
        ] as TableColumnsProps[]
      ).map((column) => {
        column.label = t('my-dashboard:loans.' + column.dataKey)
        return column
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  )

  const data = useMemo(() => {
    if (!nftAssets) return []
    return nftAssets.filter(
      ({ borrowBalance, collateralValue }) =>
        !borrowBalance.isNaN() && !collateralValue.isNaN() && (!borrowBalance.eq(0) || !collateralValue.eq(0))
    )
  }, [nftAssets])

  return {
    columns,
    data,
  }
}
