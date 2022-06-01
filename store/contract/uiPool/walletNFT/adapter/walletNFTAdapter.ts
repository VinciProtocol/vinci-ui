import type { WalletNFT } from './request'

export const getWalletNFTData = (id: string, walletNFT: WalletNFT = { lendingPoolAddressesProvider: '', data: [] }) => {
  const data: Record<string, string[]> = {}
  walletNFT.data.forEach(({ underlyingNFT, tokenIds }) => {
    data[underlyingNFT] = tokenIds
  })

  return {
    id,
    lendingPoolAddressesProvider: walletNFT.lendingPoolAddressesProvider,
    data,
  }
}

export type WalletNFTData = ReturnType<typeof getWalletNFTData>
