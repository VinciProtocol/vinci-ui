import { ChainId } from './types'

export const ChainIdToNetwork: Record<ChainId, string> = {
  [ChainId.kovan]: 'kovan',
  [ChainId.bsct]: 'bsct',
  [ChainId.bsc]: 'bsc',
  [ChainId.localhost]: 'localhost',
  [ChainId.vinci]: 'vinci',
}
