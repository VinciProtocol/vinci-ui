import type { FC } from 'react'
import Dialog from '@mui/material/Dialog'

import { ROOT } from 'app/Dialogs/styles'
import { useWallet } from 'app/wallet'

import ConnectDialogCloseIconButton from './ConnectDialogCloseIconButton'
import ConnectDialogTitle from './ConnectDialogTitle'
import ConnectDialogContent from './ConnectDialogContent'

const ConnectDialog: FC = () => {
  const {
    connectDialog: { visible, close },
  } = useWallet()

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
