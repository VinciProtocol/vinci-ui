import { NFTs, NFT_IDS } from 'app/web3/market'
import { safeGet } from 'utils/get'

type RequestProps = {
  name: string
  signal: any
}
function request({ name, signal }: RequestProps) {
  return fetch(`https://api.thegraph.com/subgraphs/name/${name}`, {
    headers: {
      accept: '*/*',
      'content-type': 'application/json',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
    },
    referrer: 'https://thegraph.com/',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: '{"query":"{countTables {id count}}","variables":null}',
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
    signal,
  }).then((data) => data.json())
}

export type CountTablesProps = {}
export const getCountTables = (props: CountTablesProps, { signal }: any) => {
  const countTables: CountTables = {}
  const promises: any = []
  NFT_IDS.forEach((NFT_ID) => {
    const nftSetting = NFTs[NFT_ID]
    const name = `imsunhao/nft-token-${nftSetting.collection.toLowerCase()}`
    promises.push(
      request({
        name,
        signal,
      }).then((data) => {
        const table: any[] = safeGet(() => data.data.countTables)
        if (!table) return Promise.reject(data)
        countTables[nftSetting.underlyingAsset] = table.reduce((obj, { id, count }) => {
          obj[id] = count
          return obj
        }, {} as any)
        return table
      })
    )
  })
  return Promise.all(promises).then(() => countTables)
}
export type CountTables = Record<string, Record<string, number>>
