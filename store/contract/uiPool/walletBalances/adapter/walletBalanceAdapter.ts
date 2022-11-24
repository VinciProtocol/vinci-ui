import type { BigNumber } from 'bignumber.js'
import { valueToBigNumber } from '@vinci-protocol/math'

import type { WalletBalances } from './request'

export const getWalletBalancesData = (
  id: string,
  { data, lendingPoolAddressesProvider }: WalletBalances = { data: {}, lendingPoolAddressesProvider: '' }
) => {
  return {
    id,
    lendingPoolAddressesProvider,
    data: Object.keys(data).reduce((o, k) => {
      o[k] = valueToBigNumber(data[k])
      return o
    }, {} as Record<string, BigNumber>),
  }
}

export type WalletBalancesData = ReturnType<typeof getWalletBalancesData>
