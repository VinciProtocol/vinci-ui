import type { FC } from 'react'

import { useDialogs } from 'domains'
import SymbolDialogTitle from '../components/SymbolDialogTitle'

const DepositDialogTitle: FC = () => {
  const {
    deposit: { row },
  } = useDialogs()

  return <SymbolDialogTitle row={row} />
}

export default DepositDialogTitle
