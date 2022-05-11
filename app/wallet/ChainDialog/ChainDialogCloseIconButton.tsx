import type { FC } from 'react'

import { DialogCloseIconButton } from 'components/btn/IconButton'

import { useWallet } from 'app/wallet'

const ChainDialogCloseIconButton: FC = () => {
  const {
    chainDialog: { close },
  } = useWallet()

  return <DialogCloseIconButton onClick={close} />
}

export default ChainDialogCloseIconButton
