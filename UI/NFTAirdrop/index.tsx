import type { FC } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { Title } from 'components/Styled'

import EligibilityResult from './EligibilityResult'
import EligibilityCriteria from './EligibilityCriteria'
import { useWallet } from 'app/wallet'
import { ChainId } from 'app/web3/chain/types'

const NFTAirdrop: FC = () => {
  const Content = useMemoEmpty(() =>
    styled(Container)(({ theme }) => ({
      paddingTop: theme.spacing(8),
      display: 'flex',
      justifyContent: 'center',
    }))
  )
  const { t } = useTranslation('nft-airdrop')
  const { chainId } = useWallet()
  const router = useRouter()

  useEffect(() => {
    if (chainId !== ChainId.ethereum) {
      router.push({
        pathname: '/dashboard',
      })
    }
  }, [chainId, router])

  return (
    <Content>
      <Paper variant="card" sx={{ maxWidth: 800 }}>
        <CardContent>
          <Stack spacing={2}>
            <Title>{t('title')}</Title>
            <EligibilityResult />
            <EligibilityCriteria />
          </Stack>
        </CardContent>
      </Paper>
    </Content>
  )
}

export default NFTAirdrop
