import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { useNFTFloorPrice } from './useNFTFloorPrice'
import type { NFTFloorPriceProps } from './types'
import SearchTable from 'lib/table/SearchTable'

const NFTFloorPrice: FC<NFTFloorPriceProps> = () => {
  const { table } = useNFTFloorPrice()
  const ROOT = useMemoEmpty(() => styled(Paper)``)

  return (
    <ROOT variant="card">
      <SearchTable {...table} />
    </ROOT>
  )
}

export default NFTFloorPrice
