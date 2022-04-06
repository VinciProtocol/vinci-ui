import { useMemo } from 'react'

import { useAppSelector } from 'store'

import type { Currency } from '../adapter/currencyAdapter'
import { getCurrency } from '../adapter/currencyAdapter'
import type { NFTVault } from '../adapter/nftAdapter'
import { getNFTVault } from '../adapter/nftAdapter'
import type { Reserves } from '../adapter/reservesAdapter'
import { getReserves } from '../adapter/reservesAdapter'

import { selectData } from '..'

type ReservesDatas = Array<{ id: string; nftVault: NFTVault; reserves: Reserves[]; currency: Currency }>
export const useReservesDatas = () => {
  const data = useAppSelector(selectData)

  const reservesDatas: ReservesDatas = useMemo(() => {
    if (!data) return []
    return data
      .filter(({ id }) => id)
      .map(({ nftVaultsData, reservesData, currencyInfo, id }) => {
        const nftVault = getNFTVault(nftVaultsData)
        const reserves = getReserves(reservesData)
        const currency = getCurrency(currencyInfo)
        return {
          id,
          nftVault,
          reserves,
          currency,
        }
      })
  }, [data])

  return reservesDatas
}
