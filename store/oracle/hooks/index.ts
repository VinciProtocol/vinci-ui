import { useAppSelector } from 'store'

import { selectData } from '..'

export const useOracle = () => {
  const data = useAppSelector(selectData)

  return data
}
