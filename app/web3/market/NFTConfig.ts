import ape from './images/ape.jpg'
import mutantApe from './images/mutant-ape.jpg'
import pancakeSquad from './images/pancake-squad.jpg'

import opensea from './images/opensea.svg'
import pancake from './images/pancake.svg'

import { NFT_ID_1, NFT_ID_2, NFT_ID_3, NFT_ID_4, NFT_ID_5 } from '.'

export const getNFTInfo = (nftID: string) => {
  switch (nftID) {
    case NFT_ID_1:
      return {
        src: ape.src,
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/boredapeyachtclub',
        },
      }
    case NFT_ID_2:
      return {
        src: mutantApe.src,
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/mutant-ape-yacht-club',
        },
      }
    case NFT_ID_3:
      return {
        src: pancakeSquad.src,
        market: {
          logo: pancake,
          url: 'https://pancakeswap.finance/nfts/collections/0x0a8901b0E25DEb55A87524f0cC164E9644020EBA',
        },
      }
    case NFT_ID_4:
      return {
        src: mutantApe.src,
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/mutant-ape-yacht-club',
        },
      }
    case NFT_ID_5:
      return {
        src: mutantApe.src,
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/mutant-ape-yacht-club',
        },
      }
    default:
      throw new Error(`[getNFTInfo] 找不到对应 NFTInfo => (${nftID})`)
  }
}
