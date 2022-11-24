import { useCallback, useMemo } from 'react'
import { useWallet } from 'app/wallet'
import { useVinciContract } from '@vinci-protocol/domains'
import { NFT_IDS } from 'app/web3/market'

import type { MarketData } from 'app/web3/market/types'
import { useObjectMemo } from 'app/hooks/useValues'
import { useRequestControllers } from 'store/contract/uiPool/walletBalances'
import type { WalletBalancesUseRequestController } from 'store/contract/uiPool/walletBalances/utils/requestSliceHelper'
import { useMarket } from 'domains'
import { safeGet } from 'utils/get'

type UseRequestController = WalletBalancesUseRequestController
type CreateUseWalletBalanceController = ReturnType<typeof createUseWalletBalanceController>

const createUseWalletBalanceController =
  (getProvider: (market: MarketData) => string, useRequestController: UseRequestController) => () => {
    const { wallet } = useVinciContract()
    const { networkAccount: account } = useWallet()
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

const useWalletBalances: Record<string, CreateUseWalletBalanceController> = {}
NFT_IDS.forEach((NFT_ID) => {
  useWalletBalances[NFT_ID] = createUseWalletBalanceController(
    (market) => safeGet(() => market.nfts[NFT_ID].LENDING_POOL_ADDRESS_PROVIDER),
    useRequestControllers[NFT_ID]
  )
})

export type UseWalletBalanceController = ReturnType<CreateUseWalletBalanceController>
export const useWalletBalanceControllers = () => {
  const walletBalanceControllers: Record<string, UseWalletBalanceController> = {}
  NFT_IDS.forEach((NFT_ID) => {
    walletBalanceControllers[NFT_ID] = useWalletBalances[NFT_ID]()
  })
  const returnValue = useObjectMemo(walletBalanceControllers)
  return returnValue
}
