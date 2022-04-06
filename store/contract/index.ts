import { combineReducers } from 'redux'

import uiPool from './uiPool'
import erc20 from './erc20'

const reducer = combineReducers({
  erc20,
  uiPool,
})

export default reducer
