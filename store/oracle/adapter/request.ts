import { ChainId } from 'app/web3/chain/types'
import { MARKETS, NFT_IDS } from 'app/web3/market'
import { safeGet } from 'utils/get'

function request() {
  return fetch(`https://api-bff.nftpricefloor.com/nfts`, {
    headers: {
      accept: 'application/json',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
    },
    referrer: 'https://docs.opensea.io/',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
    mode: 'cors',
    credentials: 'omit',
  }).then((data) => data.json())
}

function requestOpensea(oracle: string) {
  return fetch(`https://api.opensea.io/api/v1/collection/${oracle}/stats`, {
    headers: {
      accept: 'application/json',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
    },
    referrer: 'https://docs.opensea.io/',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
    mode: 'cors',
    credentials: 'omit',
  }).then((data) => data.json())
}

export type OracleProps = {}
export const useOracle = (props: OracleProps) => {
  const promises: any[] = []
  const oracle: Oracle = {}

  NFT_IDS.forEach((NFT_ID) => {
    const NFTSetting = MARKETS[ChainId.ethereum].nfts[NFT_ID]
    if (!NFTSetting || !NFTSetting.oracle) return
    const oracleName = NFTSetting.oracle
    if (/opensea__/.test(oracleName)) {
      promises.push(
        requestOpensea(oracleName.split('opensea__')[1]).then((data) => {
          const floorPrice = safeGet(() => data.stats.floor_price) || 0
          oracle[NFT_ID] = floorPrice
        })
      )
    }
  })

  promises.push(
    request().then((datas) => {
      NFT_IDS.forEach((NFT_ID) => {
        const NFTSetting = MARKETS[ChainId.ethereum].nfts[NFT_ID]
        if (!NFTSetting || !NFTSetting.oracle) return
        const oracleName = NFTSetting.oracle
        if (/opensea__/.test(oracleName)) return
        const data = datas.find((i: any) => i.slug === oracleName)
        if (!data) return console.error('[useOracle]', oracleName)
        const floorPrice = safeGet(() => data.floorPriceETH) || 0
        oracle[NFT_ID] = floorPrice
      })
    })
  )

  return Promise.all(promises).then(() => oracle)
}

export type Oracle = Record<string, number>
