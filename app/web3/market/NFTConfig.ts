import ape from './images/ape.jpg'
import mutantApe from './images/mutant-ape.jpg'
import pancakeSquad from './images/pancake-squad.jpg'
import azuki from './images/azuki.jpg'
import cloneX from './images/clonex.png'
import sandbox from './images/sandbox.png'
import moonbirds from './images/moonbirds.png'
import decentraland from './images/decentraland.png'
import cryptopunks from './images/cryptopunks.png'
import meebits from './images/meebits.png'
import doodles from './images/doodles.jpg'
import otherdeed from './images/otherdeed.jpg'

import opensea from './images/opensea.svg'
import pancake from './images/pancake.svg'

import {
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
} from '.'

export const getNFTInfo = (NFT_ID: string) => {
  switch (NFT_ID) {
    case NFT_ID_1:
      return {
        src: ape.src,
        oracle: 'boredapeyachtclub',
        nftToken: 'boredapeyachtclub',
        name: 'Bored Ape Yacht Club',
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/boredapeyachtclub',
        },
      }
    case NFT_ID_2:
      return {
        src: mutantApe.src,
        oracle: 'mutant-ape-yacht-club',
        nftToken: 'mutant-ape-yacht-club',
        name: 'Mutant Ape Yacht Club',
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/mutant-ape-yacht-club',
        },
      }
    case NFT_ID_3:
      return {
        src: pancakeSquad.src,
        oracle: '',
        nftToken: '',
        name: '',
        market: {
          logo: pancake,
          url: 'https://pancakeswap.finance/nfts/collections/0x0a8901b0E25DEb55A87524f0cC164E9644020EBA',
        },
      }
    case NFT_ID_4:
      return {
        src: cloneX.src,
        oracle: 'clonex',
        nftToken: 'clonex',
        name: 'Clone X',
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/clonex',
        },
      }
    case NFT_ID_5:
      return {
        src: azuki.src,
        oracle: 'azuki',
        nftToken: 'azuki',
        name: 'Azuki',
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/azuki',
        },
      }
    case NFT_ID_6:
      return {
        src: doodles.src,
        oracle: 'doodles-official',
        nftToken: 'doodles',
        name: 'Doodles',
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/doodles-official',
        },
      }
    case NFT_ID_7:
      return {
        src: sandbox.src,
        oracle: 'sandbox',
        nftToken: 'sandbox',
        name: `Sandbox's LANDs`,
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/sandbox',
        },
      }
    case NFT_ID_8:
      return {
        src: otherdeed.src,
        oracle: 'otherdeed',
        nftToken: 'otherdeed',
        name: 'Otherdeed',
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/otherdeed',
        },
      }
    case NFT_ID_9:
      return {
        src: moonbirds.src,
        oracle: 'proof-moonbirds',
        nftToken: 'proof-moonbirds',
        name: 'Moonbirds',
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/proof-moonbirds',
        },
      }
    case NFT_ID_10:
      return {
        src: decentraland.src,
        oracle: 'decentraland',
        nftToken: 'decentraland',
        name: 'Decentraland',
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/decentraland',
        },
      }
    case NFT_ID_11:
      return {
        src: meebits.src,
        oracle: 'meebits',
        nftToken: 'meebits',
        name: 'Meebits',
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/meebits',
        },
      }
    case NFT_ID_12:
      return {
        src: cryptopunks.src,
        oracle: 'cryptopunks',
        nftToken: 'cryptopunks',
        name: 'CryptoPunks',
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/cryptopunks',
        },
      }
    default:
      throw new Error(`[getNFTInfo] 找不到对应 NFTInfo => (${NFT_ID})`)
  }
}
