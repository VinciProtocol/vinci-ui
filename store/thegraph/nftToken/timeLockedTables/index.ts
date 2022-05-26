import { createAsyncThunk } from '@reduxjs/toolkit'
import { createRequestSlice, createRequestSliceState } from 'store/helpers/slice'

import type { TimeLockedTablesProps, TimeLockedTables } from './adapter/request'
import { getTimeLockedTables } from './adapter/request'

const key = 'thegraph.nftToken.timeLockedTables'
const request = createAsyncThunk(`${key}/request`, (args: TimeLockedTablesProps) => getTimeLockedTables(args))

export const { reducer, select, useRequestController } = createRequestSlice(
  key,
  createRequestSliceState<TimeLockedTables>(),
  request
)

export default reducer
