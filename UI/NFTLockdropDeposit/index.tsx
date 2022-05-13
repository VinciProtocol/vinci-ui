import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import GoBack from 'components/btn/GoBack'

import NFTLockdropTab from './NFTLockdropTab'

const Borrow: FC = () => {
  const Content = useMemoEmpty(() =>
    styled(Container)(({ theme }) => ({
      minHeight: 'calc(100vh - 256px)',
      paddingTop: theme.spacing(8),
    }))
  )

  return (
    <Content>
      <Stack spacing={2}>
        <GoBack url={{ pathname: '/nft-lockdrop' }} />
        <NFTLockdropTab />
      </Stack>
    </Content>
  )
}

export default Borrow