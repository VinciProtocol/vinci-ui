import type { AbstractConnector } from '@web3-react/abstract-connector'
import type { NetworkConfig } from 'app/web3/network/types'
import type { ProviderId } from './providers/types'

export type Currency = {
  name: string
  symbol: string
  decimals: number
}

export type ChainType = {
  id: number
  type: string
  testnet: boolean
}

export type RpcData = {
  [key: number]: string
}

export type ChainInformation = ChainType & {
  nativeCurrency: Currency
  fullName: string
  shortName: string
  explorerUrl: string
}

export type AccountType = 'contract' | 'normal'

export type Status = 'connected' | 'disconnected' | 'connecting' | 'error'

export type Account = string
export type Balance = string

export type Wallet = {
  account: Account | null
  chainId: number | undefined
  /**
   * #### Wallet Connect
   *
   * Default Value
   * - connectorId: injected
   */
  connect: (connectorId?: ProviderId) => Promise<void>
  connector: ProviderId | null
  connectors: object
  error: Error | null
  ethereum?: any
  isConnected: () => boolean
  network: ChainInformation & NetworkConfig
  reset: () => void
  status: Status
  type: AccountType | null
}

type EthereumProviderEip1193 = {
  request: (args: { method: string; params?: unknown[] | object }) => Promise<unknown>
}

type EthereumProviderSend = {
  send: (method: string, params: string[]) => Promise<unknown>
}

type EthereumProviderSendAsync = {
  sendAsync: (
    params: {
      method: string
      params: string[]
      from: string
      jsonrpc: '2.0'
      id: number
    },
    callback: (err: Error, result: unknown) => void
  ) => void
  selectedAddress: string
}

export type EthereumProvider = EthereumProviderEip1193 & EthereumProviderSend & EthereumProviderSendAsync

export type ConnectorInit = () => Promise<Connector>

export type Connector = {
  // Using `params: any` rather than `params: { chainId: number; [key: string]: any }`:
  // TS 3.9 doesn’t seem to accept `[key: string]: any` as valid to add extra
  // parameters, when using `class implements Connector`. It also rejects any
  // extra parameters added to `{}` or `object` in this case.
  web3ReactConnector: (params: any) => AbstractConnector
  handleActivationError?: (error: Error) => { error: Error; ignore?: boolean } | null
}
