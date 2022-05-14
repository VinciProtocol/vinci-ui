import { appWithTranslation as baseAppWithTranslation } from 'next-i18next'
import nextI18NextConfig from 'next-i18next.config'

export const appWithTranslation = (app: any) => baseAppWithTranslation(app, nextI18NextConfig)
export * from './dev/hmr'
