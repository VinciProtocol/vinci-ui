import { combineReducers } from 'redux'

import wn1 from './1'
import wn2 from './2'
import wn3 from './3'
import wn4 from './4'
import wn5 from './5'

const reducer = combineReducers({
  wn1,
  wn2,
  wn3,
  wn4,
  wn5,
})

export default reducer
