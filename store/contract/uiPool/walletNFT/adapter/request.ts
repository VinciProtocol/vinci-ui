import { getAddress } from 'domains/contract/adapter/utils'
import type { WalletBalanceContract } from 'lib/protocol/wallet-balance'

export type WalletNFTProps = { provider: string; user: string; wallet: WalletBalanceContract }
export const useWalletNFT = (props: WalletNFTProps) => {
  const { provider, user, wallet } = props
  if (!provider || !user) return Promise.reject()
  return wallet.contract.getUserNFTTokens(provider, user).then((data) => {
    return data.map((walletNFT) => {
      const { tokenIds } = walletNFT
      return {
        ...getAddress(walletNFT, ['underlyingNFT']),
        tokenIds: tokenIds.map((id) => id.toString()),
      } as {
        underlyingNFT: string
        tokenIds: string[]
      }
    })
  })
}

export type WalletNFT = Awaited<ReturnType<typeof useWalletNFT>>[0]
