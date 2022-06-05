import bscmainnet from 'lib/protocol/generate/bscmainnet.json'
import bsctestnet from 'lib/protocol/generate/bsctestnet.json'
import kovan from 'lib/protocol/generate/kovan.json'
import localhost from 'lib/protocol/generate/localhost.json'
import vinci from 'lib/protocol/generate/vinci.json'

import type { NFTGenerate } from 'lib/protocol/generate/types'

import { ChainId } from '../chain/types'
import { getNFTInfo } from './NFTConfig'
import type { MarketData, NFTSetting } from './types'

const list: Record<ChainId, typeof vinci> = {
  [ChainId.ethereum]: {
    vinciNFTProvider: '0x12483993167f6e652fd59cd173a495da0b80bdf2',
  },
  [ChainId.kovan]: kovan,
  [ChainId.bsc]: bscmainnet,
  [ChainId.bsct]: bsctestnet,
  [ChainId.vinci]: vinci,
  [ChainId.localhost]: localhost,
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

export const getMarketsData = (chainId: ChainId): MarketData => {
  const generateInfo = list[chainId]
  if (!generateInfo) return defaultMarket
  return {
    chainId,
    addresses: {
      LENDING_POOL_ADDRESSES_PROVIDER_REGISTRY: generateInfo.LendingPoolAddressesProviderRegistry,
      WETH_GATEWAY: generateInfo.WETHGateway,
      walletBalanceProvider: generateInfo.WalletBalanceProvider,
      vinciNFTProvider: generateInfo.vinciNFTProvider,
      uiPoolDataProvider: generateInfo.UiPoolDataProvider,
    },
    info: Object.keys(generateInfo.markets || {}).reduce((obj, marketID) => {
      const market = (generateInfo.markets as any)[marketID]
      obj[marketID] = {
        lendingPool: market.LendingPool,
        lendingPoolAddressesProvider: market.LendingPoolAddressesProvider,
      }
      return obj
    }, {} as Record<string, any>),
    nfts: Object.keys(generateInfo.markets || {}).reduce((obj, marketID) => {
      const markets: Record<string, NFTGenerate> = generateInfo.markets as any
      Object.keys(markets[marketID].TimeLockableNToken).forEach((NFT_ID) => {
        const underlyingAsset = (generateInfo as any)[NFT_ID]
        if (!underlyingAsset) throw new Error(`[getMarketsData] ${chainId} 找不到对应 NFT配置 => (${NFT_ID})`)
        const nToken = markets[marketID].TimeLockableNToken[NFT_ID]
        const { LendingPool, LendingPoolAddressesProvider } = markets[marketID]
        const { src, market, oracle, name, nftToken } = getNFTInfo(NFT_ID)
        const setting: NFTSetting = {
          LENDING_POOL: LendingPool,
          LENDING_POOL_ADDRESS_PROVIDER: LendingPoolAddressesProvider,
          NFT_ID,
          underlyingAsset,
          src,
          name,
          market,
          nToken,
          oracle,
          nftToken,
        }
        obj[marketID] = setting
        obj[NFT_ID] = setting
        obj[underlyingAsset] = setting
      })
      return obj
    }, {} as MarketData['nfts']),
  }
}

export const defaultMarket = getMarketsData(ChainId.kovan)

const getNFTS = () => {
  return {
    // ...getMarketsData(ChainId.localhost).nfts,
    // ...getMarketsData(ChainId.bsct).nfts,
    // ...getMarketsData(ChainId.vinci).nfts,
    ...getMarketsData(ChainId.kovan).nfts,
    // ...getMarketsData(ChainId.bsc).nfts,
    // ...getMarketsData(ChainId.ethereum).nfts,
  }
}

export const NFTs = getNFTS()
export const NFT_IDS = [
  NFT_ID_1,
  NFT_ID_2,
  // NFT_ID_3,
  NFT_ID_4,
  NFT_ID_5,
  NFT_ID_6,
  NFT_ID_7,
  NFT_ID_8,
  NFT_ID_9,
  NFT_ID_10,
]
