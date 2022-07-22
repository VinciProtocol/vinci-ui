import { useEffect } from 'react'
import { useRequestController } from 'store/thegraph/oracle'

export const useOracleRecordsController = () => {
  const { single, clearData } = useRequestController()

  useEffect(() => {
    single.run({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    stop: single.stop,
    restart: () => single.run({}),
    clearData,
  }
}

export type UseOracleRecordsController = ReturnType<typeof useOracleRecordsController>
