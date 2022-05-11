import type { FC } from 'react'

import { DialogCloseIconButton } from 'components/btn/IconButton'
import { useDialogs } from 'domains'

const DepositDialogCloseIconButton: FC = () => {
  const {
    deposit: { close },
  } = useDialogs()

  return <DialogCloseIconButton onClick={close} />
}

export default DepositDialogCloseIconButton
