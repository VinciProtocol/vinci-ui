const i18n = require('./i18n')
const getUse = require('./use')
const getLocalePath = require('./localePath')
const { ns, defaultNS } = require('./ns')

const __DEV__ = process.env.NODE_ENV === 'development'

module.exports = {
  i18n,
  serializeConfig: false,
  defaultNS,
  ns,
  use: getUse(__DEV__),
  localePath: getLocalePath(__DEV__),
}
