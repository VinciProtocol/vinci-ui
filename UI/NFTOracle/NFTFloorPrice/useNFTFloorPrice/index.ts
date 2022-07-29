import { useTable } from './useTable'

export const useNFTFloorPrice = () => {
  const table = useTable()

  return {
    table,
  }
}
