import { useState, useCallback } from 'react'

import { usePost } from 'app/hooks/request'
import { useSendTransaction } from 'app/web3/hooks/sendTransaction'
import type { LendingPoolContract } from 'lib/protocol/lending-pool'
import { useContract } from 'domains/contract'
import { TransactionStatus, transaction } from '../adapter/transaction'

type PropsType<T> = T extends (props: infer P) => any ? P : any
const createLendingPoolUse =
  <K extends keyof LendingPoolContract, F extends LendingPoolContract[K], P extends PropsType<F>>(key: K) =>
  (lendingPool: LendingPoolContract) => {
    const [status, setStatus] = useState<TransactionStatus>(TransactionStatus.init)
    const sendTransaction = useSendTransaction()

    const fn = useCallback(
      (props: P) => {
        console.log(`[domains] [LendingPool] [${key}] [req]`, props)
        return transaction({
          createTransaction: lendingPool[key](props),
          setStatus,
          sendTransaction,
          isOnlyApprove: props.isOnlyApprove,
        })
      },
      [lendingPool, sendTransaction]
    )

    const { post, cancel, loading } = usePost(fn)

    return { status, loading, post, cancel }
  }

const useDeposit = createLendingPoolUse('deposit')
const useWithdraw = createLendingPoolUse('withdraw')
const useBorrow = createLendingPoolUse('borrow')
const useRepay = createLendingPoolUse('repay')

const useDepositNFT = createLendingPoolUse('depositNFT')
const useDepositAndLockNFT = createLendingPoolUse('depositAndLockNFT')
const useWithdrawNFT = createLendingPoolUse('withdrawNFT')

export const useLendingPoolController = () => {
  const { lendingPool } = useContract()
  const deposit = useDeposit(lendingPool)
  const withdraw = useWithdraw(lendingPool)

  const borrow = useBorrow(lendingPool)
  const repay = useRepay(lendingPool)

  const depositNFT = useDepositNFT(lendingPool)
  const depositAndLockNFT = useDepositAndLockNFT(lendingPool)
  const withdrawNFT = useWithdrawNFT(lendingPool)

  return {
    deposit,
    withdraw,
    borrow,
    repay,
    depositNFT,
    depositAndLockNFT,
    withdrawNFT,
  }
}
