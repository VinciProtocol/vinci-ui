import type { NetworkConfig } from './types'
import { ChainId } from '../chain/types'

export const networks: Record<ChainId, NetworkConfig> = {
  [ChainId.vinci]: {
    name: 'Vinci Stage',
    fullName: 'Vinci Stage',
    symbol: 'ETH',
    publicJsonRPCUrl: 'http://18.167.30.221:6357',
  },
  [ChainId.goerli]: {
    name: 'Goerli',
    fullName: 'Goerli Testnet',
    symbol: 'ETH',
    publicJsonRPCUrl: ['https://goerli.infura.io/v3/1fe83aa589cd4ae3adfcbb2d7d411d4a'],
  },
  [ChainId.ethereum]: {
    name: 'Ethereum',
    fullName: 'Ethereum',
    symbol: 'ETH',
    // publicJsonRPCUrl: 'https://mainnet.infura.io/v3/e33605b8ebd345fa914bd4cdfdfb401d',
    publicJsonRPCUrl: [
      'https://mainnet.infura.io/v3/1fe83aa589cd4ae3adfcbb2d7d411d4a',
      'https://mainnet.infura.io/v3/ba81afa823ed4d3e952c8f1b4be63abb',
    ],
  },
}

export function getNetwork(chainId: ChainId): NetworkConfig {
  const config = networks[chainId]
  return config || null
}
