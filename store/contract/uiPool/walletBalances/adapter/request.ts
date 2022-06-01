import type { WalletBalanceContract } from 'lib/protocol/wallet-balance'
import { unzip } from 'lodash'

export type WalletBalancesProps = { provider: string; user: string; wallet: WalletBalanceContract }
export const useWalletBalances = (props: WalletBalancesProps) => {
  const { provider, user, wallet } = props
  if (!provider || !user) return Promise.reject()
  return wallet.contract.getUserWalletBalances(provider, user).then((walletBalance) => ({
    lendingPoolAddressesProvider: provider,
    data: unzip<any>(walletBalance).reduce((obj, [key, value]) => {
      obj[key.toLocaleLowerCase()] = value.toString()
      return obj
    }, {} as Record<string, string>),
  }))
}

export type WalletBalances = Awaited<ReturnType<typeof useWalletBalances>>
