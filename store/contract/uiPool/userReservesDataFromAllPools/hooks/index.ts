import { useMemo } from 'react'

import { useAppSelector } from 'store'

import type { UserNFTVault } from '../adapter/nftAdapter'
import { getUserNFTVault } from '../adapter/nftAdapter'
import type { UserReserves } from '../adapter/reservesAdapter'
import { getUserReserves } from '../adapter/reservesAdapter'

import { selectData } from '..'

type UserReservesDatas = Array<{ id: string; userReserves: UserReserves[]; userNFTVaults: UserNFTVault[] }>
export const useUserReservesDatas = () => {
  const data = useAppSelector(selectData)

  const userReservesDatas: UserReservesDatas = useMemo(() => {
    if (!data) return []
    return data.map(({ id, userReservesData, userNFTVaultsData }) => {
      const userNFTVaults = getUserNFTVault(userNFTVaultsData)
      const userReserves = getUserReserves(userReservesData)
      return {
        id,
        userNFTVaults,
        userReserves,
      }
    })
  }, [data])

  return userReservesDatas
}
