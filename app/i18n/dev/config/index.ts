import path from 'path'
import getLocalePath from '../../config/localePath'
import sourcePath from '../../config/sourcePath'

const root = process.cwd()

export const LOCALES_SOURCE_PATH = path.resolve(root, sourcePath)
export const LOCALES_TARGET_PATH = path.resolve(root, getLocalePath(false))
export const LOCALES_DEV_TARGET_PATH = path.resolve(root, getLocalePath(true))

export const GENERATED_PATH = path.resolve(root, `app/i18n/generated`)
