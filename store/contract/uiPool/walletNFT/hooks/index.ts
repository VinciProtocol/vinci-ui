import { useAppSelector } from 'store'

import { selectData } from '..'

export const useWalletNFTData = () => {
  const data = useAppSelector(selectData)
  return data
}
