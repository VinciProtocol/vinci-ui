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
  [ChainId.bsct]: bsctestnet,
  [ChainId.bsc]: bscmainnet,
  [ChainId.vinci]: vinci,
  [ChainId.localhost]: localhost,
} as any

export const NFT_ID_1 = 'BAYC'
export const NFT_ID_2 = 'MAYC'
export const NFT_ID_3 = 'PS'
export const NFT_ID_4 = 'CloneX'
export const NFT_ID_5 = 'MEKA'

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
    nfts: Object.keys(generateInfo.markets || {}).reduce((obj, marketID) => {
      const markets: Record<string, NFTGenerate> = generateInfo.markets
      Object.keys(markets[marketID].TimeLockableNTokenForTest).forEach((nftID) => {
        const collection = nftID.replace('vn', '')
        const underlyingAsset = (generateInfo as any)[collection]
        if (!underlyingAsset) throw new Error(`[getMarketsData] ${chainId} 找不到对应 NFT配置 => (${collection})`)
        const nToken = markets[marketID].TimeLockableNTokenForTest[nftID]
        const { LendingPool, LendingPoolAddressesProvider } = markets[marketID]
        const { src, market } = getNFTInfo(collection)
        const setting: NFTSetting = {
          LENDING_POOL: LendingPool,
          LENDING_POOL_ADDRESS_PROVIDER: LendingPoolAddressesProvider,
          collection,
          underlyingAsset,
          src,
          market,
          nToken,
        }
        obj[marketID] = setting
        obj[collection] = setting
        obj[underlyingAsset] = setting
      })
      return obj
    }, {} as MarketData['nfts']),
  }
}

export const defaultMarket = getMarketsData(ChainId.vinci)

const getNFTS = () => {
  return {
    // ...getMarketsData(ChainId.localhost).nfts,
    // ...getMarketsData(ChainId.bsct).nfts,
    ...getMarketsData(ChainId.vinci).nfts,
    // ...getMarketsData(ChainId.kovan).nfts,
    // ...getMarketsData(ChainId.bsc).nfts,
    // ...getMarketsData(ChainId.ethereum).nfts,
  }
}

export const NFTs = getNFTS()
