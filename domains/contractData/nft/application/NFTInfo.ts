import { useEffect, useState } from 'react'
import { getNFTInfo } from '../adapter/nftInfo'
import type { NFTInfo, NFTInfoProps } from '../adapter/nftInfo'
import { useMarket } from 'domains'

export const useNFTInfo = (nft: NFTInfoProps['nft']) => {
  const [nftInfo, setNFTInfo] = useState<NFTInfo[]>([])
  const { market } = useMarket()

  useEffect(() => {
    if (!nft?.tokenIds.length) {
      setNFTInfo([])
      return
    }
    getNFTInfo({
      nft,
      market,
    }).then((data) => {
      setNFTInfo(data)
    })
  }, [market, nft])

  return nftInfo
}
