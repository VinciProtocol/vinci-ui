import { createAsyncThunk } from '@reduxjs/toolkit'
import { createRequestSlice, createRequestSliceState } from 'store/helpers/slice'

import type { UserReservesDataProps, UserReservesData } from './adapter/request'
import { useUserReservesDataFromAllPools } from './adapter/request'

const key = 'contract.uiPool.userReservesDataFromAllPools'
const request = createAsyncThunk(`${key}/request`, (args: UserReservesDataProps) =>
  useUserReservesDataFromAllPools(args)
)

export const { reducer, selectData, useRequestController } = createRequestSlice(
  key,
  createRequestSliceState<UserReservesData[]>(),
  request
)

export default reducer
