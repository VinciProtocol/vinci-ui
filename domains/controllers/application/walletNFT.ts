import { useCallback, useMemo } from 'react'
import { useWallet } from 'app/wallet'

import { useRequestController } from 'store/contract/uiPool/walletNFT'
import { useContractNFT } from 'domains'

export const useWalletNFTController = () => {
  const { account, chainId } = useWallet()
  const { nft } = useContractNFT()
  const { usePolling, polling, clearData } = useRequestController()
  const query = useMemo(() => {
    if (!nft.underlyingAsset) return undefined
    const tokenAddresses = [nft.walletUnderlyingAsset || nft.underlyingAsset]
    return {
      chainId,
      user: account,
      tokenAddresses,
    }
  }, [account, chainId, nft])

  usePolling(
    query,
    (query) => !query || !query.user || !query.chainId || !query.tokenAddresses || !query.tokenAddresses.length,
    5 * 1000
  )

  const restart = useCallback(() => {
    polling.restart(query)
  }, [polling, query])

  return {
    stop: polling.stop,
    restart,
    clearData,
  }
}
