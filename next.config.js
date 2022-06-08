const path = require('path')
const { i18n } = require('./next-i18next.config')
const i18nWebpack = require('./app/i18n/dev/hmr/webpack.js')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n,
  eslint: {
    dirs: ['app', 'components', 'domains', 'doc', 'lib', 'pages', 'pages', 'UI', 'utils'],
  },
  webpack: (config, context) => {
    i18nWebpack(config, context)
    const { buildId, dev, isServer, defaultLoaders, webpack } = context
    // Important: return the modified config
    const alias = config.resolve.alias
    const emptyModule = path.resolve(__dirname, 'lib/ssr/empty-module.ts')

    alias['@ethersproject/web'] = path.resolve(__dirname, 'lib/@ethersproject/web')

    if (!isServer) {
      alias.net = emptyModule
      alias.child_process = emptyModule
      alias.fs = emptyModule
    }

    // console.log(JSON.stringify(alias, null, 2))

    config.plugins.push(
      new webpack.DefinePlugin({
        __SERVER__: isServer,
        __DEV__: dev,
      })
    )

    return config
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: '/proxy/sandbox/:token_id*',
          destination: `https://api.sandbox.game/lands/:token_id*/metadata.json`,
        },
        {
          source: '/proxy/mutants/:token_id*',
          destination: `https://boredapeyachtclub.com/api/mutants/:token_id*`,
        },
        {
          source: '/proxy/meebit/:token_id*',
          destination: `https://meebits.app/meebit/:token_id*`,
        },
      ],
    }
  },
}
