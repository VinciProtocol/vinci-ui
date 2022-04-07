import { useMemo } from 'react'
import { useRouter } from 'next/router'

import { TabValue } from 'app/Dialogs/constants'
import { useContractData } from 'domains'

import { getUseDialog } from './adapter'
import { createContext } from 'utils/createContext'

const useBorrowDialog = getUseDialog({
  list: [TabValue.borrow, TabValue.repay],
})

const useDepositDialog = getUseDialog({
  list: [TabValue.deposit, TabValue.withdraw],
})

const useDialogsService = () => {
  const router = useRouter()
  const { generalAssets } = useContractData()

  const deposit = useDepositDialog(generalAssets)
  const borrow = useBorrowDialog(generalAssets)

  const actions = useMemo(
    () => ({
      depositDialogOpen: deposit.open,
      borrowDialogOpen: borrow.open,
      nftDetailsDialogOpen: (type: any, row: any) => {
        router.push({
          pathname: '/borrow/[id]',
          query: { id: row.underlyingAsset },
        })
      },
    }),
    [deposit.open, borrow.open, router]
  )

  return {
    deposit,
    borrow,
    actions,
  }
}

const { Provider, createUseContext } = createContext(useDialogsService)

export default Provider
export const createDialogsContext = createUseContext
