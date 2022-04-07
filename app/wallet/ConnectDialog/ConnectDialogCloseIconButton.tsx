import type { FC } from 'react'

import { DialogCloseIconButton } from 'components/IconButton'

import { useWallet } from 'app/wallet'

const ConnectDialogCloseIconButton: FC = () => {
  const {
    connectDialog: { close },
  } = useWallet()

  return <DialogCloseIconButton onClick={close} />
}

export default ConnectDialogCloseIconButton
