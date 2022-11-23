import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import Banner from './Banner'
import FinanceCards from './FinanceCards'
import LendingMarket from './LendingMarket'

const NFTFinance: FC = () => {
  const Content = useMemoEmpty(() =>
    styled(Container)(() => ({
      minHeight: 'calc(100vh - 256px)',
    }))
  )

  return (
    <Content>
      <Stack spacing={2}>
        <Banner />
        <FinanceCards />
        <LendingMarket />
      </Stack>
    </Content>
  )
}

export default NFTFinance
