import { createAsyncThunk } from '@reduxjs/toolkit'
import { createRequestSlice, createRequestSliceState } from 'store/helpers/slice'

import type { Oracle, OracleProps } from './adapter/request'
import { useOracle } from './adapter/request'

const key = 'oracle'
const request = createAsyncThunk(`${key}/request`, (args: OracleProps) => useOracle(args))

export const { reducer, selectData, useRequestController } = createRequestSlice(
  key,
  createRequestSliceState<Oracle>(),
  request
)

export default reducer
