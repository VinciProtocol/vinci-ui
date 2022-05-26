import { useMemo } from 'react'

import { useAppSelector } from 'store'

import { selectData } from '..'

export const useCountTables = () => {
  const data = useAppSelector(selectData)

  const countTables = useMemo(() => {
    if (!data) return {} as undefined
    return data
  }, [data])

  return countTables
}
