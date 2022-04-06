const HttpBackend = require('i18next-http-backend/cjs')

module.exports = (__DEV__) => (__DEV__ && process.browser ? [HttpBackend] : [])
