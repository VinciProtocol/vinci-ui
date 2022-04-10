import { combineReducers } from 'redux'

import wn1 from './1'
import wn2 from './2'
import wn3 from './3'

const reducer = combineReducers({
  wn1,
  wn2,
  wn3,
})

export default reducer
