import type { ChainId } from '../chain/types'

export type NFTSetting = {
  LENDING_POOL: string
  LENDING_POOL_ADDRESS_PROVIDER: string
  collection: any
  underlyingAsset: any
  src: any
  market: {
    logo: any
    url: string
  }
}

type NFT_ID = string

export type MarketData = {
  chainId: ChainId
  addresses: {
    LENDING_POOL_ADDRESSES_PROVIDER_REGISTRY: string
    WETH_GATEWAY: string
    walletBalanceProvider: string
    uiPoolDataProvider: string
  }
  nfts: Record<NFT_ID, NFTSetting>
}
