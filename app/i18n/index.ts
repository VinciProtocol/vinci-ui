import { appWithTranslation as baseAppWithTranslation } from 'next-i18next'
import config from 'next-i18next.config'

export const appWithTranslation = __DEV__ ? (app: any) => baseAppWithTranslation(app, config) : baseAppWithTranslation
export * from './dev/hmr'
