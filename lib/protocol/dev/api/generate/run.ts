import path from 'path'
import { requireFromPath } from 'utils/require'
import { writeFile } from 'utils/fs'

const ROOT_PATH = process.cwd()

const SOURCE_BASE_PATH = path.resolve(ROOT_PATH, 'lib/protocol/src')
const DEPLOYED_CONTRACTS_PATH = path.resolve(SOURCE_BASE_PATH, 'deployed-contracts.json')
const DEPLOYED_MARKET_CONTRACTS_PATH = path.resolve(SOURCE_BASE_PATH, 'deployed-market-contracts.json')

const TARGET_BASE_PATH = path.resolve(ROOT_PATH, 'lib/protocol/generate')

export const run = async () => {
  const a = requireFromPath(DEPLOYED_CONTRACTS_PATH)
  const b = requireFromPath(DEPLOYED_MARKET_CONTRACTS_PATH)

  const networks: any = {}

  Object.keys(a).forEach((key) => {
    const v = a[key]
    Object.keys(v).forEach((network) => {
      if (!networks[network]) networks[network] = {}
      networks[network][key] = v[network].address.toLocaleLowerCase()
    })
  })

  const markets: any = {}
  Object.keys(b).forEach((key) => {
    const v = b[key]
    Object.keys(v).forEach((network) => {
      if (!networks[network]) networks[network] = {}
      const v2 = v[network]
      Object.keys(v2).forEach((marketId) => {
        if (!markets[network]) markets[network] = {}
        if (!markets[network][marketId]) markets[network][marketId] = {}

        if (key === 'TimeLockableNTokenForTest') {
          const nToken: any = {}
          Object.keys(v2[marketId]).forEach((key) => {
            nToken[key] = v2[marketId][key].address.toLocaleLowerCase()
          })
          markets[network][marketId][key] = nToken
          return
        }

        markets[network][marketId][key] = v2[marketId].address.toLocaleLowerCase()
      })
    })
  })

  Object.keys(networks).forEach((name) => {
    writeFile(path.resolve(TARGET_BASE_PATH, `${name}.json`), {
      ...networks[name],
      markets: markets[name],
    })
  })

  console.log('[api/protocol/generate] output to', TARGET_BASE_PATH)
}
