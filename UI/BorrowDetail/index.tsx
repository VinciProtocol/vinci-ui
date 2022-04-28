import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { RESPONSIVE_DESIGN } from 'styles/constants'

import GoBack from './GoBack'
import NFTBorrowPool from './NFTBorrowPool'
import NFTInfo from './NFTInfo'

const BorrowDetail: FC = () => {
  const Content = useMemoEmpty(() =>
    styled(Container)(({ theme }) => ({
      minHeight: 'calc(100vh - 256px)',
      paddingTop: theme.spacing(4),
    }))
  )

  return (
    <Content>
      <Stack spacing={2}>
        <GoBack />
        <Grid container spacing={2} sx={RESPONSIVE_DESIGN.display.GTSM('flex')}>
          <Grid item xs={8}>
            <NFTBorrowPool />
          </Grid>
          <Grid item xs={4}>
            <NFTInfo />
          </Grid>
        </Grid>
        <Stack spacing={2} sx={RESPONSIVE_DESIGN.display.LESM('flex')}>
          <NFTInfo />
          <NFTBorrowPool />
        </Stack>
      </Stack>
    </Content>
  )
}

export default BorrowDetail
