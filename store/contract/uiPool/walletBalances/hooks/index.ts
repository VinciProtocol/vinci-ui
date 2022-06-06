import { useMemo } from 'react'
import { useAppSelector } from 'store'

import { useObjectMemo } from 'app/hooks/useValues'
import { NFT_IDS } from 'app/web3/market'

import { selectDatas } from '..'
import type { WalletBalances } from '../adapter/request'
import type { WalletBalancesData } from '../adapter/walletBalanceAdapter'
import { getWalletBalancesData } from '../adapter/walletBalanceAdapter'

export type WalletBalance = WalletBalancesData[]
export const useWalletBalanceData = () => {
  const datas: Record<string, WalletBalances> = {}
  NFT_IDS.forEach((NFT_ID) => {
    const select = selectDatas[NFT_ID]
    // eslint-disable-next-line react-hooks/rules-of-hooks
    datas[NFT_ID] = useAppSelector(select)
  })
  const walletDatas = useObjectMemo(datas)
  const walletData = useMemo(
    () => NFT_IDS.map((NFT_ID) => getWalletBalancesData(NFT_ID, walletDatas[NFT_ID])),
    [walletDatas]
  )

  return walletData
}
