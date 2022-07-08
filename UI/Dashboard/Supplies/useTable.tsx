import { useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { TableCellRenderer } from 'react-virtualized'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TableCell from '@mui/material/TableCell'
import BigNumber from 'bignumber.js'
import { useContractData, useDialogs } from 'domains'

import { useWallet } from 'app/wallet'
import {
  BalanceCellRenderer,
  headerRenderer,
  leftHeaderRenderer,
  PercentCellRenderer,
  symbolCellRenderer,
} from 'components/Table'
import type { TableColumnsProps, BasicTableProps } from 'lib/table/BasicTable/types'
import { TabValue } from 'app/Dialogs/constants'

export const useTable = (): BasicTableProps => {
  const { t } = useTranslation()
  const { actions } = useDialogs()
  const { generalAssets } = useContractData()
  const { networkAccount: account } = useWallet()

  const FunctionButtonsCellRenderer: TableCellRenderer = useCallback(
    ({ rowData }) => {
      return (
        <TableCell component="div">
          <Stack spacing={1} direction="row">
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
            width: 230,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: symbolCellRenderer,
          },
          {
            dataKey: 'underlyingBalance',
            width: 140,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: BalanceCellRenderer,
          },
          {
            dataKey: 'APY',
            width: 140,
            headerRenderer,
            cellRenderer: PercentCellRenderer,
          },
          {
            dataKey: 'functionButtons',
            width: 200,
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
          column.label = t('my-dashboard:supplies.' + column.dataKey)
          return column
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, account]
  )

  const data = useMemo(
    () => generalAssets.filter(({ underlyingBalance }) => underlyingBalance && !new BigNumber(underlyingBalance).eq(0)),
    [generalAssets]
  )

  return {
    columns,
    data,
  }
}
