import { useTable } from './useTable'

export const useNFTCollateralCollections = () => {
  const table = useTable()

  return {
    table,
  }
}
