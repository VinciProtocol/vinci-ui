import handler from 'app/i18n/dev/api/generate'
import { noop } from 'lodash'

export default __DEV__ ? handler : noop
