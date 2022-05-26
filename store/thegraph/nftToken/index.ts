import { combineReducers } from 'redux'

import countTables from './countTables'
import timeLockedTables from './timeLockedTables'

const reducer = combineReducers({
  countTables,
  timeLockedTables,
})

export default reducer
