import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useContractData } from 'domains'
import type { TableCellRenderer } from 'react-virtualized'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TableCell from '@mui/material/TableCell'

import { NFTTabValue } from 'app/App/pages/borrowDetail'
import type { TableColumnsProps, BasicTableProps } from 'lib/table/BasicTable/types'
import {
  collectionHeaderRenderer,
  collectionCellRenderer,
  BalanceCellRenderer,
  leftHeaderRenderer,
  ActiveCollateralsCellRenderer,
} from 'components/Table'
import { safeGet } from 'utils/get'

export const useTable = (): BasicTableProps => {
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
            cellRenderer: ActiveCollateralsCellRenderer,
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

  const data = useMemo(() => nftAssets.filter((nftAsset) => safeGet(() => nftAsset.reserves.length)), [nftAssets])

  return {
    columns,
    data,
    tableProps,
  }
}
