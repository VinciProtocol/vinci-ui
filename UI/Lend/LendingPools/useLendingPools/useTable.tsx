import { useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { TableCellRenderer } from 'react-virtualized'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TableCell from '@mui/material/TableCell'

import type { TableColumnsProps, BasicTableProps } from 'lib/table/BasicTable/types'
import { TabValue } from 'app/Dialogs/constants'
import {
  leftHeaderRenderer,
  symbolCellRenderer,
  headerRenderer,
  PercentCellRenderer,
  ETHCellRenderer,
} from 'components/Table'
import { useDialogs, useContractData } from 'domains'

export const useTable = (): BasicTableProps => {
  const { t } = useTranslation()

  const { actions } = useDialogs()
  const { generalAssets } = useContractData()

  const FunctionButtonsCellRenderer: TableCellRenderer = useCallback(
    ({ rowData }) => {
      return (
        <TableCell component="div">
          <Stack spacing={2} direction="row">
            <Button
              variant="outlined"
              size="small"
              onClick={() =>
                actions.depositDialogOpen(TabValue.deposit, {
                  underlyingAsset: rowData.underlyingAsset,
                  id: rowData.id,
                  lendingPoolAddress: rowData.lendingPoolAddress,
                })
              }
            >
              {t('common:wallet.btn.deposit')}
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() =>
                actions.depositDialogOpen(TabValue.withdraw, {
                  underlyingAsset: rowData.underlyingAsset,
                  id: rowData.id,
                  lendingPoolAddress: rowData.lendingPoolAddress,
                })
              }
            >
              {t('common:wallet.btn.withdraw')}
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
            width: 250,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: symbolCellRenderer,
          },
          {
            dataKey: 'APY',
            width: 200,
            headerRenderer,
            cellRenderer: PercentCellRenderer,
          },
          {
            dataKey: 'totalSupply',
            width: 230,
            headerRenderer,
            cellRenderer: ETHCellRenderer,
          },
          {
            dataKey: 'totalBorrowed',
            width: 200,
            headerRenderer,
            cellRenderer: ETHCellRenderer,
          },
          {
            dataKey: 'utilization',
            width: 200,
            headerRenderer,
            cellRenderer: PercentCellRenderer,
          },
          {
            dataKey: 'functionButtons',
            width: 250,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: FunctionButtonsCellRenderer,
          },
        ] as Array<
          TableColumnsProps & {
            hide?: boolean
          }
        >
      )
        .filter((column) => !column.hide)
        .map((column) => {
          column.label = t('lend:lendingPools.' + column.dataKey)
          return column
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  )

  return {
    columns,
    data: generalAssets,
  }
}
