import { NFT_ID_1, NFT_ID_2, NFT_ID_3, NFT_ID_4, NFT_ID_5, NFT_ID_6 } from 'app/web3/market'
import { useMemo } from 'react'

import { useAppSelector } from 'store'

import { selectData as select1 } from '../1'
import { selectData as select2 } from '../2'
import { selectData as select3 } from '../3'
import { selectData as select4 } from '../4'
import { selectData as select5 } from '../5'
import { selectData as select6 } from '../6'

import type { WalletBalancesData } from '../adapter/walletBalanceAdapter'
import { getWalletBalancesData } from '../adapter/walletBalanceAdapter'

export type WalletBalance = WalletBalancesData[]
export const useWalletBalanceData = () => {
  const data1 = useAppSelector(select1)
  const data2 = useAppSelector(select2)
  const data3 = useAppSelector(select3)
  const data4 = useAppSelector(select4)
  const data5 = useAppSelector(select5)
  const data6 = useAppSelector(select6)

  const walletData: WalletBalance = useMemo(() => {
    return [
      getWalletBalancesData(NFT_ID_1, data1),
      getWalletBalancesData(NFT_ID_2, data2),
      getWalletBalancesData(NFT_ID_3, data3),
      getWalletBalancesData(NFT_ID_4, data4),
      getWalletBalancesData(NFT_ID_5, data5),
      getWalletBalancesData(NFT_ID_6, data6),
    ]
  }, [data1, data2, data3, data4, data5, data6])

  return walletData
}
