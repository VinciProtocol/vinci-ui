import type { FC } from 'react'

import { useDialogs } from 'domains'
import SymbolDialogTitle from '../components/SymbolDialogTitle'

const BorrowDialogTitle: FC = () => {
  const {
    borrow: { row },
  } = useDialogs()

  return <SymbolDialogTitle row={row} />
}

export default BorrowDialogTitle
