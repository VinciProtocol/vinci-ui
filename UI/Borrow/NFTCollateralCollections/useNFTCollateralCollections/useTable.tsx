import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import type { TableCellRenderer } from 'react-virtualized'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TableCell from '@mui/material/TableCell'

import { NFTTabValue } from 'app/App/pages/borrowDetail'
import type { BasicTableProps, TableColumnsProps } from 'lib/table/BasicTable/types'
import {
  collectionHeaderRenderer,
  collectionCellRenderer,
  BalanceCellRenderer,
  leftHeaderRenderer,
  totalLockedNFTCellRenderer,
  PercentCellRenderer,
  headerRenderer,
} from 'components/Table'

import { useTableSearch } from './useTableSearch'

export const useTable = () => {
  const router = useRouter()
  const { t } = useTranslation('borrow')

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
              {t('NFTCollateralCollections.actions.depositNFT')}
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
              {t('NFTCollateralCollections.actions.borrow')}
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
            cellRenderer: totalLockedNFTCellRenderer,
          },
          {
            dataKey: 'availableToBorrow',
            width: 200,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: BalanceCellRenderer,
          },
          {
            dataKey: 'borrowAPY',
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
        ] as TableColumnsProps[]
      ).map((column) => {
        column.label = t('NFTCollateralCollections.' + column.dataKey)
        return column
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  )

  const tableProps: BasicTableProps['tableProps'] = useMemo(
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

  const title = useMemo(() => t('NFTCollateralCollections.title'), [t])

  const search = useTableSearch()

  return {
    title,
    search,
    table: {
      columns,
      tableProps,
    },
  }
}
