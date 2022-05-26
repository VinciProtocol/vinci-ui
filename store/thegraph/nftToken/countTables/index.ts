import { createAsyncThunk } from '@reduxjs/toolkit'
import { createRequestSlice, createRequestSliceState } from 'store/helpers/slice'

import type { CountTablesProps, CountTables } from './adapter/request'
import { getCountTables } from './adapter/request'

const key = 'thegraph.nftToken.countTables'
const request = createAsyncThunk(`${key}/request`, (args: CountTablesProps) => getCountTables(args))

export const { reducer, select, useRequestController } = createRequestSlice(
  key,
  createRequestSliceState<CountTables>(),
  request
)

export default reducer
