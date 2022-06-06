import { createAsyncThunk } from '@reduxjs/toolkit'
import { createRequestSlice, createRequestSliceState } from 'store/helpers/slice'

import type { WalletNFT, WalletNFTProps } from '../adapter/request'
import { useWalletNFT } from '../adapter/request'

export const requestSliceHelper = (NFT_ID: string) => {
  const key = `contract.uiPool.walletNFT.${NFT_ID}`
  const request = createAsyncThunk(`${key}/request`, (args: WalletNFTProps) => useWalletNFT(args))

  const { reducer, selectData, useRequestController } = createRequestSlice(
    key,
    createRequestSliceState<WalletNFT>(),
    request
  )

  const returnValue = { reducer, selectData, useRequestController }
  return returnValue
}
type RequestSliceHelper = ReturnType<typeof requestSliceHelper>
export type WalletNFTReducer = RequestSliceHelper['reducer']
export type WalletNFTSelectData = RequestSliceHelper['selectData']
export type WalletNFTUseRequestController = RequestSliceHelper['useRequestController']
