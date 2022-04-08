import initInjected from './connectors/ConnectorInjected'
import initWalletConnect from './connectors/ConnectorWalletConnect'

export const connectors = {
  injected: initInjected,
  walletconnect: initWalletConnect,
}
