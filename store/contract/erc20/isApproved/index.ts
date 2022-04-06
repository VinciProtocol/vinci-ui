import { createAsyncThunk } from '@reduxjs/toolkit'
import { createRequestSlice, createRequestSliceState } from 'store/helpers/slice'

import type { IsApprovedProps, IsApproved } from './adapter/request'
import { getIsApproved } from './adapter/request'

const key = 'contract.erc20.isApproved'
const request = createAsyncThunk(`${key}/request`, (args: IsApprovedProps) => getIsApproved(args))

export const { reducer, select, useRequestController } = createRequestSlice(
  key,
  createRequestSliceState<IsApproved>(),
  request
)

export default reducer
