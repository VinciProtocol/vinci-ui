import { safeGet } from 'utils/get'

export type CountTablesProps = {}
export const getCountTables = (props: CountTablesProps) => {
  return fetch('https://api.thegraph.com/subgraphs/name/imsunhao/nft-token', {
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
  })
    .then((data) => data.json())
    .then((data) => {
      const countTables: any[] = safeGet(() => data.data.countTables)
      if (!countTables) return Promise.reject(data)
      return countTables.reduce((obj, { id, count }) => {
        obj[id] = count
        return obj
      }, {} as any)
    })
}
export type CountTables = Record<string, number>
