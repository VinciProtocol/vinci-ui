import type { FC } from 'react'
import { flattenDeep } from 'lodash'

import { createContext } from 'utils/createContext'
import { useMemoLazy } from 'app/hooks/useMemoLazy'
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
    {
      type: '6',
      days: '360',
    },
  ],
]

const lockTypeMap = flattenDeep(lockTypeList).reduce((obj, { type, days }) => {
  obj[type] = parseInt(days)
  return obj
}, {} as Record<string, number>)

const useThegraphService = () => {
  const countTables = useCountTables()
  const timeLockedTables = useTimeLockedTables()
  const { nftAssets } = useContractData()

  const timeLockedDashboard = useMemoLazy(() => {
    if (!nftAssets[0]) return {} as undefined
    const { currentFloorPriceInUSD } = nftAssets[0]
    const timeLockedCount: any = {
      total: countTables['TimeLocked_total'] || 0,
      '1': countTables['TimeLocked_lockType_1'] || 0,
      '2': countTables['TimeLocked_lockType_2'] || 0,
      '3': countTables['TimeLocked_lockType_3'] || 0,
      '4': countTables['TimeLocked_lockType_4'] || 0,
      '5': countTables['TimeLocked_lockType_5'] || 0,
      '6': countTables['TimeLocked_lockType_6'] || 0,
    }
    const totalLocked = valueToBigNumber(timeLockedCount.total)
    const TVL = valueToBigNumber(currentFloorPriceInUSD).multipliedBy(totalLocked)
    const userLocked = valueToBigNumber(timeLockedTables.length)
    let estmatedRewards = valueToBigNumber(0)
    let totalDays = valueToBigNumber(0)
    if (!userLocked.eq(0)) {
      let userDays = valueToBigNumber(0)
      Object.keys(lockTypeMap).map((type) => {
        const timeLocked = timeLockedTables.filter((row) => row.lockType === type)
        const days = lockTypeMap[type]
        userDays = userDays.plus(valueToBigNumber(timeLocked.length).multipliedBy(days))
        totalDays = totalDays.plus(valueToBigNumber(timeLockedCount[type]).multipliedBy(days))
      })
      if (!userDays.eq(0) && !totalDays.eq(0)) {
        estmatedRewards = userDays.div(totalDays).multipliedBy(currentFloorPriceInUSD).multipliedBy(0.06)
      }
    }

    const returnValue = {
      totalLocked,
      TVL,
      userLocked,
      estmatedRewards,
      totalDays,
    }

    log('[domains] [timeLockedDashboard]', returnValue)
    return returnValue
  }, [countTables, timeLockedTables, nftAssets])

  return { timeLockedDashboard }
}

export type Thegraph = ReturnType<typeof useThegraphService>

const { Provider: ThegraphProvider, createUseContext } = createContext(useThegraphService)

const Provider: FC = ({ children }) => {
  return <ThegraphProvider>{children}</ThegraphProvider>
}

export default Provider

export const createThegraphContext = createUseContext
