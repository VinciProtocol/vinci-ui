import { createAsyncThunk } from '@reduxjs/toolkit'
import { createRequestSlice, createRequestSliceState } from 'store/helpers/slice'

import type { OracleRecordsProps, OracleRecord } from './adapter/request'
import { getOracleRecords } from './adapter/request'

const key = 'thegraph.oracle'
const request = createAsyncThunk(`${key}/request`, (args: OracleRecordsProps, options) =>
  getOracleRecords(args, options)
)

export const { reducer, select, useRequestController, selectData } = createRequestSlice(
  key,
  createRequestSliceState<OracleRecord[]>(),
  request
)

export default reducer
