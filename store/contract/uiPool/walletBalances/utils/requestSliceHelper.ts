import { createAsyncThunk } from '@reduxjs/toolkit'
import { createRequestSlice, createRequestSliceState } from 'store/helpers/slice'

import type { WalletBalances, WalletBalancesProps } from '../adapter/request'
import { useWalletBalances } from '../adapter/request'

export const requestSliceHelper = (NFT_ID: string) => {
  const key = `contract.uiPool.walletBalances.${NFT_ID}`
  const request = createAsyncThunk(`${key}/request`, (args: WalletBalancesProps) => useWalletBalances(args))

  const { reducer, selectData, useRequestController } = createRequestSlice(
    key,
    createRequestSliceState<WalletBalances>(),
    request
  )

  const returnValue = { reducer, selectData, useRequestController }
  return returnValue
}
type RequestSliceHelper = ReturnType<typeof requestSliceHelper>
export type WalletBalancesReducer = RequestSliceHelper['reducer']
export type WalletBalancesSelectData = RequestSliceHelper['selectData']
export type WalletBalancesUseRequestController = RequestSliceHelper['useRequestController']
