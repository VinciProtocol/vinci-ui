import type { Connector } from '../types'

export default async function init(): Promise<Connector> {
  const { UserRejectedRequestError, WalletConnectConnector } = await import('@web3-react/walletconnect-connector')
  return {
    web3ReactConnector() {
      return new WalletConnectConnector({
        qrcode: true,
        infuraId: '1fe83aa589cd4ae3adfcbb2d7d411d4a',
      })
    },
    handleActivationError(error: Error) {
      const returnValue = { error, ignore: false }

      if (error instanceof UserRejectedRequestError) {
        returnValue.ignore = true
      }

      return returnValue
    },
  }
}
