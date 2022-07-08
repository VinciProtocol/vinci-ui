import { useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { TableCellRenderer } from 'react-virtualized'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TableCell from '@mui/material/TableCell'
import { useContractData, useDialogs } from 'domains'

import { useWallet } from 'app/wallet'
import {
  ETHCellRenderer,
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
            width: 180,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: symbolCellRenderer,
          },
          {
            dataKey: 'totalSupply',
            width: 250,
            headerRenderer,
            cellRenderer: ETHCellRenderer,
          },
          {
            dataKey: 'APY',
            width: 180,
            headerRenderer,
            cellRenderer: PercentCellRenderer,
          },
          {
            dataKey: 'functionButtons',
            width: 180,
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
          column.label = t('my-dashboard:lend.' + column.dataKey)
          return column
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, account]
  )

  return {
    columns,
    data: generalAssets,
  }
}
