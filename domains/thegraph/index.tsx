import type { FC } from 'react'
import { useMemo } from 'react'
import { flattenDeep } from 'lodash'

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
      days: '30',
    },
    {
      type: '2',
      days: '60',
    },
    {
      type: '3',
      days: '90',
    },
  ],
  [
    {
      type: '4',
      days: '120',
    },
    {
      type: '5',
      days: '240',
    },
  ],
]

const VCI_TOKEN_PRICE = 0.3
const REWARD_AMOUNT = 25000000

const lockTypeMap = flattenDeep(lockTypeList).reduce((obj, { type, days }) => {
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
    let totalUserLocked = valueToBigNumber(0)
    let estmatedRewards = {
      value: valueToBigNumber(0),
      userValue: valueToBigNumber(0),
      totalValue: valueToBigNumber(0),
    }
    const nftAssetsTimeLocked: any[] = []
    nftAssets.forEach((nft) => {
      const { currentFloorPriceInUSD } = nft
      const timeLockedCount: any = {
        total: countTables['TimeLocked_total'] || 0,
        '1': countTables['TimeLocked_lockType_1'] || 0,
        '2': countTables['TimeLocked_lockType_2'] || 0,
        '3': countTables['TimeLocked_lockType_3'] || 0,
        '4': countTables['TimeLocked_lockType_4'] || 0,
        '5': countTables['TimeLocked_lockType_5'] || 0,
        '6': countTables['TimeLocked_lockType_6'] || 0,
      }
      const TVL = valueToBigNumber(currentFloorPriceInUSD).multipliedBy(timeLockedCount.total)
      const userLocked = timeLockedTables.length
      let userValue = valueToBigNumber(0)
      if (!totalUserLocked.eq(0)) {
        let userDays = valueToBigNumber(0)
        let totalDays = valueToBigNumber(0)
        Object.keys(lockTypeMap).map((type) => {
          const timeLocked = timeLockedTables.filter((row) => row.lockType === type)
          const days = lockTypeMap[type]
          userDays = userDays.plus(valueToBigNumber(timeLocked.length).multipliedBy(days))
          totalDays = totalDays.plus(valueToBigNumber(timeLockedCount[type]).multipliedBy(days))
        })
        if (!userDays.eq(0) && !totalDays.eq(0)) {
          userValue = userDays.multipliedBy(currentFloorPriceInUSD)
          estmatedRewards.userValue = estmatedRewards.userValue.plus(userValue)
          estmatedRewards.totalValue = estmatedRewards.totalValue.plus(totalDays.multipliedBy(currentFloorPriceInUSD))
        }
      }
      totalLocked = totalLocked.plus(timeLockedCount.total)
      totalTVL = totalTVL.plus(TVL)
      totalUserLocked = totalUserLocked.plus(userLocked)
      nftAssetsTimeLocked.push({
        ...nft,
        TVL,
        totalLockedNFT: timeLockedCount.total,
        userLocked,
        userValue,
      })
    })

    const { userValue, totalValue } = estmatedRewards
    if (!userValue.eq(0) && !totalValue.eq(0)) {
      estmatedRewards.value = userValue.div(totalValue).multipliedBy(REWARD_AMOUNT)
    }
    let rewardAPR = valueToBigNumber(0)
    if (!totalValue.eq(0) && !estmatedRewards.value.eq(0)) {
      rewardAPR = estmatedRewards.value.multipliedBy(VCI_TOKEN_PRICE).multipliedBy(365).div(totalValue)
    }

    const timeLockedDashboard = {
      totalLocked: totalLocked.toString(),
      TVL: totalTVL,
      userLocked: totalUserLocked.toString(),
      estmatedRewards: estmatedRewards.value,
      rewardAPR,
      totalValue,
    }

    nftAssets.forEach((nft, index) => {
      const { userValue } = nftAssetsTimeLocked[index]
      if (!userValue.eq(0) && !totalValue.eq(0)) {
        nftAssetsTimeLocked[index].estmatedRewards = userValue.div(totalValue).multipliedBy(REWARD_AMOUNT)
      }
    })

    const returnValue = { timeLockedDashboard, nftAssetsTimeLocked }

    log('[domains] [timeLocked]', returnValue)
    return returnValue
  }, [countTables, timeLockedTables, nftAssets])

  return { timeLockedDashboard, nftAssetsTimeLocked }
}

export type Thegraph = ReturnType<typeof useThegraphService>

const { Provider: ThegraphProvider, createUseContext } = createContext(useThegraphService)

const Provider: FC = ({ children }) => {
  return <ThegraphProvider>{children}</ThegraphProvider>
}

export default Provider

export const createThegraphContext = createUseContext
