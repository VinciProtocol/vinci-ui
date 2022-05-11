import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import Card from './Card'
import NFTLockdropRewards from './NFTLockdropRewards'

const NFTLockdrop: FC = () => {
  const Content = useMemoEmpty(() =>
    styled(Container)(() => ({
      minHeight: 'calc(100vh - 256px)',
    }))
  )

  return (
    <Content>
      <Stack spacing={2}>
        <Card />
        <NFTLockdropRewards />
      </Stack>
    </Content>
  )
}

export default NFTLockdrop
