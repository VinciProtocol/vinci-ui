import type { FC } from 'react'
import Dialog from '@mui/material/Dialog'

import { useDialogs } from 'domains'
import { ROOT } from 'app/Dialogs/styles'
import BorrowDialogCloseIconButton from './BorrowDialogCloseIconButton'
import BorrowDialogTitle from './BorrowDialogTitle'
import BorrowDialogContent from './BorrowDialogContent'

const BorrowDialog: FC = () => {
  const {
    borrow: { visible, close },
  } = useDialogs()

  return (
    <Dialog onClose={close} open={visible}>
      <ROOT>
        <BorrowDialogCloseIconButton />
        <BorrowDialogTitle />
        <BorrowDialogContent />
      </ROOT>
    </Dialog>
  )
}

export default BorrowDialog
