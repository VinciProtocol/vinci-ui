import { combineReducers } from 'redux'

import reservesDataFromAllPools from './reservesDataFromAllPools'
import userReservesDataFromAllPools from './userReservesDataFromAllPools'

import walletBalances from './walletBalances'
import walletNFT from './walletNFT'

const reducer = combineReducers({
  reservesDataFromAllPools,
  userReservesDataFromAllPools,
  walletBalances,
  walletNFT,
})

export default reducer
