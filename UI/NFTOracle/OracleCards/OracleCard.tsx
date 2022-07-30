import type { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import type { OracleCardProps } from './types'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const OracleCard: FC<OracleCardProps> = ({ learnMoreUrl, title, subTitle, icon }) => {
  const { t } = useTranslation('nft-oracle')
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  const Title = useMemoEmpty(() =>
    styled('div')(({ theme }) => ({
      color: theme.palette.text.secondary,
      fontWeight: 'normal',
    }))
  )
  const ROOT = useMemoEmpty(
    () => styled(Card)`
      flex: 1;
    `
  )

  return (
    <ROOT variant="card" sx={{ maxWidth: matches ? '50%' : '100%' }}>
      <CardContent>
        <Stack spacing={2}>
          {icon}
          <Title>
            <Stack spacing={1} style={{ minHeight: matches ? '80px' : '0' }}>
              <Typography variant="subtitle2" color="text.primary" textTransform="uppercase" fontWeight="bold">
                {title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {subTitle}
              </Typography>
            </Stack>
          </Title>
          <Button variant="outlined" style={{ width: '120px' }} href={learnMoreUrl} target="_blank">
            {t('common:components.learnMore')}
          </Button>
        </Stack>
      </CardContent>
    </ROOT>
  )
}

export default OracleCard
