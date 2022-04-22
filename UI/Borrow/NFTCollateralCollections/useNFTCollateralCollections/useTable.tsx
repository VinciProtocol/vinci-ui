import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useContractData } from 'domains'
import type { TableCellRenderer } from 'react-virtualized'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TableCell from '@mui/material/TableCell'

import { NFTTabValue } from 'app/App/pages/borrowDetail'
import type { TableColumnsProps, VirtualizedTableProps } from 'lib/table/VirtualizedTable'
import {
  collectionHeaderRenderer,
  collectionCellRenderer,
  BalanceCellRenderer,
  leftHeaderRenderer,
  NumberDisplayCellRenderer,
} from 'components/Table'

export const useTable = (): VirtualizedTableProps => {
  const router = useRouter()
  const { t } = useTranslation()

  const { nftAssets } = useContractData()

  const FunctionButtonsCellRenderer: TableCellRenderer = useCallback(
    ({ rowData }) => {
      return (
        <TableCell component="div">
          <Stack spacing={2} direction="row">
            <Button
              variant="outlined"
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                e.nativeEvent.stopImmediatePropagation()
                router.push({
                  pathname: '/borrow/[id]',
                  query: { id: rowData.underlyingAsset, tabpanelKey: NFTTabValue.deposit },
                })
              }}
            >
              {t('borrow:NFTCollateralCollections.actions.depositNFT')}
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                e.nativeEvent.stopImmediatePropagation()
                router.push({
                  pathname: '/borrow/[id]',
                  query: { id: rowData.underlyingAsset, tabpanelKey: NFTTabValue.borrow },
                })
              }}
            >
              {t('borrow:NFTCollateralCollections.actions.borrow')}
            </Button>
          </Stack>
        </TableCell>
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
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
            dataKey: 'currentFloorPrice',
            width: 200,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: BalanceCellRenderer,
          },
          {
            dataKey: 'activeCollaterals',
            width: 150,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: NumberDisplayCellRenderer,
          },
          {
            dataKey: 'totalBorrowed',
            width: 200,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: BalanceCellRenderer,
          },
          {
            dataKey: 'availableToBorrow',
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
        column.label = t('borrow:NFTCollateralCollections.' + column.dataKey)
        return column
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  )

  const tableProps: VirtualizedTableProps['tableProps'] = useMemo(
    () => ({
      onRowClick: ({ rowData }) => {
        router.push({
          pathname: '/borrow/[id]',
          query: { id: rowData.underlyingAsset },
        })
      },
    }),
    [router]
  )

  return {
    columns,
    data: nftAssets,
    tableProps,
  }
}
