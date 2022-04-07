import type { ChainId } from '../chain/types'
import { getNetwork } from '../network'
import type { Provider } from './common-static-json-rpc-provider'
import { CommonStaticJsonRpcProvider } from './common-static-json-rpc-provider'

const cacheProviders = new Map<ChainId, Provider>()

const createConnectionInfo = (rpc: string) => {
  return {
    url: rpc,
  }
}

export const getProvider = (chainId: ChainId) => {
  const cacheProvider = cacheProviders.get(chainId)
  if (cacheProvider) return cacheProvider

  let provider: Provider
  const network = getNetwork(chainId)

  if (network.publicJsonRPCUrl) {
    provider = new CommonStaticJsonRpcProvider(createConnectionInfo(network.publicJsonRPCUrl))
  } else {
    throw new Error(`${chainId} has no jsonRPCUrl configured`)
  }

  cacheProviders.set(chainId, provider)
  return provider
}
