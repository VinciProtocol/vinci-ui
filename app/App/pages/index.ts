import { useBorrowDetail } from './borrowDetail'
import { useLockdropDeposit } from './lockdropDeposit'

export const usePages = () => {
  const borrowDetail = useBorrowDetail()
  const lockdropDeposit = useLockdropDeposit()
  return {
    borrowDetail,
    lockdropDeposit,
  }
}
