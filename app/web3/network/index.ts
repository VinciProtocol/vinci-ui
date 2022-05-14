import type { NetworkConfig } from './types'
import { ChainId } from '../chain/types'

export const networks: Record<ChainId, NetworkConfig> = {
  [ChainId.vinci]: {
    name: 'Vinci Stage',
    fullName: 'Vinci Stage',
    symbol: 'ETH',
    publicJsonRPCUrl: 'http://18.167.30.221:6357',
  },
  [ChainId.kovan]: {
    name: 'Kovan',
    fullName: 'Kovan Testnet',
    symbol: 'ETH',
    // publicJsonRPCUrl: 'https://kovan.poa.network',
    publicJsonRPCUrl: 'https://kovan.infura.io/v3/e33605b8ebd345fa914bd4cdfdfb401d',
  },
  [ChainId.bsct]: {
    name: 'BSC Testnet',
    fullName: 'BSC Testnet',
    symbol: 'BNB',
    // publicJsonRPCUrl: 'https://kovan.poa.network',
    publicJsonRPCUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  },
  [ChainId.bsc]: {
    name: 'BSC',
    fullName: 'BNB Smart Chain',
    symbol: 'BNB',
    publicJsonRPCUrl: 'https://bsc-dataseed.binance.org',
  },
  [ChainId.ethereum]: {
    name: 'Ethereum',
    fullName: 'Ethereum Mainnet',
    symbol: 'ETH',
    publicJsonRPCUrl: 'https://mainnet.infura.io/v3/e33605b8ebd345fa914bd4cdfdfb401d',
  },
  [ChainId.localhost]: {
    name: 'Localhost',
    fullName: 'Localhost',
    symbol: 'ETH',
    publicJsonRPCUrl: 'http://localhost:8545',
  },
}

export function getNetwork(chainId: ChainId): NetworkConfig {
  const config = networks[chainId]
  return config || null
}
