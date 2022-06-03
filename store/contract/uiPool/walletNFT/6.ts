import { createAsyncThunk } from '@reduxjs/toolkit'
import { createRequestSlice, createRequestSliceState } from 'store/helpers/slice'

import type { WalletNFT, WalletNFTProps } from './adapter/request'
import { useWalletNFT } from './adapter/request'

const key = 'contract.uiPool.walletNFT.wn6'
const request = createAsyncThunk(`${key}/request`, (args: WalletNFTProps) => useWalletNFT(args))

export const { reducer, selectData, useRequestController } = createRequestSlice(
  key,
  createRequestSliceState<WalletNFT>(),
  request
)

export default reducer
