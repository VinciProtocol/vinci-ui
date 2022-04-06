import type { FC } from 'react'

import { DialogCloseIconButton } from 'components/IconButton'
import { useDialogs } from 'domains'

const BorrowDialogCloseIconButton: FC = () => {
  const {
    borrow: { close },
  } = useDialogs()

  return <DialogCloseIconButton onClick={close} />
}

export default BorrowDialogCloseIconButton
