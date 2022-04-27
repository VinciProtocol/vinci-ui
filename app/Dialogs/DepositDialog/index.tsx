import type { FC } from 'react'
import Dialog from '@mui/material/Dialog'

import { ROOT } from 'app/Dialogs/styles'
import { useDialogs } from 'domains'
import DepositDialogCloseIconButton from './DepositDialogCloseIconButton'
import DepositDialogTitle from './DepositDialogTitle'
import DepositDialogContent from './DepositDialogContent'

const DepositDialog: FC = () => {
  const {
    deposit: { visible, close },
  } = useDialogs()

  return (
    <Dialog onClose={close} open={visible}>
      <ROOT>
        <DepositDialogCloseIconButton />
        <DepositDialogTitle />
        <DepositDialogContent />
      </ROOT>
    </Dialog>
  )
}

export default DepositDialog
