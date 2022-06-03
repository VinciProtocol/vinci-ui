import { NFT_ID_1, NFT_ID_2, NFT_ID_3, NFT_ID_4, NFT_ID_5, NFT_ID_6 } from 'app/web3/market'
import type { MarketData } from 'app/web3/market/types'
import { safeGet } from 'utils/get'

import { getItem, setItem } from './cache'

export type NFTInfoProps = {
  market: MarketData
  nft: {
    underlyingAsset: string
    tokenIds: string[]
  }
}

const fetchNFTInfo = (url: string, getValue: (d: any) => any) => {
  return getItem(url)
    .then((d) => {
      if (!d) return Promise.reject()
      return d
    })
    .catch(() =>
      fetch(url)
        .then((d) => d.json())
        .then((d) => {
          const returnValue = getValue(d)
          setItem(url, returnValue)
          return returnValue
        })
    )
}

export const getNFTInfo = (props: NFTInfoProps): Promise<NFTInfo[]> => {
  const { nft, market } = props
  if (!market || !nft || !nft.underlyingAsset) return Promise.reject()
  if (!nft.tokenIds.length) return Promise.resolve([])
  const { underlyingAsset, tokenIds } = nft
  if (underlyingAsset === safeGet(() => market.nfts[NFT_ID_1].underlyingAsset)) {
    const promises = []
    for (let i = 0; i < tokenIds.length; i++) {
      const tokenId = tokenIds[i]
      promises.push(
        fetchNFTInfo('https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/' + tokenId, (d) => ({
          id: tokenId,
          name: '#' + tokenId,
          image: d.image.replace('ipfs://', 'https://ipfs.io/ipfs/'),
          description: 'Bored Ape Yacht Club',
        }))
      )
    }
    return Promise.all(promises)
  } else if (underlyingAsset === safeGet(() => market.nfts[NFT_ID_2].underlyingAsset)) {
    const promises = []
    for (let i = 0; i < tokenIds.length; i++) {
      const tokenId = tokenIds[i]
      promises.push(
        fetchNFTInfo('https://boredapeyachtclub.com/api/mutants/' + tokenId, (d) => ({
          id: tokenId,
          name: '#' + tokenId,
          image: d.image.replace('ipfs://', 'https://ipfs.io/ipfs/'),
          description: 'Bored Ape Yacht Club',
        }))
      )
    }
    return Promise.all(promises)
  } else if (underlyingAsset === safeGet(() => market.nfts[NFT_ID_3].underlyingAsset)) {
    const promises = []
    for (let i = 0; i < tokenIds.length; i++) {
      const tokenId = tokenIds[i]
      promises.push(
        fetchNFTInfo(
          `https://ipfs.io/ipfs/QmNWEEuxdugy7xxbmViU42TSr9SCkD2AyNgxGp67FrkZ9k/pancakesquad${tokenId}.json`,
          (d) => ({
            id: tokenId,
            name: '#' + tokenId,
            image: d.image.replace('ipfs://', 'https://ipfs.io/ipfs/'),
            description: 'Pancake Squad',
          })
        )
      )
    }
    return Promise.all(promises)
  } else if (underlyingAsset === safeGet(() => market.nfts[NFT_ID_4].underlyingAsset)) {
    return Promise.all(
      tokenIds.map((tokenId) => ({
        id: tokenId,
        name: '#' + tokenId,
        image: `https://clonex-assets.rtfkt.com/images/${tokenId}.png`,
        description: 'Clone X',
      }))
    )
  } else if (underlyingAsset === safeGet(() => market.nfts[NFT_ID_5].underlyingAsset)) {
    return Promise.all(
      tokenIds.map((tokenId) => ({
        id: tokenId,
        name: '#' + tokenId,
        image: `https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/${tokenId}.png`,
        description: 'Azuki',
      }))
    )
  } else if (underlyingAsset === safeGet(() => market.nfts[NFT_ID_6].underlyingAsset)) {
    const promises = []
    for (let i = 0; i < tokenIds.length; i++) {
      const tokenId = tokenIds[i]
      promises.push(
        fetchNFTInfo('https://ipfs.io/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/' + tokenId, (d) => ({
          id: tokenId,
          name: '#' + tokenId,
          image: d.image.replace('ipfs://', 'https://ipfs.io/ipfs/'),
          description: 'Doodles',
        }))
      )
    }
    return Promise.all(promises)
  }
}

export type NFTInfo = {
  id: string
  name: string
  image: any
  description: string
}
