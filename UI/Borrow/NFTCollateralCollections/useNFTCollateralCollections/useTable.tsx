import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

import type { TableColumnsProps, VirtualizedTableProps } from 'lib/table/VirtualizedTable'

import {
  collectionHeaderRenderer,
  collectionCellRenderer,
  BalanceCellRenderer,
  leftHeaderRenderer,
} from 'components/Table'
import { useContractData } from 'domains'

export const useTable = (): VirtualizedTableProps => {
  const router = useRouter()
  const { t } = useTranslation()

  const { nftAssets } = useContractData()

  const columns = useMemo(
    () =>
      (
        [
          {
            dataKey: 'collection',
            width: 200,
            headerRenderer: collectionHeaderRenderer,
            cellRenderer: collectionCellRenderer,
          },
          {
            dataKey: 'currentFloorPrice',
            width: 250,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: BalanceCellRenderer,
          },
          {
            dataKey: 'totalCollateralledValue',
            width: 250,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: BalanceCellRenderer,
          },
          {
            dataKey: 'totalBorrowed',
            width: 250,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: BalanceCellRenderer,
          },
          {
            dataKey: 'availableToBorrow',
            width: 250,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: BalanceCellRenderer,
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
