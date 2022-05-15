import type { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useWallet } from 'app/wallet'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { SubTitle } from 'components/Styled'
import RingLoading from 'components/loading/RingLoading'
import NFTCard from 'components/nft/NFTCard'
import { textCenterEllipsis } from 'utils/string/text-center-ellipsis'

import { useEligibilityResult } from './useEligibilityResult'
import NFTImage from './images/vinci NFT.jpg'

const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
}))

const EligibilityResult: FC = () => {
  const { status } = useEligibilityResult()

  switch (status) {
    case 'loading':
      return <LoadingResult />
    case 'eligible':
      return <Eligibility />
    case 'notEligible':
      return <NotEligibility />
  }
}

const LoadingResult: FC = () => {
  const ROOT = useMemoEmpty(
    () => styled('div')`
      text-align: center;
    `
  )
  const Loading = useMemoEmpty(() =>
    styled('div')(({ theme }) => ({
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(8),
    }))
  )
  const { t } = useTranslation('nft-airdrop')
  return (
    <ROOT>
      <Title>{t('loading.title')}</Title>
      <Loading>
        <RingLoading />
      </Loading>
    </ROOT>
  )
}

const Eligibility: FC = () => {
  const { t } = useTranslation('nft-airdrop')
  const { account } = useWallet()
  const ROOT = useMemoEmpty(
    () => styled(Stack)`
      text-align: center;
    `
  )
  const NFT = useMemoEmpty(
    () => styled('div')`
      display: flex;
      justify-content: center;
    `
  )
  return (
    <ROOT spacing={2}>
      <Title>{t('eligible.title')}</Title>
      <SubTitle>{t('eligible.subTitle')}</SubTitle>
      <SubTitle>
        {textCenterEllipsis(account)} {t('eligible.willReceive')}
      </SubTitle>
      <NFT>
        <NFTCard
          image={NFTImage.src}
          description="Leonardo da Vinci NFT"
          action={{
            onClick: () => {},
            name: t('eligible.NFT.actions.comingSoon'),
            disabled: true,
          }}
        />
      </NFT>
    </ROOT>
  )
}

const NotEligibility: FC = () => {
  const { t } = useTranslation('nft-airdrop')
  const ROOT = useMemoEmpty(
    () => styled(Stack)`
      text-align: center;
    `
  )
  const NFT = useMemoEmpty(
    () => styled('div')`
      display: flex;
      justify-content: center;
    `
  )
  return (
    <ROOT spacing={2}>
      <Title>{t('notEligible.title')}</Title>
      <SubTitle>{t('notEligible.subTitle.1')}</SubTitle>
      <SubTitle>{t('notEligible.subTitle.2')}</SubTitle>
      <NFT>
        <NFTCard
          image={NFTImage.src}
          description="Leonardo da Vinci NFT"
          action={{
            onClick: () => {},
            name: t('eligible.NFT.actions.comingSoon'),
            disabled: true,
          }}
        />
      </NFT>
    </ROOT>
  )
}

export default EligibilityResult
