import { NFTs, NFT_IDS } from 'app/web3/market'
import { safeGet } from 'utils/get'

type RequestProps = {
  name: string
  account: string
  signal: any
}
function request({ name, account, signal }: RequestProps) {
  return fetch(`https://api.thegraph.com/subgraphs/name/${name}`, {
    headers: {
      accept: '*/*',
      'content-type': 'application/json',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
    },
    referrer: 'https://thegraph.com/',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: `{"query":"{timeLockedTables(where:{user: \\"${account}\\"}) { id nToken user tokenid lockType expirationTime}}","variables":null}`,
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
    signal,
  }).then((data) => data.json())
}

export type TimeLockedTablesProps = {
  account: string
}
export const getTimeLockedTables = ({ account }: TimeLockedTablesProps, { signal }: any) => {
  const timeLockedTables: TimeLockedTables = {}
  const promises: any = []
  NFT_IDS.forEach((NFT_ID) => {
    const nftSetting = NFTs[NFT_ID]
    if (!nftSetting || !nftSetting.nftToken) return
    const name = `imsunhao/nft-token-${nftSetting.nftToken}`
    promises.push(
      request({
        name,
        signal,
        account,
      }).then((data) => {
        const table: any[] = safeGet(() => data.data.timeLockedTables)
        if (!table) return Promise.reject(data)
        timeLockedTables[nftSetting.underlyingAsset] = table
        return table
      })
    )
  })
  return Promise.all(promises).then(() => timeLockedTables)
}

export type TimeLockedTables = Record<
  string,
  Array<{
    expirationTime: number
    nToken: string
    lockType: string
    tokenid: string
  }>
>
