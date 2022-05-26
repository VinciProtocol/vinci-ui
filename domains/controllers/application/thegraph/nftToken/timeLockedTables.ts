import { useCallback, useMemo } from 'react'

import { useWallet } from 'app/wallet'
import { useRequestController } from 'store/thegraph/nftToken/timeLockedTables'

export const useTimeLockedTablesController = () => {
  const { usePolling, polling, clearData } = useRequestController()
  const { account } = useWallet()
  const query = useMemo(
    () => ({
      account,
    }),
    [account]
  )

  usePolling(query, (query) => !query.account, 60 * 1000)

  const restart = useCallback(() => {
    polling.restart(query)
  }, [polling, query])

  return {
    stop: polling.stop,
    restart,
    clearData,
  }
}

export type UseTimeLockedTablesController = ReturnType<typeof useTimeLockedTablesController>
