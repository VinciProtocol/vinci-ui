import { useCallback, useMemo } from 'react'

import { useRequestController } from 'store/oracle'

export const useOracleController = () => {
  const { usePolling, polling, clearData } = useRequestController()
  const query = useMemo(() => ({}), [])

  usePolling(query, () => false, 5 * 60 * 1000)

  const restart = useCallback(() => {
    polling.restart(query)
  }, [polling, query])

  return {
    stop: polling.stop,
    restart,
    clearData,
  }
}

export type UseOracleController = ReturnType<typeof useOracleController>
