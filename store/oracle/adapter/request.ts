import { NFTs, NFT_IDS } from 'app/web3/market'
import { safeGet } from 'utils/get'

function request(oracle: string) {
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
    const NFTSetting = NFTs[NFT_ID]
    if (!NFTSetting.oracle) return
    promises.push(
      request(NFTSetting.oracle).then((data) => {
        const floorPrice = safeGet(() => data.stats.floor_price) || 0
        oracle[NFT_ID] = floorPrice
      })
    )
  })
  return Promise.all(promises).then(() => oracle)
}

export type Oracle = Record<string, number>
