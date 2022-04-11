import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { useWallet } from 'app/wallet'

import ChainDialogCloseIconButton from './ChainDialogCloseIconButton'
import ChainDialogTitle from './ChainDialogTitle'
import ChainDialogContent from './ChainDialogContent'

const ChainDialog: FC = () => {
  const {
    chainDialog: { visible, close },
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
        <ChainDialogCloseIconButton />
        <ChainDialogTitle />
        <ChainDialogContent />
      </ROOT>
    </Dialog>
  )
}

export default ChainDialog
