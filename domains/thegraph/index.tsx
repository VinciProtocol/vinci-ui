import type { FC } from 'react'
import { useMemo } from 'react'
import { cloneDeep, flattenDeep } from 'lodash'

import { createContext } from 'utils/createContext'
import { log } from 'utils/dev'

import { useCountTables } from 'store/thegraph/nftToken/countTables/hooks'
import { useTimeLockedTables } from 'store/thegraph/nftToken/timeLockedTables/hooks'
import { useContractData } from 'domains'
import { valueToBigNumber } from 'utils/math'

export const lockTypeList = [
  [
    {
      type: '1',
      days: '60',
    },
    {
      type: '2',
      days: '90',
    },
    {
      type: '3',
      days: '120',
    },
  ],
  [
    {
      type: '4',
      days: '240',
    },
    {
      type: '5',
      days: '360',
    },
  ],
]

const VCI_TOKEN_PRICE = 0.3
export const REWARD_AMOUNT = 25000000

export const lockTypeMap = flattenDeep(lockTypeList).reduce((obj, { type, days }) => {
  obj[type] = parseInt(days)
  return obj
}, {} as Record<string, number>)

const useThegraphService = () => {
  const countTables = useCountTables()
  const timeLockedTables = useTimeLockedTables()
  const { nftAssets } = useContractData()

  const { timeLockedDashboard, nftAssetsTimeLocked } = useMemo(() => {
    if (!nftAssets.length) return { timeLockedDashboard: {}, nftAssetsTimeLocked: [] } as undefined
    let totalLocked = valueToBigNumber(0)
    let totalTVL = valueToBigNumber(0)
    let totalTVLInUSD = valueToBigNumber(0)
    let totalUserLocked = valueToBigNumber(0)
    let estmatedRewards = {
      value: valueToBigNumber(0),
      userValue: valueToBigNumber(0),
      totalValue: valueToBigNumber(0),
    }
    const nftAssetsTimeLocked: any[] = []
    nftAssets.forEach((nft) => {
      const { currentFloorPriceInUSD, currentFloorPrice, underlyingAsset } = nft
      const countTable = countTables[underlyingAsset] || {}
      const timeLockedTable = timeLockedTables[underlyingAsset] || []
      const timeLockedCount: any = {
        total: countTable['TimeLocked_total'] || 0,
        '1': countTable['TimeLocked_lockType_1'] || 0,
        '2': countTable['TimeLocked_lockType_2'] || 0,
        '3': countTable['TimeLocked_lockType_3'] || 0,
        '4': countTable['TimeLocked_lockType_4'] || 0,
        '5': countTable['TimeLocked_lockType_5'] || 0,
        '6': countTable['TimeLocked_lockType_6'] || 0,
      }
      const TVL = valueToBigNumber(currentFloorPrice).multipliedBy(timeLockedCount.total)
      const TVLInUSD = valueToBigNumber(currentFloorPriceInUSD).multipliedBy(timeLockedCount.total)
      const userLocked = timeLockedTable.length
      let userValue = valueToBigNumber(0)
      let userDays = valueToBigNumber(0)
      let totalDays = valueToBigNumber(0)
      Object.keys(lockTypeMap).map((type) => {
        const days = lockTypeMap[type]
        if (userLocked) {
          const timeLocked = timeLockedTable.filter((row) => row.lockType === type)
          userDays = userDays.plus(valueToBigNumber(timeLocked.length).multipliedBy(days))
        }
        totalDays = totalDays.plus(valueToBigNumber(timeLockedCount[type]).multipliedBy(days))
      })
      if (userLocked) {
        userValue = userDays.multipliedBy(currentFloorPriceInUSD)
        estmatedRewards.userValue = estmatedRewards.userValue.plus(userValue)
      }
      estmatedRewards.totalValue = estmatedRewards.totalValue.plus(totalDays.multipliedBy(currentFloorPriceInUSD))
      totalLocked = totalLocked.plus(timeLockedCount.total)
      totalTVL = totalTVL.plus(TVL)
      totalTVLInUSD = totalTVLInUSD.plus(TVLInUSD)
      totalUserLocked = totalUserLocked.plus(userLocked)
      nftAssetsTimeLocked.push({
        ...nft,
        TVL,
        TVLInUSD,
        totalLockedNFT: timeLockedCount.total,
        userLocked,
        userValue,
        userLockedNFT: userLocked,
      })
    })

    const { userValue, totalValue } = estmatedRewards
    const rewardAmount = valueToBigNumber(
      totalTVL.gte(5000) ? REWARD_AMOUNT : totalTVL.div(5000).sqrt().multipliedBy(REWARD_AMOUNT)
    )
    if (!userValue.eq(0) && !totalValue.eq(0)) {
      estmatedRewards.value = userValue.div(totalValue).multipliedBy(rewardAmount)
    }
    let rewardAPR = valueToBigNumber(0)
    if (!totalValue.eq(0)) {
      rewardAPR = rewardAmount.multipliedBy(VCI_TOKEN_PRICE).multipliedBy(365).div(totalValue)
    }

    const timeLockedDashboard = {
      totalLocked: totalLocked.toString(),
      TVL: totalTVL,
      TVLInUSD: totalTVLInUSD,
      userLocked: totalUserLocked.toString(),
      estmatedRewards: estmatedRewards.value,
      rewardAPR,
      totalValue,
      rewardAmount,
    }

    nftAssets.forEach((nft, index) => {
      const { userValue } = nftAssetsTimeLocked[index]
      if (!userValue.eq(0) && !totalValue.eq(0)) {
        nftAssetsTimeLocked[index].estmatedRewards = userValue.div(totalValue).multipliedBy(rewardAmount)
      }
    })

    const orderlyNFTAssetsTimeLockedSource = cloneDeep(nftAssetsTimeLocked)
    let orderlyNFTAssetsTimeLocked: any[] = []
    const order = {
      value: -1,
      startIndex: 0,
    }
    orderlyNFTAssetsTimeLockedSource
      .sort((a, b) => b.totalLockedNFT - a.totalLockedNFT)
      .forEach((i, index) => {
        const value = i.totalLockedNFT
        if (!index) {
          order.value = value
          return
        }

        const end = (endIndex = index) => {
          const array = orderlyNFTAssetsTimeLockedSource.slice(order.startIndex, endIndex)
          orderlyNFTAssetsTimeLocked = orderlyNFTAssetsTimeLocked.concat(
            array.sort((a, b) => b.currentFloorPrice - a.currentFloorPrice)
          )
        }

        if (index === orderlyNFTAssetsTimeLockedSource.length - 1) {
          end(orderlyNFTAssetsTimeLockedSource.length)
        }

        if (order.value > value) {
          order.value = value
          if (order.startIndex <= index) {
            end()
            order.startIndex = index
          }
        }
      })

    const returnValue = {
      timeLockedDashboard,
      nftAssetsTimeLocked: orderlyNFTAssetsTimeLocked,
    }

    log('[domains] [timeLocked]', returnValue)
    return returnValue
  }, [nftAssets, countTables, timeLockedTables])

  return { timeLockedDashboard, nftAssetsTimeLocked }
}

export type Thegraph = ReturnType<typeof useThegraphService>

const { Provider: ThegraphProvider, createUseContext } = createContext(useThegraphService)

const Provider: FC = ({ children }) => {
  return <ThegraphProvider>{children}</ThegraphProvider>
}

export default Provider

export const createThegraphContext = createUseContext
