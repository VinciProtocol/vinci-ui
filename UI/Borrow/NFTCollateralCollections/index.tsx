import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import SearchTable from 'lib/table/SearchTable'
import { useNFTCollateralCollections } from './useNFTCollateralCollections'
import type { NFTCollateralCollectionsProps } from './types'

const NFTCollateralCollections: FC<NFTCollateralCollectionsProps> = () => {
  const { table } = useNFTCollateralCollections()
  const ROOT = useMemoEmpty(
    () => styled(Paper)`
      .ReactVirtualized__Table__row:hover {
        cursor: pointer;
      }
    `
  )

  return (
    <ROOT variant="card">
      <SearchTable {...table} />
    </ROOT>
  )
}

export default NFTCollateralCollections
