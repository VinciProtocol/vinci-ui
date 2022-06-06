import { combineReducers } from 'redux'
import { NFT_IDS } from 'app/web3/market'

import type {
  WalletBalancesReducer,
  WalletBalancesSelectData,
  WalletBalancesUseRequestController,
} from './utils/requestSliceHelper'
import { requestSliceHelper } from './utils/requestSliceHelper'

const reducers: Record<string, WalletBalancesReducer> = {}
const selectDatas: Record<string, WalletBalancesSelectData> = {}
const useRequestControllers: Record<string, WalletBalancesUseRequestController> = {}

NFT_IDS.forEach((NFT_ID) => {
  const { reducer, selectData, useRequestController } = requestSliceHelper(NFT_ID)
  reducers[NFT_ID] = reducer
  selectDatas[NFT_ID] = selectData
  useRequestControllers[NFT_ID] = useRequestController
})

const reducer = combineReducers(reducers)

export default reducer
export { selectDatas, useRequestControllers }
