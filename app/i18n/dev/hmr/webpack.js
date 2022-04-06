const path = require('path')
const sourcePath = require('../../config/sourcePath')
const getLocalePath = require('../../config/localePath')

module.exports = (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  if (dev) {
    const root = process.cwd()
    if (!isServer) {
      const { I18NextHMRPlugin } = require('i18next-hmr/plugin')
      const localePath = path.resolve(root, sourcePath)
      config.plugins.push(new I18NextHMRPlugin({ localesDir: localePath }))
    } else {
      const CopyPlugin = require('copy-webpack-plugin')
      config.plugins.push(
        new CopyPlugin({
          patterns: [{ from: path.resolve(root, getLocalePath(false)), to: path.resolve(root, getLocalePath(true)) }],
        })
      )
    }
  }
}
