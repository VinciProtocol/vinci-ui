import { useBorrowDetail } from './borrowDetail'

export const usePages = () => {
  const borrowDetail = useBorrowDetail()
  return {
    borrowDetail,
  }
}
