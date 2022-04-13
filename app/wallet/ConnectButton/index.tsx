import type { FC } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '@mui/material/Button'

import Account from '../Account'
import { useConnectButton } from './useConnectButton'

export const ConnectButton: FC = () => {
  const { status } = useConnectButton()

  const content = useMemo(() => {
    switch (status) {
      case 'connected':
        return <WalletConnected />
      case 'disconnected':
        return <WalletDisconnected />
      case 'error':
        return <WalletConnected />
      case 'connecting':
        return <WalletConnecting />
    }
  }, [status])

  return content || null
}

const WalletConnected: FC = () => {
  const { open } = useConnectButton()
  return (
    <Button key="wallet-btn" variant="linear" onClick={open}>
      <Account />
    </Button>
  )
}

const WalletDisconnected: FC = () => {
  const { t } = useTranslation()
  const { open } = useConnectButton()
  return (
    <Button key="wallet-btn" variant="linear" onClick={open}>
      {t('wallet.disconnected.title')}
    </Button>
  )
}

const WalletConnecting: FC = () => {
  const { t } = useTranslation()
  const { open } = useConnectButton()
  return (
    <Button key="wallet-btn" variant="linear" onClick={open}>
      {t('wallet.connecting.title')}
    </Button>
  )
}

export default ConnectButton
