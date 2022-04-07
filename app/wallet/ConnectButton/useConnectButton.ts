import { useWallet } from 'app/wallet'
import { defaultMarket } from 'app/web3/market'
import { switchEthereumChain } from 'lib/wallet/utils'
import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'

export function useConnectButton() {
  const {
    status,
    error,
    connectDialog: { open },
  } = useWallet()

  const { library } = useWeb3React()
  const onSwitchEthereumChain = useCallback(() => {
    const provider = library || window.ethereum
    if (provider) return switchEthereumChain(provider, defaultMarket.chainId)
    open()
  }, [library, open])

  return { status, open, error, onSwitchEthereumChain }
}
