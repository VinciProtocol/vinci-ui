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
  [ChainId.ethereum]: {},
  [ChainId.kovan]: kovan,
  [ChainId.bsct]: bsctestnet,
  [ChainId.bsc]: bscmainnet,
  [ChainId.vinci]: vinci,
  [ChainId.localhost]: localhost,
} as any

export const NFT_ID_1 = 'VinciBAYC'
export const NFT_ID_2 = 'VinciMAYC'
export const NFT_ID_3 = 'VinciPS'

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
    nfts: Object.keys(generateInfo.markets || {}).reduce((obj, nftID) => {
      const collection = nftID.replace('Vinci', '')
      const underlyingAsset = (generateInfo as any)[collection]
      if (!underlyingAsset) throw new Error(`[getMarketsData] 找不到对应 NFT配置 => (${collection})`)
      const { LendingPool, LendingPoolAddressesProvider } = (generateInfo.markets as Record<string, NFTGenerate>)[nftID]
      const { src, market } = getNFTInfo(nftID)
      const setting: NFTSetting = {
        LENDING_POOL: LendingPool,
        LENDING_POOL_ADDRESS_PROVIDER: LendingPoolAddressesProvider,
        collection,
        underlyingAsset,
        src,
        market,
      }
      obj[nftID] = setting
      obj[collection] = setting
      obj[underlyingAsset] = setting
      return obj
    }, {} as MarketData['nfts']),
  }
}

export const defaultMarket = getMarketsData(ChainId.bsc)

const getNFTS = () => {
  return {
    ...getMarketsData(ChainId.localhost).nfts,
    ...getMarketsData(ChainId.bsct).nfts,
    ...getMarketsData(ChainId.vinci).nfts,
    ...getMarketsData(ChainId.kovan).nfts,
    ...getMarketsData(ChainId.bsc).nfts,
    ...getMarketsData(ChainId.ethereum).nfts,
  }
}

export const NFTs = getNFTS()
