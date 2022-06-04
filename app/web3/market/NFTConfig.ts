import ape from './images/ape.jpg'
import mutantApe from './images/mutant-ape.jpg'
import pancakeSquad from './images/pancake-squad.jpg'
import azuki from './images/azuki.jpg'
import cloneX from './images/clonex.png'
import doodles from './images/doodles.jpg'

import opensea from './images/opensea.svg'
import pancake from './images/pancake.svg'

import { NFT_ID_1, NFT_ID_2, NFT_ID_3, NFT_ID_4, NFT_ID_5, NFT_ID_6 } from '.'

export const getNFTInfo = (collection: string) => {
  switch (collection) {
    case NFT_ID_1:
      return {
        src: ape.src,
        oracle: '',
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/boredapeyachtclub',
        },
      }
    case NFT_ID_2:
      return {
        src: mutantApe.src,
        oracle: '',
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/mutant-ape-yacht-club',
        },
      }
    case NFT_ID_3:
      return {
        src: pancakeSquad.src,
        oracle: '',
        market: {
          logo: pancake,
          url: 'https://pancakeswap.finance/nfts/collections/0x0a8901b0E25DEb55A87524f0cC164E9644020EBA',
        },
      }
    case NFT_ID_4:
      return {
        src: cloneX.src,
        oracle: '',
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/clonex',
        },
      }
    case NFT_ID_5:
      return {
        src: azuki.src,
        oracle: 'azuki',
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/azuki',
        },
      }
    case NFT_ID_6:
      return {
        src: doodles.src,
        oracle: 'doodles-official',
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/doodles-official',
        },
      }
    default:
      throw new Error(`[getNFTInfo] 找不到对应 NFTInfo => (${collection})`)
  }
}
