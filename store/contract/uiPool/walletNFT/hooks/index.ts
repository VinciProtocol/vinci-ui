import { NFT_ID_3 } from 'app/web3/market'
import { useMemo } from 'react'
import { useAppSelector } from 'store'

import { selectData as select1 } from '../1'
// import { selectData as select2 } from '../2'

import type { WalletNFTData } from '../adapter/walletNFTAdapter'
import { getWalletNFTData } from '../adapter/walletNFTAdapter'

type WalletNFT = WalletNFTData[]
export const useWalletNFTData = () => {
  const data1 = useAppSelector(select1)
  // const data2 = useAppSelector(select2)

  const walletData: WalletNFT = useMemo(() => {
    if (!data1) return []
    return [getWalletNFTData(NFT_ID_3, data1)]
  }, [data1])

  return walletData
}
