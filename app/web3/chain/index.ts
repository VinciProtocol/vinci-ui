import { ChainId } from './types'

export const ChainIdToNetwork: Record<ChainId, string> = {
  [ChainId.ethereum]: 'ethereum',
  [ChainId.rinkeby]: 'rinkeby',
  [ChainId.vinci]: 'vinci',
}
