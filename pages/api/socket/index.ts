import handler from 'lib/dev/socket/handler'
import { noop } from 'lodash'

export default __DEV__ ? handler : noop
