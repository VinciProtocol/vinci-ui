import { useMemo } from 'react'

import { useAppSelector } from 'store'

import { selectData } from '..'

export const useTimeLockedTables = () => {
  const data = useAppSelector(selectData)

  const timeLockedTables = useMemo(() => {
    if (!data) return [] as undefined
    return data
  }, [data])

  return timeLockedTables
}
