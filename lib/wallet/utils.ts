import type { Account, EthereumProvider, ChainInformation } from './types'
import { getChainInformation, getKnownChainsIds } from './chains'
import type { ChainId } from 'app/web3/chain/types'
import { BigNumber } from 'ethers'
import { setItem, removeItem, getItem } from 'utils/cache/localStorage'

function isUnwrappedRpcResult(response: unknown): response is {
  error?: string
  result?: unknown
} {
  return typeof response === 'object' && response !== null && 'jsonrpc' in response
}

const EXPLORER_URL_TYPES = new Map([
  ['block', 'block'],
  ['transaction', 'tx'],
  ['address', 'address'],
  ['token', 'token'],
])

export const blockExplorerUrl = (type: string, value: string, chainId: number) => {
  if (!getKnownChainsIds().includes(chainId)) {
    return ''
  }

  if (!EXPLORER_URL_TYPES.has(type)) {
    throw new Error('type not supported.')
  }

  const domain = (getChainInformation(chainId) as ChainInformation).explorerUrl
  const typePart = EXPLORER_URL_TYPES.get(type)
  return `${domain}/${typePart}/${value}`
}

export function rpcResult(response: unknown): unknown | null {
  // Some providers don’t wrap the response
  if (isUnwrappedRpcResult(response)) {
    if (response.error) {
      throw new Error(response.error)
    }
    return response.result || null
  }

  return response || null
}

async function ethereumRequest(ethereum: EthereumProvider, method: string, params: any[]): Promise<any> {
  // If ethereum.request() exists, the provider is probably EIP-1193 compliant.
  if (ethereum.request) {
    return ethereum.request({ method, params }).then(rpcResult)
  }

  // This is specific to some older versions of MetaMask combined with Web3.js.
  if (ethereum.sendAsync && ethereum.selectedAddress) {
    return new Promise((resolve, reject) => {
      ethereum.sendAsync(
        {
          method,
          params,
          from: ethereum.selectedAddress,
          jsonrpc: '2.0',
          id: 0,
        },
        (err: Error, result: any) => {
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        }
      )
    }).then(rpcResult)
  }

  // If none of the previous two exist, we assume the provider is pre EIP-1193,
  // using .send() rather than .request().
  if (ethereum.send) {
    return ethereum.send(method, params).then(rpcResult)
  }

  throw new Error('The Ethereum provider does not seem to provide a request method.')
}

export async function getAccountIsContract(ethereum: EthereumProvider, account: Account): Promise<boolean> {
  try {
    const code = await ethereumRequest(ethereum, 'eth_getCode', [account])
    return code !== '0x'
  } catch (err) {
    return false
  }
}

export async function switchEthereumChain(ethereum: EthereumProvider, chainId: ChainId) {
  return ethereumRequest(ethereum, 'wallet_switchEthereumChain', [
    {
      chainId: BigNumber.from(chainId).toHexString(),
    },
  ])
}

const ACCOUNT_KEY = 'LAST_ACTIVE_ACCOUNT'
const CONNECTOR_KEY = 'LAST_WALLET_CONNECTOR'

export const setLastActiveAccount = (account: Account) => {
  setItem(ACCOUNT_KEY, account)
}

export const clearLastActiveAccount = () => {
  removeItem(ACCOUNT_KEY)
}

export const getLastActiveAccount = (): Account | null => {
  return getItem(ACCOUNT_KEY)
}

export const setLastConnector = (connector: string) => {
  setItem(CONNECTOR_KEY, connector)
}

export const getLastConnector = (): string | null => {
  return getItem(CONNECTOR_KEY)
}

export const isChainUnknownError = (error: any) => {
  return error && error.name === 'ChainUnknownError'
}
