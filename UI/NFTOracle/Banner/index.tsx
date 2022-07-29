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

import oracleBackground from './images/oracle-background.png'
import oracleFramework from './images/oracle-framework.svg'

const Banner: FC = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const { t } = useTranslation('nft-oracle')
  const ROOT = useMemo(
    () =>
      styled(Paper)(({ theme }) => ({
        backgroundImage: `url(${oracleBackground.src})`,
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
      max-width: 300px;
    `
  )

  return (
    <ROOT variant="card">
      <Content>
        <Title spacing={3}>
          <Typography variant="h4" color="common.white">
            {t('banner.title')}
          </Typography>
          <Typography variant="body1" color="#C4C4C4">
            {t('banner.subTitle')}
          </Typography>
          <Button
            variant="outlined"
            href="https://docs.vinci.io/nft-price-oracle/overview"
            target="_blank"
            style={{ width: '120px' }}
          >
            {t('common:components.learnMore')}
          </Button>
        </Title>
        {matches && <Image src={oracleFramework} style={{ pointerEvents: 'none' }} alt="oracle framework" />}
      </Content>
    </ROOT>
  )
}

export default Banner
