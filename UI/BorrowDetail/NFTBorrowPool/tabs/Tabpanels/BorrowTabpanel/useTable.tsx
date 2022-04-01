import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { TableCellRenderer } from 'react-virtualized'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TableCell from '@mui/material/TableCell'
import { useDialogs, useContractNFT } from 'domains'

import { TabValue } from 'app/Dialogs/constants'
import type { TableColumnsProps, VirtualizedTableProps } from 'lib/table/VirtualizedTable'
import {
  leftHeaderRenderer,
  SymbolAbbCellRenderer,
  headerRenderer,
  BalanceCellRenderer,
  PercentCellRenderer,
  AvailableToBorrowCellRenderer,
} from 'components/Table'

export const useTable = (): VirtualizedTableProps => {
  const { t } = useTranslation()
  const { actions } = useDialogs()
  const { nft } = useContractNFT()

  const FunctionButtonsCellRenderer: TableCellRenderer = useCallback(
    ({ rowData }) => {
      return (
        <TableCell component="div">
          <Stack spacing={2} direction="row">
            <Button
              variant="outlined"
              size="small"
              onClick={() =>
                actions.borrowDialogOpen(TabValue.borrow, { underlyingAsset: rowData.underlyingAsset, id: rowData.id })
              }
            >
              {t('common:wallet.btn.borrow')}
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() =>
                actions.borrowDialogOpen(TabValue.repay, { underlyingAsset: rowData.underlyingAsset, id: rowData.id })
              }
            >
              {t('common:wallet.btn.repay')}
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
            dataKey: 'symbol',
            width: 150,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: SymbolAbbCellRenderer,
          },
          {
            dataKey: 'borrowAPY',
            width: 200,
            headerRenderer,
            cellRenderer: PercentCellRenderer,
          },
          {
            dataKey: 'availableToBorrow',
            width: 250,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: AvailableToBorrowCellRenderer,
          },
          {
            dataKey: 'borrowBalance',
            width: 200,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: BalanceCellRenderer,
          },
          {
            dataKey: 'functionButtons',
            width: 250,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: FunctionButtonsCellRenderer,
          },
        ] as TableColumnsProps[]
      ).map((column) => {
        column.label = t('borrow-detail:NFTBorrowPool.' + column.dataKey)
        return column
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  )

  const tableProps: VirtualizedTableProps['tableProps'] = useMemo(() => ({}), [])

  return {
    columns,
    data: nft.data,
    tableProps,
  }
}
