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
import { useRequestController as useRequestController1 } from 'store/contract/uiPool/walletNFT/1'
import { useRequestController as useRequestController2 } from 'store/contract/uiPool/walletNFT/2'
import { useRequestController as useRequestController3 } from 'store/contract/uiPool/walletNFT/3'
import { useRequestController as useRequestController4 } from 'store/contract/uiPool/walletNFT/4'
import { useRequestController as useRequestController5 } from 'store/contract/uiPool/walletNFT/5'
import { useRequestController as useRequestController6 } from 'store/contract/uiPool/walletNFT/6'
import { useMarket } from 'domains'
import type { MarketData } from 'app/web3/market/types'
import { safeGet } from 'utils/get'

type UseRequestController = typeof useRequestController1

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

export const useWalletNFTController1 = createUseWalletNFTController(
  (market) => safeGet(() => market.nfts[NFT_ID_1].LENDING_POOL_ADDRESS_PROVIDER),
  useRequestController1
)

export const useWalletNFTController2 = createUseWalletNFTController(
  (market) => safeGet(() => market.nfts[NFT_ID_2].LENDING_POOL_ADDRESS_PROVIDER),
  useRequestController2
)

export const useWalletNFTController3 = createUseWalletNFTController(
  (market) => safeGet(() => market.nfts[NFT_ID_3].LENDING_POOL_ADDRESS_PROVIDER),
  useRequestController3
)

export const useWalletNFTController4 = createUseWalletNFTController(
  (market) => safeGet(() => market.nfts[NFT_ID_4].LENDING_POOL_ADDRESS_PROVIDER),
  useRequestController4
)

export const useWalletNFTController5 = createUseWalletNFTController(
  (market) => safeGet(() => market.nfts[NFT_ID_5].LENDING_POOL_ADDRESS_PROVIDER),
  useRequestController5
)

export const useWalletNFTController6 = createUseWalletNFTController(
  (market) => safeGet(() => market.nfts[NFT_ID_6].LENDING_POOL_ADDRESS_PROVIDER),
  useRequestController6
)
export const useWalletNFTController7 = createUseWalletNFTController(
  (market) => safeGet(() => market.nfts[NFT_ID_7].LENDING_POOL_ADDRESS_PROVIDER),
  useRequestController6
)
export const useWalletNFTController8 = createUseWalletNFTController(
  (market) => safeGet(() => market.nfts[NFT_ID_8].LENDING_POOL_ADDRESS_PROVIDER),
  useRequestController6
)
export const useWalletNFTController9 = createUseWalletNFTController(
  (market) => safeGet(() => market.nfts[NFT_ID_9].LENDING_POOL_ADDRESS_PROVIDER),
  useRequestController6
)
export const useWalletNFTController10 = createUseWalletNFTController(
  (market) => safeGet(() => market.nfts[NFT_ID_10].LENDING_POOL_ADDRESS_PROVIDER),
  useRequestController6
)

export type UseWalletNFTController = ReturnType<ReturnType<typeof createUseWalletNFTController>>
