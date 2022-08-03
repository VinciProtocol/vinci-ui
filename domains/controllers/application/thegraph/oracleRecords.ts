import { useMarket } from 'domains'
import { useCallback, useEffect, useMemo } from 'react'
import { useRequestController } from 'store/thegraph/oracle'
import { safeGet } from 'utils/get'

export const useOracleRecordsController = () => {
  const { single, clearData } = useRequestController()
  const { market } = useMarket()

  const query = useMemo(() => {
    const oracleRecords = safeGet(() => market.thegraph.oracleRecords)
    if (!oracleRecords) return
    return {
      thegraph: oracleRecords,
    }
  }, [market.thegraph.oracleRecords])

  useEffect(() => {
    if (!query) return
    single.run(query)
    return () => {
      single.stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const restart = useCallback(
    () => () => single.run(query),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query]
  )

  return {
    stop: single.stop,
    restart,
    clearData,
  }
}

export type UseOracleRecordsController = ReturnType<typeof useOracleRecordsController>
