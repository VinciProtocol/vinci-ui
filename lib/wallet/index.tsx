import type { ReactNode } from 'react'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { defaultMarket } from 'app/web3/market'
import { getNetwork } from 'app/web3/network'
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { UnsupportedChainIdError, Web3ReactProvider, useWeb3React } from '@web3-react/core'
import type { Web3ReactContextInterface } from '@web3-react/core/dist/types'

import type { AccountType, Status, Wallet } from './types'
import { connectors } from './connectors'
import { ChainUnsupportedError, ConnectorUnsupportedError } from './errors'

import { getProviderFromUseWalletId, getProviderString } from './providers'
import type { ProviderId } from './providers/types'
import * as chains from './chains'
import {
  clearLastActiveAccount,
  setLastConnector,
  setLastActiveAccount,
  getLastConnector,
  getLastActiveAccount,
  getAccountIsContract,
} from './utils'

type WalletContext = {
  wallet: Wallet
} | null

const UseWalletContext = React.createContext<WalletContext>(null)

// CONTEXT CONSUMER ============================================================

function useWallet(): Wallet {
  const { wallet } = useContext(UseWalletContext)

  return wallet
}

// CONTEXT PROVIDER ============================================================

export type UseWalletProviderProps = {
  children?: ReactNode
  autoConnect: boolean
  getLibrary: (provider?: any, connector?: Required<Web3ReactContextInterface>['connector']) => any
}

UseWalletProvider.propTypes = {
  children: PropTypes.node,
  autoConnect: PropTypes.bool,
}

UseWalletProvider.defaultProps = {
  autoConnect: false,
}

function UseWalletProvider({ children, autoConnect }: UseWalletProviderProps) {
  const [connector, setConnector] = useState<ProviderId | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [type, setType] = useState<AccountType | null>(null)
  const [status, setStatus] = useState<Status>('disconnected')
  const web3ReactContext = useWeb3React()
  const activationId = useRef<number>(0)
  const { account, chainId: web3ChainId, library, error: web3Error } = web3ReactContext
  const [defaultChainId, setDefaultChainId] = useState(defaultMarket.chainId)
  useEffect(() => {
    if (__SERVER__ || !window.ethereum) return
    const { ethereum } = window
    const chainId = ethereum.chainId
    let timer: ReturnType<typeof setTimeout>
    if (chainId) {
      setDefaultChainId(parseInt(chainId))
    } else {
      timer = setTimeout(() => {
        const chainId = ethereum.chainId
        if (chainId) {
          setDefaultChainId(parseInt(chainId))
        }
      }, 1000)
    }
    const onchainChanged = (chainId: string) => {
      setDefaultChainId(parseInt(chainId))
    }
    ethereum.on('chainChanged', onchainChanged)
    return () => {
      ethereum.removeListener('chainChanged', onchainChanged)
      clearTimeout(timer)
    }
  }, [])

  const chainId = useMemo(() => (web3ChainId ? web3ChainId : defaultChainId), [web3ChainId, defaultChainId])

  const reset = useCallback(() => {
    if (web3ReactContext.active) {
      web3ReactContext.deactivate()
    }
    clearLastActiveAccount()
    setConnector(null)
    setError(null)
    setStatus('disconnected')
  }, [web3ReactContext])

  // if the user switched networks on the wallet itself
  // return unsupported error.
  useMemo(() => {
    if (web3Error instanceof UnsupportedChainIdError) {
      setStatus('error')
      debugger
      setError(new ChainUnsupportedError(web3Error.message))
    }
  }, [web3Error])

  useEffect(() => {
    if (!error) return
    console.log(error)
    debugger
  }, [error])

  const connect = useCallback(
    async (connectorId: ProviderId = 'injected') => {
      // Prevent race conditions between connections by using an external ID.
      const id = ++activationId.current

      reset()

      // Check if another connection has happened right after deactivate().
      if (id !== activationId.current) {
        return
      }

      const connectorInit = connectors[connectorId as 'injected']
      if (!connectorInit) {
        setStatus('error')
        setError(new ConnectorUnsupportedError(connectorId))
        return
      }

      // If no connection happens, we're in the right context and can safely update
      // the connection stage status
      setStatus('connecting')

      // Initialize the (useWallet) connector if it exists.
      const connector = await connectorInit?.()

      // Initialize the web3-react connector if it exists.
      const web3ReactConnector = connector?.web3ReactConnector?.({})

      if (!web3ReactConnector) {
        setStatus('error')
        setError(new ConnectorUnsupportedError(connectorId))
        return
      }

      try {
        // TODO: there is no way to prevent an activation to complete, but we
        // could reconnect to the last provider the user tried to connect to.
        setConnector(connectorId)
        await web3ReactContext.activate(web3ReactConnector, undefined, true)
        setLastConnector(connectorId)
        if (connectorId === 'injected') {
          const account = await web3ReactConnector.getAccount()
          account && setLastActiveAccount(account)
          web3ReactConnector.getProvider().then((provider) => {
            provider.on('accountsChanged', (accounts: string[]) => {
              setLastActiveAccount(accounts[0])
            })
          })
        }
        setStatus('connected')
      } catch (err) {
        // Don’t throw if another connection has happened in the meantime.
        if (id !== activationId.current) {
          return
        }

        const throwError = (error: Error) => {
          setConnector(null)
          setStatus('error')
          setError(error)
        }

        const ignoreError = () => {
          setConnector(null)
          setStatus('disconnected')
        }

        if (err instanceof UnsupportedChainIdError) return throwError(new ChainUnsupportedError(err.message))

        // It might have thrown with an error known by the connector
        if (connector.handleActivationError) {
          const { error, ignore } = connector.handleActivationError(err as Error)
          if (ignore) return ignoreError()
          if (error) return throwError(error)
        }

        throwError(err as Error)
      }
    },
    [reset, web3ReactContext]
  )

  useEffect(() => {
    if (!autoConnect) {
      return
    }

    const lastConnector = getLastConnector()
    const lastActiveAccount = getLastActiveAccount()

    if (lastActiveAccount && lastConnector === 'injected') {
      const isInjectedAvailable = Object.keys(connectors).some((key) => key === 'injected')

      if (isInjectedAvailable) {
        connect()
      }
    }

    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!account || !library) {
      return
    }

    let cancel = false

    setType(null)

    getAccountIsContract(library, account).then((isContract) => {
      if (!cancel) {
        setStatus('connected')
        setType(isContract ? 'contract' : 'normal')
      }
    })

    return () => {
      cancel = true
      setStatus('disconnected')
      setType(null)
    }
  }, [account, library])

  const wallet = useMemo(() => {
    let chainInfo: any = getNetwork(chainId)
    let e = error
    let s = status
    try {
      chainInfo = {
        ...chains.getChainInformation(chainId),
        ...chainInfo,
      }
    } catch (error) {
      e = error as any
      s = 'error'
    }

    return {
      _web3ReactContext: web3ReactContext,
      account: account || null,
      chainId,
      connect,
      connector,
      connectors,
      error: e,
      ethereum: library,
      isConnected: () => s === 'connected',
      network: chainInfo,
      providerInfo: connector ? getProviderFromUseWalletId(connector) : getProviderFromUseWalletId('unknown'),
      reset,
      status: s,
      type,
    }
  }, [account, chainId, connect, connector, error, library, type, reset, status, web3ReactContext])

  return (
    <UseWalletContext.Provider
      value={{
        wallet,
      }}
    >
      {children}
    </UseWalletContext.Provider>
  )
}

UseWalletProviderWrapper.propTypes = UseWalletProvider.propTypes
UseWalletProviderWrapper.defaultProps = UseWalletProvider.defaultProps

function UseWalletProviderWrapper(props: UseWalletProviderProps) {
  const getLibrary = props.getLibrary
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <UseWalletProvider {...props} />
    </Web3ReactProvider>
  )
}

export {
  ChainUnsupportedError,
  ConnectorUnsupportedError,
  UseWalletProviderWrapper as UseWalletProvider,
  useWallet,
  getProviderString,
  getProviderFromUseWalletId,
  chains,
}
