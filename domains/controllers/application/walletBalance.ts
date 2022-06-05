import { useCallback, useMemo } from 'react'
import { useWallet } from 'app/wallet'
import { useContract } from 'domains/contract'
import {
  NFT_ID_1,
  NFT_ID_2,
  NFT_ID_3,
  NFT_ID_4,
  NFT_ID_5,
  NFT_ID_6,
  NFT_ID_7,
  NFT_ID_8,
  NFT_ID_9,
  NFT_ID_10,
} from 'app/web3/market'

import { useRequestController as useRequestController1 } from 'store/contract/uiPool/walletBalances/1'
import { useRequestController as useRequestController2 } from 'store/contract/uiPool/walletBalances/2'
import { useRequestController as useRequestController3 } from 'store/contract/uiPool/walletBalances/3'
import { useRequestController as useRequestController4 } from 'store/contract/uiPool/walletBalances/4'
import { useRequestController as useRequestController5 } from 'store/contract/uiPool/walletBalances/5'
import { useRequestController as useRequestController6 } from 'store/contract/uiPool/walletBalances/6'
import type { MarketData } from 'app/web3/market/types'
import { useMarket } from 'domains'
import { safeGet } from 'utils/get'

type UseRequestController = typeof useRequestController1

const createUseWalletBalanceController =
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

export const useWalletBalanceController1 = createUseWalletBalanceController(
  (market) => safeGet(() => market.nfts[NFT_ID_1].LENDING_POOL_ADDRESS_PROVIDER),
  useRequestController1
)

export const useWalletBalanceController2 = createUseWalletBalanceController(
  (market) => safeGet(() => market.nfts[NFT_ID_2].LENDING_POOL_ADDRESS_PROVIDER),
  useRequestController2
)

export const useWalletBalanceController3 = createUseWalletBalanceController(
  (market) => safeGet(() => market.nfts[NFT_ID_3].LENDING_POOL_ADDRESS_PROVIDER),
  useRequestController3
)

export const useWalletBalanceController4 = createUseWalletBalanceController(
  (market) => safeGet(() => market.nfts[NFT_ID_4].LENDING_POOL_ADDRESS_PROVIDER),
  useRequestController4
)

export const useWalletBalanceController5 = createUseWalletBalanceController(
  (market) => safeGet(() => market.nfts[NFT_ID_5].LENDING_POOL_ADDRESS_PROVIDER),
  useRequestController5
)
export const useWalletBalanceController6 = createUseWalletBalanceController(
  (market) => safeGet(() => market.nfts[NFT_ID_6].LENDING_POOL_ADDRESS_PROVIDER),
  useRequestController6
)
export const useWalletBalanceController7 = createUseWalletBalanceController(
  (market) => safeGet(() => market.nfts[NFT_ID_7].LENDING_POOL_ADDRESS_PROVIDER),
  useRequestController6
)
export const useWalletBalanceController8 = createUseWalletBalanceController(
  (market) => safeGet(() => market.nfts[NFT_ID_8].LENDING_POOL_ADDRESS_PROVIDER),
  useRequestController6
)
export const useWalletBalanceController9 = createUseWalletBalanceController(
  (market) => safeGet(() => market.nfts[NFT_ID_9].LENDING_POOL_ADDRESS_PROVIDER),
  useRequestController6
)
export const useWalletBalanceController10 = createUseWalletBalanceController(
  (market) => safeGet(() => market.nfts[NFT_ID_10].LENDING_POOL_ADDRESS_PROVIDER),
  useRequestController6
)

export type UseWalletBalanceController = ReturnType<ReturnType<typeof createUseWalletBalanceController>>
