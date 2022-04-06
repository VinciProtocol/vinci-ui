import type { WalletNFT } from './request'

export const getWalletNFTData = (id: string, walletNFT: WalletNFT[]) => {
  const data: Record<string, string[]> = {}
  walletNFT.forEach(({ underlyingNFT, tokenIds }) => {
    data[underlyingNFT] = tokenIds
  })
  return {
    id,
    data,
  }
}

export type WalletNFTData = ReturnType<typeof getWalletNFTData>
