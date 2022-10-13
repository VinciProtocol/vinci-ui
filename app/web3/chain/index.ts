import { ChainId } from './types'

export const ChainIdToNetwork: Record<ChainId, string> = {
  [ChainId.ethereum]: 'ethereum',
  [ChainId.goerli]: 'goerli',
  [ChainId.vinci]: 'vinci',
}
