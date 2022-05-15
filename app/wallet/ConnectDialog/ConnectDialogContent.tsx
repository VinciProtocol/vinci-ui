import type { FC } from 'react'
import { useMemo } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'
import Link from '@mui/material/Link'

import RingLoading from 'components/loading/RingLoading'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { Title, Caption } from 'components/Styled'
import { useWallet } from 'app/wallet'

import MetamaskImg from './images/metamask.svg'
import WalletconnectImg from './images/wallet-connect.svg'
import Account from '../Account'

const ConnectDialogContent: FC = () => {
  const { status } = useWallet()
  const ROOT = useMemoEmpty(() =>
    styled('div')(({ theme }) => ({
      display: 'flex',
      justifyContent: 'center',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(3),
    }))
  )
  const content = useMemo(() => {
    switch (status) {
      case 'connected':
        return <WalletConnected />
      case 'disconnected':
        return <WalletDisconnected />
      case 'error':
        return <WalletError />
      case 'connecting':
        return <WalletConnecting />
    }
  }, [status])

  return (
    <DialogContent>
      <ROOT>{content}</ROOT>
    </DialogContent>
  )
}

const WalletConnected: FC = () => {
  const { t } = useTranslation()
  const { reset } = useWallet()

  const ROOT = useMemoEmpty(() => styled('div')``)
  const AccountDiv = useMemoEmpty(() =>
    styled(Title)(({ theme }) => ({
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(3),
      textAlign: 'center',
    }))
  )
  const DisconnectBtn = useMemoEmpty(() =>
    styled(Button)(({ theme }) => ({
      marginBottom: theme.spacing(3),
      width: theme.spacing(26),
    }))
  )
  return (
    <ROOT>
      <AccountDiv>
        <Account />
      </AccountDiv>
      <DisconnectBtn variant="outlined" onClick={reset}>
        {t('wallet.btn.disconnected')}
      </DisconnectBtn>
    </ROOT>
  )
}

const WalletDisconnected: FC = () => {
  const {
    connect,
    connectDialog: { close },
  } = useWallet()

  const ConnectWallet = useMemoEmpty(() =>
    styled(Button)(({ theme }) => ({
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      justifyContent: 'flex-start',
      width: '100%',
      border: `1px solid ${theme.palette.divider}`,
      padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
    }))
  )
  const ROOT = useMemoEmpty(
    () => styled('div')`
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      ${ConnectWallet} {
        .name {
          font-size: 1.1rem;
          margin-left: 16px;
        }
      }
    `
  )
  return (
    <ROOT>
      <ConnectWallet
        color="inherit"
        onClick={async () => {
          await connect()
          close()
        }}
      >
        <Image src={MetamaskImg} alt="metamask" />
        <span className="name">Metamask</span>
      </ConnectWallet>
      <ConnectWallet
        color="inherit"
        onClick={async () => {
          await connect('walletconnect')
          close()
        }}
      >
        <Image src={WalletconnectImg} alt="walletconnect" />
        <span className="name">WalletConnect</span>
      </ConnectWallet>
    </ROOT>
  )
}

const WalletError: FC = () => {
  return <WalletDisconnected />
}

const WalletConnecting: FC = () => {
  const { t } = useTranslation()
  const ROOT = useMemoEmpty(
    () => styled('div')`
      text-align: center;
    `
  )
  const Loading = useMemoEmpty(() =>
    styled('div')(({ theme }) => ({
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(8),
    }))
  )
  return (
    <ROOT>
      <Loading>
        <RingLoading />
      </Loading>
      <Caption>
        <span>{t('wallet.tips.accept')}</span>
        <Link href="#">{t('wallet.tips.term')}</Link>
      </Caption>
    </ROOT>
  )
}

export default ConnectDialogContent
