import type { FC } from 'react'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import ThemeButton from 'app/Theme/ThemeButton'
import ChainButton from 'app/wallet/ChainButton'
import ConnectButton from 'app/wallet/ConnectButton'
import LanguageMenu from 'app/i18n/components/LanguageMenu'

import NFTAirdropButton from './NFTAirdropButton'

const Actions: FC = () => {
  const ROOT = useMemoEmpty(
    () => styled(Stack)`
      min-width: 300px;
      justify-content: right;
    `
  )

  return (
    <ROOT direction="row" spacing={2}>
      <NFTAirdropButton />
      <ChainButton />
      <ConnectButton />
      <ThemeButton />
      <LanguageMenu />
    </ROOT>
  )
}

export default Actions
