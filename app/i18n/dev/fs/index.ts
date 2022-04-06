import path from 'path'
import fs from 'fs'
import { readFile } from 'fs/promises'
import { requireTsSource } from 'utils/require'
import { ensureFolderExistence, writeFile } from 'utils/fs'

import { GENERATED_PATH, LOCALES_SOURCE_PATH, LOCALES_TARGET_PATH, LOCALES_DEV_TARGET_PATH } from '../config'
import { languages, locales } from '../config/languages'

export const createLocale = (language: any, dev: boolean) => {
  const source = {
    path: path.resolve(LOCALES_SOURCE_PATH, `${language}.ts`),
    read: () => readFile(source.path, { encoding: 'utf-8' }).then((text) => requireTsSource(text)),
    write: (value: any) => writeFile(source.path, value),
  }

  const target = {
    path: path.resolve(dev ? LOCALES_DEV_TARGET_PATH : LOCALES_TARGET_PATH, `${language}.json`),
    read: () => readFile(target.path, { encoding: 'utf-8' }).then((text) => JSON.parse(text)),
    write: async (value: any) => value && (await writeFile(target.path, value)),
  }

  return {
    language,
    source,
    target,
  }
}

export const outputLanguages = () => {
  const LANGUAGES_GENERATED_PATH = path.resolve(GENERATED_PATH, 'languages.js')
  ensureFolderExistence(LANGUAGES_GENERATED_PATH)
  fs.writeFileSync(
    LANGUAGES_GENERATED_PATH,
    `
module.exports = ${JSON.stringify(languages, null, 2)}
  `
  )
}

export const outputLocales = () => {
  const LANGUAGES_GENERATED_PATH = path.resolve(GENERATED_PATH, 'locales.js')
  ensureFolderExistence(LANGUAGES_GENERATED_PATH)
  fs.writeFileSync(
    LANGUAGES_GENERATED_PATH,
    `
module.exports = ${JSON.stringify(locales, null, 2)}
  `
  )
}
