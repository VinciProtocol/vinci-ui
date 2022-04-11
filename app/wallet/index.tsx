import type { FC } from 'react'

import { createContext } from 'utils/createContext'
import { useWallet as useWalletBase } from 'lib/wallet'

import UseWalletProvider from './UseWallet/Provider'

import { useChainDialog } from './modules/chain-dialog'
import { useConnectDialog } from './modules/connect-dialog'

const useWalletService = () => {
  const chainDialog = useChainDialog()
  const connectDialog = useConnectDialog()
  const wallet = useWalletBase()

  return { ...wallet, connectDialog, chainDialog }
}

export const { Context, Provider: WalletProvider, createUseContext } = createContext(useWalletService)

export const Provider: FC = (props) => {
  return (
    <UseWalletProvider>
      <WalletProvider>{props.children}</WalletProvider>
    </UseWalletProvider>
  )
}

export const useWallet = createUseContext()

export default Provider
