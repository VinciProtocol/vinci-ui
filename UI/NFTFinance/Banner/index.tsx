import type { FC } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from 'next/image'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

import background from './images/finance-background.png'
import financeImg from './images/finance-framework.svg'

const Banner: FC = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const { t } = useTranslation('nft-finance')
  const ROOT = useMemo(
    () =>
      styled(Paper)(({ theme }) => ({
        backgroundImage: `url(${background.src})`,
        backgroundRepeat: matches ? 'round' : 'unset',
        height: '260px',
        marginTop: theme.spacing(4),
      })),
    [matches]
  )
  const Content = useMemoEmpty(
    () =>
      styled('div')`
        display: flex;
        justify-content: space-between;
        height: 100%;
        ${({ theme }) => ({
          padding: theme.spacing(4),
        })}
      `
  )
  const Title = useMemoEmpty(
    () => styled(Stack)`
      max-width: 400px;
    `
  )

  return (
    <ROOT variant="card">
      <Content>
        <Title spacing={3}>
          <Typography variant="h4" color="common.white" fontWeight={600}>
            {t('banner.title')}
          </Typography>
          <Typography variant="body1" color="grey.400">
            {t('banner.subTitle')}
          </Typography>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              href="https://docs.vinci.io/nft-finance/"
              target="_blank"
              style={{ width: '120px' }}
            >
              {t('banner.startBuilding')}
            </Button>
            <Button
              variant="outlined"
              href="https://app.vinci.io/dashboard/"
              target="_blank"
              style={{ width: '150px' }}
            >
              {t('banner.market')}
            </Button>
          </Stack>
        </Title>
        {matches && <Image src={financeImg} style={{ pointerEvents: 'none' }} alt="Vinci NFT Finance" />}
      </Content>
    </ROOT>
  )
}

export default Banner
