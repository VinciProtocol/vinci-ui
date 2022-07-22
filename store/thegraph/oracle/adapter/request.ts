import { valueToBigNumber } from 'utils/math'

const DayTime = 24 * 60 * 60

export type OracleRecordsProps = {}
export const getOracleRecords = (props: OracleRecordsProps, { signal }: any) => {
  const now = `${Date.now()}`.slice(0, 10)
  const startTime = valueToBigNumber(now)
    .minus(DayTime * 90)
    .toString()
  return fetch('https://api.thegraph.com/subgraphs/name/vinciprotocol/oracle', {
    headers: {
      accept: '*/*',
      'content-type': 'application/json',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
    },
    referrer: 'https://thegraph.com/',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: JSON.stringify({
      query: `{
  records(
    first: 1000
    where: { createTime_gt: ${startTime}, createTime_lt: ${now} }
    orderBy: createTime
    orderDirection: asc
  ) {
    v1
    v2
    v3
    v4
    v5
    v6
    v7
    createTime
  }
}`,
      variables: null,
    }),
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
    signal,
  })
    .then((data) => data.json())
    .then(({ data }) => data.records)
}
export type OracleRecord = Record<'createTime' | 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7', string>
export type OracleRecords = OracleRecord[]
