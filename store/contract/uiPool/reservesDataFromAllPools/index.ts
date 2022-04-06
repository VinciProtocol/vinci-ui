import { createAsyncThunk } from '@reduxjs/toolkit'
import { createRequestSlice, createRequestSliceState } from 'store/helpers/slice'

import type { ReservesDataProps, ReservesData } from './adapter/request'
import { useReservesDataFromAllPools } from './adapter/request'

const key = 'contract.uiPool.reservesDataFromAllPools'
const request = createAsyncThunk(`${key}/request`, (args: ReservesDataProps) => useReservesDataFromAllPools(args))

export const { reducer, selectData, useRequestController } = createRequestSlice(
  key,
  createRequestSliceState<ReservesData[]>(),
  request
)

export default reducer
