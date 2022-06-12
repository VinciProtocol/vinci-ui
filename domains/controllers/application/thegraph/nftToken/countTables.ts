import { useCallback, useMemo } from 'react'

import { useWallet } from 'app/wallet'
import { useRequestController } from 'store/thegraph/nftToken/countTables'

export const useCountTablesController = () => {
  const { chainId } = useWallet()
  const { usePolling, polling, clearData } = useRequestController()
  const query = useMemo(
    () => ({
      chainId,
    }),
    [chainId]
  )

  usePolling(query, (query) => !query.chainId, 60 * 1000)

  const restart = useCallback(() => {
    polling.restart(query)
  }, [polling, query])

  return {
    stop: polling.stop,
    restart,
    clearData,
  }
}

export type UseCountTablesController = ReturnType<typeof useCountTablesController>
