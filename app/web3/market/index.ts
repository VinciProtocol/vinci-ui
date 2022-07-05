import rinkeby from 'lib/protocol/generate/rinkeby.json'
import mainnet from 'lib/protocol/generate/mainnet.json'
import vinci from 'lib/protocol/generate/vinci.json'

import type { NFTGenerate } from 'lib/protocol/generate/types'

import { ChainId } from '../chain/types'
import { getNFTInfo } from './NFTConfig'
import type { MarketData, NFTSetting } from './types'

const list: Record<ChainId, typeof vinci> = {
  [ChainId.ethereum]: {
    CryptoPunksMarket: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
    vinciNFTProvider: '0x12483993167f6e652fd59cd173a495da0b80bdf2',
    ...mainnet,
  },
  [ChainId.rinkeby]: {
    CryptoPunksMarket: '0x2406C682C3F9720C5aE24BFa576a2351CCCd008a',
    ...rinkeby,
  },
  [ChainId.vinci]: vinci,
} as any

export const NFT_ID_1 = 'BAYC'
export const NFT_ID_2 = 'MAYC'
export const NFT_ID_3 = 'PS'
export const NFT_ID_4 = 'CloneX'
export const NFT_ID_5 = 'Azuki'
export const NFT_ID_6 = 'DOODLE'
export const NFT_ID_7 = 'Sandbox'
export const NFT_ID_8 = 'OTHR'
export const NFT_ID_9 = 'MOONBIRD'
export const NFT_ID_10 = 'DLAND'
export const NFT_ID_11 = 'Meebits'
export const NFT_ID_12 = 'PUNK'

const getMarketsData = (chainId: ChainId): MarketData => {
  const generateInfo = list[chainId]
  if (!generateInfo) throw new Error(`[getMarketsData] error. chainId => ${chainId}`)

  const nfts: MarketData['nfts'] = {}
  const nftsNtoken: MarketData['nftsNtoken'] = {}

  Object.keys(generateInfo.markets || {}).forEach((marketID) => {
    const markets: Record<string, NFTGenerate> = generateInfo.markets as any
    Object.keys(markets[marketID].TimeLockableNToken).forEach((NFT_ID) => {
      const underlyingAsset = (generateInfo as any)[NFT_ID]
      if (!underlyingAsset) throw new Error(`[getMarketsData] ${chainId} 找不到对应 NFT配置 => (${NFT_ID})`)
      const nToken = markets[marketID].TimeLockableNToken[NFT_ID]
      const { LendingPool, LendingPoolAddressesProvider } = markets[marketID]
      const { src, market, oracle, name, symbol, imageName } = getNFTInfo(NFT_ID)
      let walletUnderlyingAsset = ''

      if (NFT_ID === NFT_ID_12) {
        walletUnderlyingAsset = generateInfo.CryptoPunksMarket
      }

      const setting: NFTSetting = {
        LENDING_POOL: LendingPool,
        LENDING_POOL_ADDRESS_PROVIDER: LendingPoolAddressesProvider,
        NFT_ID,
        underlyingAsset,
        walletUnderlyingAsset,
        src,
        name,
        imageName,
        market,
        nToken,
        symbol,
        oracle,
      }
      nfts[NFT_ID] = setting
      nfts[underlyingAsset] = setting
      nftsNtoken[nToken] = setting
    })
  })

  return {
    chainId,
    addresses: {
      LENDING_POOL_ADDRESSES_PROVIDER_REGISTRY: generateInfo.LendingPoolAddressesProviderRegistry,
      WETH_GATEWAY: generateInfo.WETHGateway,
      WPUNKS_GATEWAY: generateInfo.WPUNKSGateway,
      walletBalanceProvider: generateInfo.WalletBalanceProvider,
      vinciNFTProvider: generateInfo.vinciNFTProvider,
      uiPoolDataProvider: generateInfo.UiPoolDataProvider,
      cryptoPunksMarket: generateInfo.CryptoPunksMarket,
    },
    nfts,
    nftsNtoken,
    info: Object.keys(generateInfo.markets || {}).reduce((obj, marketID) => {
      const market = (generateInfo.markets as any)[marketID]
      obj[marketID] = {
        lendingPool: market.LendingPool,
        lendingPoolAddressesProvider: market.LendingPoolAddressesProvider,
      }
      return obj
    }, {} as Record<string, any>),
  }
}

export const MARKETS: Record<number, MarketData> = {
  [ChainId.ethereum]: getMarketsData(ChainId.ethereum),
  [ChainId.rinkeby]: getMarketsData(ChainId.rinkeby),
}
export const defaultMarket = MARKETS[ChainId.ethereum]
export const getMarket = (chainId: ChainId) => MARKETS[chainId] || defaultMarket
export const NFTs = {
  // ...getMarketsData(ChainId.localhost).nfts,
  // ...getMarketsData(ChainId.bsct).nfts,
  // ...getMarketsData(ChainId.vinci).nfts,
  ...MARKETS[ChainId.rinkeby].nfts,
  ...MARKETS[ChainId.ethereum].nfts,
  // ...getMarketsData(ChainId.bsc).nfts,
  // ...getMarketsData(ChainId.ethereum).nfts,
}
export const NFT_IDS = [
  NFT_ID_1,
  NFT_ID_2,
  NFT_ID_3,
  NFT_ID_4,
  NFT_ID_5,
  NFT_ID_6,
  NFT_ID_7,
  NFT_ID_8,
  NFT_ID_9,
  NFT_ID_10,
  NFT_ID_11,
  NFT_ID_12,
]
