import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { TableCellRenderer } from 'react-virtualized'
import { useContractData, useDialogs } from 'domains'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TableCell from '@mui/material/TableCell'

import type { TableColumnsProps, BasicTableProps } from 'lib/table/BasicTable/types'
import {
  collectionHeaderRenderer,
  collectionCellRenderer,
  headerRenderer,
  leftHeaderRenderer,
  BalanceCellRenderer,
  HealthFactorCellRenderer,
  PercentCellRenderer,
} from 'components/Table'
import { TabValue } from 'app/Dialogs/constants'

export const useTable = (): BasicTableProps => {
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
            width: 250,
            headerRenderer: collectionHeaderRenderer,
            cellRenderer: collectionCellRenderer,
          },
          {
            dataKey: 'borrowBalance',
            width: 130,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: BalanceCellRenderer,
          },
          {
            dataKey: 'borrowAPY',
            width: 80,
            headerRenderer,
            cellRenderer: PercentCellRenderer,
          },
          {
            dataKey: 'healthFactor',
            width: 130,
            headerRenderer,
            cellRenderer: HealthFactorCellRenderer,
          },
          {
            dataKey: 'functionButtons',
            width: 120,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: FunctionButtonsCellRenderer,
          },
        ] as TableColumnsProps[]
      ).map((column) => {
        column.label = t('dashboard:loans.' + column.dataKey)
        return column
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  )

  const data = useMemo(() => {
    if (!nftAssets) return []
    return nftAssets.filter(({ borrowBalance }) => !borrowBalance.isNaN() && !borrowBalance.eq(0))
  }, [nftAssets])

  return {
    columns,
    data,
  }
}
