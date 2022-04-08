import type { Connector } from '../types'
import { ConnectionRejectedError } from '../errors'

export default async function init(): Promise<Connector> {
  const { UserRejectedRequestError, WalletConnectConnector } = await import('@web3-react/walletconnect-connector')
  return {
    web3ReactConnector() {
      return new WalletConnectConnector({
        qrcode: true,
        infuraId: 'e33605b8ebd345fa914bd4cdfdfb401d',
      })
    },
    handleActivationError(err: Error) {
      return err instanceof UserRejectedRequestError ? new ConnectionRejectedError() : null
    },
  }
}
