import handler from 'lib/protocol/dev/api/console'
import { noop } from 'lodash'

export default __DEV__ ? handler : noop
