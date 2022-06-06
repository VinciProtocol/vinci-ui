import { useMemo } from 'react'
import { useAppSelector } from 'store'

import { useObjectMemo } from 'app/hooks/useValues'
import { NFT_IDS } from 'app/web3/market'

import { selectDatas } from '..'
import type { WalletNFT } from '../adapter/request'
import type { WalletNFTData } from '../adapter/walletNFTAdapter'
import { getWalletNFTData } from '../adapter/walletNFTAdapter'

export type WalletNFTs = WalletNFTData[]
export const useWalletNFTData = () => {
  const datas: Record<string, WalletNFT> = {}
  NFT_IDS.forEach((NFT_ID) => {
    const select = selectDatas[NFT_ID]
    // eslint-disable-next-line react-hooks/rules-of-hooks
    datas[NFT_ID] = useAppSelector(select)
  })
  const walletDatas = useObjectMemo(datas)
  const walletData = useMemo(
    () => NFT_IDS.map((NFT_ID) => getWalletNFTData(NFT_ID, walletDatas[NFT_ID])),
    [walletDatas]
  )

  return walletData
}
