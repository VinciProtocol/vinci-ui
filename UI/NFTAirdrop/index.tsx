import type { FC } from 'react'
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

const NFTAirdrop: FC = () => {
  const Content = useMemoEmpty(() =>
    styled(Container)(({ theme }) => ({
      paddingTop: theme.spacing(8),
    }))
  )
  const { t } = useTranslation('nft-airdrop')

  return (
    <Content>
      <Paper variant="card">
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
