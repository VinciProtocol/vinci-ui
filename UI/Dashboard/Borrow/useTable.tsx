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
  PercentCellRenderer,
} from 'components/Table'
import { TabValue } from 'app/Dialogs/constants'
import { safeGet } from 'utils/get'

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
            width: 230,
            headerRenderer: collectionHeaderRenderer,
            cellRenderer: collectionCellRenderer,
          },
          {
            dataKey: 'currentFloorPrice',
            width: 140,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: BalanceCellRenderer,
          },
          {
            dataKey: 'borrowAPY',
            width: 140,
            headerRenderer,
            cellRenderer: PercentCellRenderer,
          },
          {
            dataKey: 'functionButtons',
            width: 100,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: FunctionButtonsCellRenderer,
          },
        ] as TableColumnsProps[]
      ).map((column) => {
        column.label = t('dashboard:borrow.' + column.dataKey)
        return column
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  )

  const data = useMemo(() => nftAssets.filter((nftAsset) => safeGet(() => nftAsset.reserves.length)), [nftAssets])

  return {
    columns,
    data,
  }
}
