import type { FC } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '@mui/material/Button'

import Account from '../Account'
import { useConnectButton } from './useConnectButton'
import { isChainUnknownError } from 'lib/wallet/utils'

export const ConnectButton: FC = () => {
  const { status } = useConnectButton()

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

const WalletError: FC = () => {
  const { t } = useTranslation()
  const { open, error, onSwitchEthereumChain } = useConnectButton()

  return (
    <>
      {isChainUnknownError(error) ? (
        <Button key="wallet-btn" variant="contained" color="error" onClick={onSwitchEthereumChain}>
          {t(`wallet.error.${error.name}`)}
        </Button>
      ) : (
        <Button key="wallet-btn" variant="linear" onClick={open}>
          {t('wallet.disconnected.title')}
        </Button>
      )}
    </>
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
// background: linear-gradient(105.3deg, #1AE2FA 12.14%, #B94AFF 93.19%);
