import { useCallback, useMemo } from 'react'

import { useRequestController } from 'store/thegraph/nftToken/countTables'

export const useCountTablesController = () => {
  const { usePolling, polling, clearData } = useRequestController()
  const query = useMemo(() => ({}), [])

  usePolling(query, () => false, 60 * 1000)

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
