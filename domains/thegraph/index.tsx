import type { FC } from 'react'
import { useMemo } from 'react'
import { cloneDeep } from 'lodash'

import { createContext } from 'utils/createContext'
import { useContractData, useMarket } from 'domains'
import { useOracleRecords } from 'store/thegraph/oracle/hooks'
import { valueToBigNumber } from '@vinci-protocol/math'
import { safeGet } from 'utils/get'

const useThegraphService = () => {
  const { source: oracleRecordsSource, fixed: oracleRecordsFixed } = useOracleRecords()
  const { market } = useMarket()
  const { nftAssets } = useContractData()

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

  const oracleAssets = useMemo(() => {
    if (!nftAssets || !nftAssets.length || !oracleRecordsSource || !oracleRecordsSource.length) return []
    const source = cloneDeep(nftAssets)
    const lastUpdate = oracleRecordsSource[oracleRecordsSource.length - 1].createTime
    const getData = (nft: any) => {
      if (!oracleRecords || !nft || !oracleRecords[nft.NFT_ID]) return []
      const returnValue = cloneDeep(oracleRecords[nft.NFT_ID])
      const { length } = returnValue
      if (length < 7) return returnValue
      const startIndex = length - 7
      return returnValue.slice(startIndex, length)
    }

    const oracleAssets = source.map((nft) => {
      const data = getData(nft)

      const change24h =
        safeGet(() =>
          valueToBigNumber(data[data.length - 1].y)
            .div(data[data.length - 2].y)
            .minus(1)
        ) || 0

      return { ...nft, lastUpdate, oracle7Trend: data, change24h }
    })

    console.log('oracleAssets', oracleAssets)
    return oracleAssets
  }, [nftAssets, oracleRecords, oracleRecordsSource])

  return { oracleRecords, oracleAssets, oracleRecordsSource }
}

export type Thegraph = ReturnType<typeof useThegraphService>

const { Provider: ThegraphProvider, createUseContext } = createContext(useThegraphService)

const Provider: FC = ({ children }) => {
  return <ThegraphProvider>{children}</ThegraphProvider>
}

export default Provider

export const createThegraphContext = createUseContext
