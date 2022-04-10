import { NFT_ID_1, NFT_ID_2, NFT_ID_3 } from 'app/web3/market'
import { useMemo } from 'react'

import { useAppSelector } from 'store'

import { selectData as select1 } from '../1'
import { selectData as select2 } from '../2'
import { selectData as select3 } from '../3'
import type { WalletBalancesData } from '../adapter/walletBalanceAdapter'
import { getWalletBalancesData } from '../adapter/walletBalanceAdapter'

type WalletBalance = WalletBalancesData[]
export const useWalletBalanceData = () => {
  const data1 = useAppSelector(select1)
  const data2 = useAppSelector(select2)
  const data3 = useAppSelector(select3)

  const walletData: WalletBalance = useMemo(() => {
    return [
      getWalletBalancesData(NFT_ID_1, data1),
      getWalletBalancesData(NFT_ID_2, data2),
      getWalletBalancesData(NFT_ID_3, data3),
    ]
  }, [data1, data2, data3])

  return walletData
}
