import type { FC } from 'react'
import { styled } from '@mui/material/styles'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import BorrowDialog from 'app/Dialogs/BorrowDialog'
import DepositDialog from 'app/Dialogs/DepositDialog'
import ConnectDialog from 'app/wallet/ConnectDialog'
import fadeIn from 'utils/style/keyframes/fadeIn'

const Main: FC = ({ children }) => {
  const Main = useMemoEmpty(
    () => styled('main')`
      animation: ${fadeIn} 1s ease;
    `
  )
  return (
    <Main>
      {children}
      <ConnectDialog />
      <DepositDialog />
      <BorrowDialog />
    </Main>
  )
}

export default Main
