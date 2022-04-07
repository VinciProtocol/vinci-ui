import { useCallback, useMemo } from 'react'
import { useMarket } from 'domains'

import { useContract } from 'domains/contract'
import { useRequestController } from 'store/contract/uiPool/reservesDataFromAllPools'

export const useReservesDataController = () => {
  const { uiPool } = useContract()
  const { usePolling, polling, clearData } = useRequestController()
  const { market } = useMarket()
  const query = useMemo(
    () => ({
      registry: market.addresses.LENDING_POOL_ADDRESSES_PROVIDER_REGISTRY,
      uiPool,
    }),
    [market.addresses.LENDING_POOL_ADDRESSES_PROVIDER_REGISTRY, uiPool]
  )

  usePolling(query, (query) => !query || !query.registry || !query.uiPool, 60 * 1000)

  const restart = useCallback(() => {
    polling.restart(query)
  }, [polling, query])

  return {
    stop: polling.stop,
    restart,
    clearData,
  }
}

export type UseReservesDataController = ReturnType<typeof useReservesDataController>
