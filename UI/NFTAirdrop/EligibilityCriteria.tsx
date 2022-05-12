import type { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { SubTitle } from 'components/Styled'

const EligibilityCriteria: FC = () => {
  const ROOT = useMemoEmpty(() => styled(Stack)``)
  const Title = useMemoEmpty(() =>
    styled(Typography)(({ theme }) => ({
      ...theme.typography.h6,
    }))
  )
  const { t } = useTranslation('nft-airdrop')

  return (
    <ROOT spacing={2}>
      <Title>{t('criteria.title')}</Title>
      <Stack spacing={1}>
        <SubTitle>{t('criteria.subTitle.1')}</SubTitle>
        <SubTitle>{t('criteria.subTitle.2')}</SubTitle>
      </Stack>
      <CardActions>
        <Button variant="outlined">{t('criteria.btn.learnMore')}</Button>
      </CardActions>
    </ROOT>
  )
}

export default EligibilityCriteria
