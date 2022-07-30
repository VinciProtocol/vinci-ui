import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { RESPONSIVE_DESIGN } from 'styles/constants'
import GoBack from 'components/btn/GoBack'

import FloorPriceTrends from './FloorPriceTrends'
import NFTInfo from './NFTInfo'
import UpdateHistory from './UpdateHistory'

const NFTOracleDetail: FC = () => {
  const Content = useMemoEmpty(() =>
    styled(Container)(({ theme }) => ({
      minHeight: 'calc(100vh - 256px)',
      paddingTop: theme.spacing(4),
    }))
  )
  const Header = useMemoEmpty(
    () =>
      styled(Stack)`
        display: flex;
      `
  )
  return (
    <Content>
      <Stack spacing={2}>
        <GoBack url={{ pathname: '/nft-oracle' }} />
        <Header spacing={2} direction="row" sx={RESPONSIVE_DESIGN.display.GTSM('flex')}>
          <NFTInfo />
          <FloorPriceTrends />
        </Header>
        <Stack spacing={2} sx={RESPONSIVE_DESIGN.display.LESM('flex')}>
          <NFTInfo />
          <FloorPriceTrends />
        </Stack>
        <UpdateHistory />
      </Stack>
    </Content>
  )
}

export default NFTOracleDetail
