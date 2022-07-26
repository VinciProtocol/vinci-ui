import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { useLendingPools } from './useLendingPools'
import type { LendingPoolsProps } from './types'
import SearchTable from 'lib/table/SearchTable'

const LendingPools: FC<LendingPoolsProps> = () => {
  const { table } = useLendingPools()
  const ROOT = useMemoEmpty(() => styled(Paper)``)

  return (
    <ROOT variant="card">
      <SearchTable {...table} />
    </ROOT>
  )
}

export default LendingPools
