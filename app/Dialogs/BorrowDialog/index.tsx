import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { useDialogs } from 'domains'
import BorrowDialogCloseIconButton from './BorrowDialogCloseIconButton'
import BorrowDialogTitle from './BorrowDialogTitle'
import BorrowDialogContent from './BorrowDialogContent'

const BorrowDialog: FC = () => {
  const {
    borrow: { visible, close },
  } = useDialogs()
  const ROOT = useMemoEmpty(() =>
    styled('div')(({ theme }) => ({
      position: 'relative',
      width: theme.spacing(60),
    }))
  )

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
