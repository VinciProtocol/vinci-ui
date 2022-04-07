import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { useWallet } from 'app/wallet'

import ConnectDialogCloseIconButton from './ConnectDialogCloseIconButton'
import ConnectDialogTitle from './ConnectDialogTitle'
import ConnectDialogContent from './ConnectDialogContent'

const ConnectDialog: FC = () => {
  const {
    connectDialog: { visible, close },
  } = useWallet()
  const ROOT = useMemoEmpty(() =>
    styled('div')(({ theme }) => ({
      position: 'relative',
      width: theme.spacing(60),
    }))
  )

  return (
    <Dialog onClose={close} open={visible}>
      <ROOT>
        <ConnectDialogCloseIconButton />
        <ConnectDialogTitle />
        <ConnectDialogContent />
      </ROOT>
    </Dialog>
  )
}

export default ConnectDialog
