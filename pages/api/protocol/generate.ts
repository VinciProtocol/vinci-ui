import handler from 'lib/protocol/dev/api/generate'
import { noop } from 'lodash'

export default __DEV__ ? handler : noop
