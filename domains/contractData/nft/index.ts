import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { createContext } from 'utils/createContext'

import { useContractData } from 'domains'
import { useNFTInfo } from './application/NFTInfo'
import { log } from 'utils/dev'
import { safeGet } from 'utils/get'

const NFTRouterPath = ['/borrow/[id]', '/nft-lockdrop/[id]']

const useContractNFTService = () => {
  const { generalAssets, nftAssets } = useContractData()
  const router = useRouter()

  const nft = useMemo(() => {
    const defaultValue = { data: [] } as undefined
    if (NFTRouterPath.findIndex((pathname) => pathname === router.pathname) === -1 || !router.query.id) {
      return defaultValue
    }
    const nft = nftAssets.find((nft) => nft.underlyingAsset === (router.query.id as any))
    if (!nft) return defaultValue
    const data = generalAssets.filter((generalAsset) => generalAsset.collection === nft.collection)

    const returnValue = {
      ...nft,
      data,
    }
    log('[domains] [nft]', returnValue)
    return returnValue
  }, [generalAssets, nftAssets, router.pathname, router.query.id])

  const walletNFTInfo = useNFTInfo(nft.nftWallet)
  const walletNFT = useMemo(() => {
    if (!nft.underlyingAsset || !walletNFTInfo) return { data: [] } as undefined
    const returnValue = {
      data: walletNFTInfo.map((info) => ({
        ...info,
        currentFloorPrice: nft.currentFloorPrice,
        currentFloorPriceInUSD: nft.currentFloorPriceInUSD,
      })),
      totalValuation: nft.currentFloorPrice.multipliedBy(walletNFTInfo.length),
    }
    log('[domains] [walletNFT]', returnValue)
    return returnValue
  }, [walletNFTInfo, nft])

  const userNFTInfo = useNFTInfo(nft.userNFTVault)
  const userNFT = useMemo(() => {
    if (!nft.underlyingAsset || !userNFTInfo || !nft.userNFTVault) return { data: [] } as undefined

    const nftLocksMap = (nft.userNFTVault.tokenIds as any[]).reduce((obj, tokenId, index) => {
      obj[tokenId] = {
        ...nft.userNFTVault.locks[index],
      }
      return obj
    }, {} as any)

    const data = userNFTInfo
      .filter((info) => !safeGet(() => nftLocksMap[info.id].expiration))
      .map((info) => {
        return {
          ...info,
          currentFloorPrice: nft.currentFloorPrice,
          currentFloorPriceInUSD: nft.currentFloorPriceInUSD,
        }
      })

    const returnValue = {
      data,
      totalValuation: nft.currentFloorPrice.multipliedBy(data.length),
    }
    log('[domains] [userNFT]', returnValue)
    return returnValue
  }, [userNFTInfo, nft])

  return { nft, walletNFT, userNFT }
}

export type ContractNFT = ReturnType<typeof useContractNFTService>

const { Provider, createUseContext } = createContext(useContractNFTService)

export default Provider
export const createContractNFTContext = createUseContext
