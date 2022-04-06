import { NFT_ID_3 } from 'app/web3/market'
import { useMemo } from 'react'

import { useAppSelector } from 'store'

import { selectData as select1 } from '../1'
// import { selectData as select2 } from '../2'
import type { WalletBalancesData } from '../adapter/walletBalanceAdapter'
import { getWalletBalancesData } from '../adapter/walletBalanceAdapter'

type WalletBalance = WalletBalancesData[]
export const useWalletBalanceData = () => {
  const data1 = useAppSelector(select1)
  // const data2 = useAppSelector(select2)

  const walletData: WalletBalance = useMemo(() => {
    if (!data1) return []
    return [getWalletBalancesData(NFT_ID_3, data1)]
  }, [data1])

  return walletData
}
