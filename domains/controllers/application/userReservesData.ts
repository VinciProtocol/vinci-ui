import { useMemo, useCallback } from 'react'
import { useMarket } from 'domains'
import { useWallet } from 'app/wallet'

import { useRequestController } from 'store/contract/uiPool/userReservesDataFromAllPools'
import { useContract } from 'domains/contract'

export const useUserReservesDataController = () => {
  const { uiPool } = useContract()
  const { account } = useWallet()
  const { usePolling, polling, clearData } = useRequestController()
  const { market } = useMarket()
  const query = useMemo(
    () => ({
      registry: market.addresses.LENDING_POOL_ADDRESSES_PROVIDER_REGISTRY,
      uiPool,
      user: account,
    }),
    [account, market.addresses.LENDING_POOL_ADDRESSES_PROVIDER_REGISTRY, uiPool]
  )

  usePolling(query, (query) => !query || !query.user || !query.registry || !query.uiPool, 5 * 1000)

  const restart = useCallback(() => {
    polling.restart(query)
  }, [polling, query])

  return {
    stop: polling.stop,
    restart,
    clearData,
  }
}

export type UseUserReservesDataController = ReturnType<typeof useUserReservesDataController>
