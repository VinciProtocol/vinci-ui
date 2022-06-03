import { createAsyncThunk } from '@reduxjs/toolkit'
import { createRequestSlice, createRequestSliceState } from 'store/helpers/slice'

import type { WalletBalances, WalletBalancesProps } from './adapter/request'
import { useWalletBalances } from './adapter/request'

const key = 'contract.uiPool.walletBalances.wb6'
const request = createAsyncThunk(`${key}/request`, (args: WalletBalancesProps) => useWalletBalances(args))

export const { reducer, selectData, useRequestController } = createRequestSlice(
  key,
  createRequestSliceState<WalletBalances>(),
  request
)

export default reducer
