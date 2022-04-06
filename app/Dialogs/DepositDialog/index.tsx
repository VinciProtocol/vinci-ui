import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { useDialogs } from 'domains'
import DepositDialogCloseIconButton from './DepositDialogCloseIconButton'
import DepositDialogTitle from './DepositDialogTitle'
import DepositDialogContent from './DepositDialogContent'

const DepositDialog: FC = () => {
  const {
    deposit: { visible, close },
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
        <DepositDialogCloseIconButton />
        <DepositDialogTitle />
        <DepositDialogContent />
      </ROOT>
    </Dialog>
  )
}

export default DepositDialog
