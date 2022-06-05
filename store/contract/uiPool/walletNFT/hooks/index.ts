import {
  NFT_ID_1,
  NFT_ID_2,
  NFT_ID_3,
  NFT_ID_4,
  NFT_ID_5,
  NFT_ID_6,
  NFT_ID_7,
  NFT_ID_8,
  NFT_ID_9,
  NFT_ID_10,
} from 'app/web3/market'
import { useMemo } from 'react'
import { useAppSelector } from 'store'

import { selectData as select1 } from '../1'
import { selectData as select2 } from '../2'
import { selectData as select3 } from '../3'
import { selectData as select4 } from '../4'
import { selectData as select5 } from '../5'
import { selectData as select6 } from '../6'
import { selectData as select7 } from '../7'
import { selectData as select8 } from '../8'
import { selectData as select9 } from '../9'
import { selectData as select10 } from '../10'

import type { WalletNFTData } from '../adapter/walletNFTAdapter'
import { getWalletNFTData } from '../adapter/walletNFTAdapter'

type WalletNFT = WalletNFTData[]
export const useWalletNFTData = () => {
  const data1 = useAppSelector(select1)
  const data2 = useAppSelector(select2)
  const data3 = useAppSelector(select3)
  const data4 = useAppSelector(select4)
  const data5 = useAppSelector(select5)
  const data6 = useAppSelector(select6)
  const data7 = useAppSelector(select7)
  const data8 = useAppSelector(select8)
  const data9 = useAppSelector(select9)
  const data10 = useAppSelector(select10)

  const walletData: WalletNFT = useMemo(() => {
    return [
      getWalletNFTData(NFT_ID_1, data1),
      getWalletNFTData(NFT_ID_2, data2),
      getWalletNFTData(NFT_ID_3, data3),
      getWalletNFTData(NFT_ID_4, data4),
      getWalletNFTData(NFT_ID_5, data5),
      getWalletNFTData(NFT_ID_6, data6),
      getWalletNFTData(NFT_ID_7, data7),
      getWalletNFTData(NFT_ID_8, data8),
      getWalletNFTData(NFT_ID_9, data9),
      getWalletNFTData(NFT_ID_10, data10),
    ]
  }, [data1, data2, data3, data4, data5, data6])

  return walletData
}
