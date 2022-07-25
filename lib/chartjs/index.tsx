import { noop } from 'lodash'

export const initChartjs = !__SERVER__ ? require('./client').default : noop
