import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import TVL from './TVL'
import LendingPools from './LendingPools'

const Lend: FC = () => {
  const Content = useMemoEmpty(() =>
    styled(Container)(() => ({
      minHeight: 'calc(100vh - 256px)',
    }))
  )

  return (
    <Content>
      <Stack spacing={2}>
        <TVL />
        <LendingPools />
      </Stack>
    </Content>
  )
}

export default Lend
