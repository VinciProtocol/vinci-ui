import { combineReducers } from 'redux'

import { vinciSDKReducers } from '@vinci-protocol/store'
import uiPoolReducers from './uiPool'

const {
  contract: {
    erc20: { isApproved },
    uiPool: { reservesDataFromAllPools, userReservesDataFromAllPools },
  },
} = vinciSDKReducers

const reducer = combineReducers({
  erc20: combineReducers({
    isApproved: isApproved.reducer,
  }),
  uiPool: combineReducers({
    reservesDataFromAllPools: reservesDataFromAllPools.reducer,
    userReservesDataFromAllPools: userReservesDataFromAllPools.reducer,
    ...uiPoolReducers,
  }),
})

export default reducer
