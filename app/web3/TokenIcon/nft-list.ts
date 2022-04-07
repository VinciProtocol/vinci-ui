import type { MarketData } from '../market/types'

export const getNFTInfoByCollection = (market: MarketData, collection: string) => {
  return market.nfts[collection] || ({} as undefined)
}
