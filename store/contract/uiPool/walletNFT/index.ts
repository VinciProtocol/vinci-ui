import { combineReducers } from 'redux'
import { NFT_IDS } from 'app/web3/market'

import type { WalletNFTReducer, WalletNFTSelectData, WalletNFTUseRequestController } from './utils/requestSliceHelper'
import { requestSliceHelper } from './utils/requestSliceHelper'

const reducers: Record<string, WalletNFTReducer> = {}
const selectDatas: Record<string, WalletNFTSelectData> = {}
const useRequestControllers: Record<string, WalletNFTUseRequestController> = {}

NFT_IDS.forEach((NFT_ID) => {
  const { reducer, selectData, useRequestController } = requestSliceHelper(NFT_ID)
  reducers[NFT_ID] = reducer
  selectDatas[NFT_ID] = selectData
  useRequestControllers[NFT_ID] = useRequestController
})

const reducer = combineReducers(reducers)

export default reducer
export { selectDatas, useRequestControllers }
