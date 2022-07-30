import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useContractNFT, useThegraph } from 'domains'

import type { TableColumnsProps, BasicTableProps } from 'lib/table/BasicTable/types'
import {
  collectionHeaderRenderer,
  leftHeaderRenderer,
  IdCellRenderer,
  ETHCellRenderer,
  DateCellRenderer,
  headerRenderer,
} from 'components/Table'
import { safeGet } from 'utils/get'
import { valueToBigNumber } from 'utils/math'

export const useTable = (): BasicTableProps => {
  const { t } = useTranslation('nft-oracle-detail')

  const { nft } = useContractNFT()
  const { oracleRecordsSource } = useThegraph()

  const columns = useMemo(
    () =>
      (
        [
          {
            dataKey: 'id',
            width: 500,
            headerRenderer: collectionHeaderRenderer,
            cellRenderer: IdCellRenderer,
          },
          {
            dataKey: 'price',
            width: 500,
            headerRenderer,
            cellRenderer: ETHCellRenderer,
          },
          {
            dataKey: 'createTime',
            width: 500,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: DateCellRenderer,
          },
        ] as TableColumnsProps[]
      ).map((column) => {
        column.label = t('updateHistory.' + column.dataKey)
        return column
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  )

  const data = useMemo(() => {
    if (!nft || !oracleRecordsSource || !oracleRecordsSource.length) return []
    const key = safeGet(() => nft.nftSetting.oracle)
    if (!key) return []
    return oracleRecordsSource
      .map((oracleRecord) => ({
        ...oracleRecord,
        price: valueToBigNumber((oracleRecord as any)[key]).div(10000),
      }))
      .sort((a, b) => b.createTime - a.createTime)
  }, [nft, oracleRecordsSource])

  return {
    columns,
    data,
  }
}
