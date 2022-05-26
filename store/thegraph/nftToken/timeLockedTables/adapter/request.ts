import { safeGet } from 'utils/get'

export type TimeLockedTablesProps = {
  account: string
}
export const getTimeLockedTables = ({ account }: TimeLockedTablesProps) => {
  return fetch('https://api.thegraph.com/subgraphs/name/imsunhao/nft-token', {
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
  })
    .then((data) => data.json())
    .then((data) => {
      const timeLockedTables: any[] = safeGet(() => data.data.timeLockedTables)
      if (!timeLockedTables) return Promise.reject(data)
      return timeLockedTables
    })
}
export type TimeLockedTables = Array<{
  expirationTime: number
  nToken: string
  lockType: string
  tokenid: string
}>
