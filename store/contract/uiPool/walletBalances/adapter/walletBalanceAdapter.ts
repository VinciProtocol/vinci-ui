import type { BigNumber } from 'bignumber.js'
import { valueToBigNumber } from 'utils/math'

import type { WalletBalances } from './request'

export const getWalletBalancesData = (id: string, walletBalances: WalletBalances = {}) => {
  return {
    id,
    data: Object.keys(walletBalances).reduce((o, k) => {
      o[k] = valueToBigNumber(walletBalances[k])
      return o
    }, {} as Record<string, BigNumber>),
  }
}

export type WalletBalancesData = ReturnType<typeof getWalletBalancesData>
