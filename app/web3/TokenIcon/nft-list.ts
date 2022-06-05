import type { MarketData } from '../market/types'

export const getNFTInfoByNFTID = (market: MarketData, NFT_ID: string) => {
  return market.nfts[NFT_ID] || ({} as undefined)
}
