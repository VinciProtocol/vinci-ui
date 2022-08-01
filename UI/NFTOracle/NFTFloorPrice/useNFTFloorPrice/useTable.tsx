import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import TableCell from '@mui/material/TableCell'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import type { TableCellRenderer } from 'react-virtualized'

import type { BasicTableProps, TableColumnsProps } from 'lib/table/BasicTable/types'
import {
  leftHeaderRenderer,
  BalanceCellRenderer,
  collectionCellRenderer,
  collectionHeaderRenderer,
  Change24hCellRenderer,
  DateCellRenderer,
  Oracle7TrendCellRenderer,
} from 'components/Table'

import { useTableSearch } from './useTableSearch'

export const useTable = () => {
  const router = useRouter()
  const { t } = useTranslation('nft-oracle')

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
                  pathname: '/nft-oracle/[id]',
                  query: { id: rowData.underlyingAsset },
                })
              }}
            >
              {t('NFTFloorPrice.actions.details')}
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
            dataKey: 'change24h',
            width: 200,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: Change24hCellRenderer,
          },
          {
            dataKey: 'lastUpdate',
            width: 200,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: DateCellRenderer,
          },
          {
            dataKey: 'trend',
            width: 300,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: Oracle7TrendCellRenderer,
          },
          {
            dataKey: 'functionButtons',
            width: 150,
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
          column.label = t('NFTFloorPrice.' + column.dataKey)
          return column
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  )

  const tableProps: BasicTableProps['tableProps'] = useMemo(
    () => ({
      onRowClick: ({ rowData }) => {
        router.push({
          pathname: '/nft-oracle/[id]',
          query: { id: rowData.underlyingAsset },
        })
      },
    }),
    [router]
  )

  const title = useMemo(() => t('NFTFloorPrice.title'), [t])

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
