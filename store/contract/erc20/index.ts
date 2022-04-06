import { combineReducers } from 'redux'

import isApproved from './isApproved'

const reducer = combineReducers({
  isApproved,
})

export default reducer
