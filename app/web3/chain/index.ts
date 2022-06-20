import { ChainId } from './types'

export const ChainIdToNetwork: Record<ChainId, string> = {
  [ChainId.ethereum]: 'ethereum',
  [ChainId.rinkeby]: 'rinkeby',
  [ChainId.kovan]: 'kovan',
  [ChainId.bsct]: 'bsct',
  [ChainId.bsc]: 'bsc',
  [ChainId.localhost]: 'localhost',
  [ChainId.vinci]: 'vinci',
}
