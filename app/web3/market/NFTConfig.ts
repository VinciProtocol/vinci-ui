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
        imageName: 'ape.jpg',
        symbol: 'BAYC',
        src: ape.src,
        oracle: 'v2',
        name: 'Bored Ape Yacht Club',
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/boredapeyachtclub',
        },
      }
    case NFT_ID_2:
      return {
        imageName: 'mutant-ape.jpg',
        symbol: 'MAYC',
        src: mutantApe.src,
        oracle: 'v3',
        name: 'Mutant Ape Yacht Club',
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/mutant-ape-yacht-club',
        },
      }
    case NFT_ID_3:
      return {
        imageName: '',
        symbol: '',
        src: pancakeSquad.src,
        oracle: '',
        name: '',
        market: {
          logo: pancake,
          url: 'https://pancakeswap.finance/nfts/collections/0x0a8901b0E25DEb55A87524f0cC164E9644020EBA',
        },
      }
    case NFT_ID_4:
      return {
        imageName: 'clonex.png',
        symbol: 'CloneX',
        src: cloneX.src,
        oracle: 'v6',
        name: 'Clone X',
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/clonex',
        },
      }
    case NFT_ID_5:
      return {
        imageName: 'azuki.jpg',
        symbol: 'AZUKI',
        src: azuki.src,
        oracle: 'v7',
        name: 'Azuki',
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/azuki',
        },
      }
    case NFT_ID_6:
      return {
        imageName: 'doodles.jpg',
        symbol: 'DOODLE',
        src: doodles.src,
        oracle: 'v5',
        name: 'Doodles',
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/doodles-official',
        },
      }
    case NFT_ID_7:
      return {
        imageName: 'sandbox.png',
        symbol: 'Sandbox',
        src: sandbox.src,
        oracle: '',
        name: `Sandbox's LANDs`,
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/sandbox',
        },
      }
    case NFT_ID_8:
      return {
        imageName: 'otherdeed.jpg',
        symbol: 'OTHR',
        src: otherdeed.src,
        oracle: '',
        name: 'Otherdeed',
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/otherdeed',
        },
      }
    case NFT_ID_9:
      return {
        imageName: 'moonbirds.png',
        symbol: 'MOONBIRD',
        src: moonbirds.src,
        oracle: 'v4',
        name: 'Moonbirds',
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/proof-moonbirds',
        },
      }
    case NFT_ID_10:
      return {
        imageName: 'decentraland.png',
        symbol: 'LAND',
        src: decentraland.src,
        oracle: '',
        name: 'Decentraland LAND',
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/decentraland',
        },
      }
    case NFT_ID_11:
      return {
        imageName: 'meebits.png',
        symbol: 'Meebit',
        src: meebits.src,
        oracle: '',
        name: 'Meebits',
        market: {
          logo: opensea,
          url: 'https://opensea.io/collection/meebits',
        },
      }
    case NFT_ID_12:
      return {
        imageName: 'cryptopunks.png',
        symbol: 'CryptoPunk',
        src: cryptopunks.src,
        oracle: 'v1',
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

export const ethereumCryptoPunksMarket = '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb'
export const goerliCryptoPunksMarket = '0xc6406cada8696a4183b6ef9d00c4580bf31eeb78'
