import type { FC } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '@mui/material/Button'
import ChainErrorIcon from '@mui/icons-material/PowerOffTwoTone'
import ChainIcon from '../ChainIcon'

import { useChainButton } from './useChainButton'

export const ChainButton: FC = () => {
  const { t } = useTranslation()
  const { network, open } = useChainButton()

  const content = useMemo(() => {
    if (!network)
      return (
        <Button key="chain-btn" variant="transOutlined" color="error" startIcon={<ChainErrorIcon />} onClick={open}>
          {t(`wallet.error.ChainUnknownError`)}
        </Button>
      )
    return (
      <Button key="chain-btn" variant="transOutlined" startIcon={<ChainIcon chainName={network.name} />} onClick={open}>
        {network.fullName}
      </Button>
    )
  }, [network, open, t])

  return content || null
}

export default ChainButton
