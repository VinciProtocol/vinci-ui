import type { NetworkConfig } from './types'
import { ChainId } from '../chain/types'

export const networks: Record<ChainId, NetworkConfig> = {
  [ChainId.vinci]: {
    name: 'Vinci Stage',
    symbol: 'ETH',
    publicJsonRPCUrl: 'http://18.167.30.221:6357',
  },
  [ChainId.kovan]: {
    name: 'Kovan',
    symbol: 'ETH',
    // publicJsonRPCUrl: 'https://kovan.poa.network',
    publicJsonRPCUrl: 'https://kovan.infura.io/v3/e33605b8ebd345fa914bd4cdfdfb401d',
  },
  [ChainId.bsct]: {
    name: 'BSC Testnet',
    symbol: 'BNB',
    // publicJsonRPCUrl: 'https://kovan.poa.network',
    publicJsonRPCUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  },
  [ChainId.bsc]: {
    name: 'BSC',
    symbol: 'BNB',
    publicJsonRPCUrl: 'https://bsc-dataseed.binance.org/',
  },
  [ChainId.localhost]: {
    name: 'Localhost',
    symbol: 'ETH',
    publicJsonRPCUrl: 'http://localhost:8545',
  },
}

export function getNetwork(chainId: ChainId): NetworkConfig {
  const config = networks[chainId]
  return config || null
}
