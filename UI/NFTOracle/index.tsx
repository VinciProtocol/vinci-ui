import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import Banner from './Banner'
import OracleCards from './OracleCards'
import NFTFloorPrice from './NFTFloorPrice'

const NFTOracle: FC = () => {
  const Content = useMemoEmpty(() =>
    styled(Container)(() => ({
      minHeight: 'calc(100vh - 256px)',
    }))
  )

  return (
    <Content>
      <Stack spacing={2}>
        <Banner />
        <OracleCards />
        <NFTFloorPrice />
      </Stack>
    </Content>
  )
}

export default NFTOracle
