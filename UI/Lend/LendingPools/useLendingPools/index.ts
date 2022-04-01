import { useTable } from './useTable'

export const useLendingPools = () => {
  const table = useTable()

  return {
    table,
  }
}
