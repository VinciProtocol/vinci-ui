import type { FC } from 'react'
import { useMemo } from 'react'
import { cloneDeep } from 'lodash'

import { createContext } from 'utils/createContext'
import { useMarket } from 'domains'
import { useOracleRecords } from 'store/thegraph/oracle/hooks'
import { valueToBigNumber } from 'utils/math'

const useThegraphService = () => {
  const { source: oracleRecordsSource, fixed: oracleRecordsFixed } = useOracleRecords()
  const { market } = useMarket()

  const oracleRecords = useMemo(() => {
    if (!oracleRecordsFixed || !oracleRecordsFixed.length) return
    const source = cloneDeep(oracleRecordsFixed)

    const returnValue = {} as any
    const nfts = Object.keys(market.nfts).map((key) => market.nfts[key])
    source.forEach((item) => {
      const x = item.createTime
      delete item.createTime
      Object.keys(item).forEach((key) => {
        const nft = nfts.find((n) => n.oracle === key)
        if (!nft) return
        if (!returnValue[nft.NFT_ID]) returnValue[nft.NFT_ID] = []
        const y = valueToBigNumber((item as any)[key])
          .div(10000)
          .toFixed(2)
        returnValue[nft.NFT_ID].push({ x, y })
      })
    })
    console.log('[oracleRecords]', returnValue)
    return returnValue
  }, [market.nfts, oracleRecordsFixed])

  return { oracleRecords, oracleRecordsSource }
}

export type Thegraph = ReturnType<typeof useThegraphService>

const { Provider: ThegraphProvider, createUseContext } = createContext(useThegraphService)

const Provider: FC = ({ children }) => {
  return <ThegraphProvider>{children}</ThegraphProvider>
}

export default Provider

export const createThegraphContext = createUseContext
