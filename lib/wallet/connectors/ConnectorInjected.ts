import type { Connector } from '../types'

export default async function init(): Promise<Connector> {
  const { InjectedConnector, UserRejectedRequestError } = await import('@web3-react/injected-connector')
  return {
    web3ReactConnector({ chainId }: { chainId: number[] }) {
      return new InjectedConnector({ supportedChainIds: chainId })
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
