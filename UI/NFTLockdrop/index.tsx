import type { FC } from 'react'
import { useMemo, Fragment } from 'react'
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import PageTitle from 'UI/Layout/components/PageTitle'
import Card from './Card'
import NFTLockdropRewards from './NFTLockdropRewards'

const NFTLockdrop: FC = () => {
  const Content = useMemoEmpty(() =>
    styled(Container)(() => ({
      minHeight: 'calc(100vh - 256px)',
    }))
  )
  const { t } = useTranslation()
  const subTitle = useMemo(() => {
    return (
      <Fragment>
        <span>{t('nft-lockdrop:subTitle')}</span>
        <Link href="https://medium.com/@vinciprotocol/launching-nft-lockdrop-with-26-000-000-vci-reward-78be1535da5e">
          {t('components.learnMore')}
        </Link>
      </Fragment>
    )
  }, [t])

  return (
    <Content>
      <Stack spacing={2}>
        <PageTitle title={t('nft-lockdrop:title')} subTitle={subTitle} />
        <Card />
        <NFTLockdropRewards />
      </Stack>
    </Content>
  )
}

export default NFTLockdrop
