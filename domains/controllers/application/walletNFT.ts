import { useCallback, useMemo } from 'react'
import { useWallet } from 'app/wallet'
import { useContract } from 'domains/contract'
import { NFT_IDS } from 'app/web3/market'

import { useMarket } from 'domains'
import { useObjectMemo } from 'app/hooks/useValues'
import type { MarketData } from 'app/web3/market/types'
import { useRequestControllers } from 'store/contract/uiPool/walletNFT'
import type { WalletNFTUseRequestController } from 'store/contract/uiPool/walletNFT/utils/requestSliceHelper'
import { safeGet } from 'utils/get'

type UseRequestController = WalletNFTUseRequestController
type CreateUseWalletNFTController = ReturnType<typeof createUseWalletNFTController>

const createUseWalletNFTController =
  (getProvider: (market: MarketData) => string, useRequestController: UseRequestController) => () => {
    const { wallet } = useContract()
    const { account } = useWallet()
    const { usePolling, polling, clearData } = useRequestController()
    const { market } = useMarket()
    const provider = getProvider(market)
    const query = useMemo(
      () => ({
        provider,
        wallet,
        user: account,
      }),
      [account, provider, wallet]
    )

    usePolling(query, (query) => !query || !query.user || !query.wallet || !query.provider, 5 * 1000)

    const restart = useCallback(() => {
      polling.restart(query)
    }, [polling, query])

    return {
      stop: polling.stop,
      restart,
      clearData,
    }
  }

const useWalletNFT: Record<string, CreateUseWalletNFTController> = {}
NFT_IDS.forEach((NFT_ID) => {
  useWalletNFT[NFT_ID] = createUseWalletNFTController(
    (market) => safeGet(() => market.nfts[NFT_ID].LENDING_POOL_ADDRESS_PROVIDER),
    useRequestControllers[NFT_ID]
  )
})

export type UseWalletNFTController = ReturnType<ReturnType<typeof createUseWalletNFTController>>
export const useWalletNFTControllers = () => {
  const walletBalanceControllers: Record<string, UseWalletNFTController> = {}
  NFT_IDS.forEach((NFT_ID) => {
    walletBalanceControllers[NFT_ID] = useWalletNFT[NFT_ID]()
  })
  const returnValue = useObjectMemo(walletBalanceControllers)
  return returnValue
}
