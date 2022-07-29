import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import type { TableColumnsProps } from 'lib/table/BasicTable/types'
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
  const { t } = useTranslation('nft-oracle')

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

  const title = useMemo(() => t('NFTFloorPrice.title'), [t])

  const search = useTableSearch()

  return {
    title,
    search,
    table: {
      columns,
    },
  }
}
