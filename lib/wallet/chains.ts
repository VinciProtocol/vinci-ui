import { ChainId } from 'app/web3/chain/types'
import { ChainUnknownError } from './errors'
import type { ChainInformation, ChainType, Currency } from './types'

const ETH: Currency = {
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
}

const BNB: Currency = {
  name: 'BNB',
  symbol: 'ETH',
  decimals: 18,
}

const CHAIN_INFORMATION = new Map<number, ChainInformation | ChainType>([
  [
    ChainId.ethereum,
    {
      id: ChainId.ethereum,
      nativeCurrency: ETH,
      type: 'main',
      fullName: 'Ethereum Mainnet',
      shortName: 'Ethereum',
      explorerUrl: `https://etherscan.io`,
      testnet: false,
    },
  ],
  [
    ChainId.vinci,
    {
      id: ChainId.vinci,
      nativeCurrency: ETH,
      type: 'vinci',
      fullName: 'Stage Vinci',
      shortName: 'Stage Vinci',
      explorerUrl: `https://etherscan.io`,
      testnet: true,
    },
  ],
  [
    ChainId.localhost,
    {
      id: ChainId.localhost,
      nativeCurrency: ETH,
      type: 'Localhost',
      fullName: 'Stage Vinci',
      shortName: 'Stage Vinci',
      explorerUrl: `https://etherscan.io`,
      testnet: true,
    },
  ],
  [
    ChainId.bsct,
    {
      id: ChainId.bsct,
      nativeCurrency: BNB,
      type: 'BSC Test',
      fullName: 'BSC Test',
      shortName: 'BSC Test',
      explorerUrl: `https://testnet.bscscan.com/`,
      testnet: true,
    },
  ],
  [
    ChainId.bsc,
    {
      id: ChainId.bsc,
      nativeCurrency: BNB,
      type: 'BSC',
      fullName: 'BSC',
      shortName: 'BSC',
      explorerUrl: `https://bscscan.com`,
      testnet: false,
    },
  ],
  [
    ChainId.kovan,
    {
      id: ChainId.kovan,
      nativeCurrency: ETH,
      type: 'kovan',
      fullName: 'Kovan',
      shortName: 'Kovan',
      explorerUrl: `https://kovan.etherscan.io`,
      testnet: true,
    },
  ],
])

/**
 * This method checks whether a particular chain id is known.
 *
 * @param {number} chainId chain id to check
 * @returns {boolean} true if chain is known
 */
export function isKnownChain(chainId: number): boolean {
  return CHAIN_INFORMATION.has(chainId)
}

/**
 *
 * @param {number} chainId chain id to retrieve information for
 * @throws {ChainUnknownError} if chain is unknown
 * @returns {boolean} information for specified chain
 */
export function getChainInformation(chainId: number): ChainInformation | ChainType {
  const chainInfo = CHAIN_INFORMATION.get(chainId)
  if (!chainInfo) throw new ChainUnknownError(`Unknown chain id: ${chainId}`)
  return chainInfo
}

/**
 * This is a getter method to returns the chain ids of all known chains.
 *
 * @returns {number[]} array of chain Ids
 */
export function getKnownChainsIds(): number[] {
  return Array.from(CHAIN_INFORMATION.keys())
}

/**
 * This is a getter method to return all information available for each known chain.
 *
 * @returns {ChainInformation | ChainType[]} An array containing information for
 * each known chain
 */
export function getKnownChainInformation(): ChainInformation | ChainType[] {
  return Array.from(CHAIN_INFORMATION.values())
}
