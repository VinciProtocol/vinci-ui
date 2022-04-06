import { v2 } from '@google-cloud/translate'
import { isEqual, set, get, merge, cloneDeep } from 'lodash'
import path from 'path'
import fs from 'fs'

import { LOCALES_SOURCE_PATH, LOCALES_TARGET_PATH } from '../../config'
import { createLocale, outputLanguages, outputLocales } from '../../fs'
import { languages } from '../../config/languages'

process.env['GOOGLE_APPLICATION_CREDENTIALS'] = path.resolve(
  process.cwd(),
  'app/i18n/dev/api/generate/googleApplicationCredentials.json'
)

const t = new v2.Translate()

const translate = async (text: string, target: string) => {
  if (!text) return
  console.log('run translate =>', target)
  const [translation] = await t.translate(text, target)
  return translation
}

const objectToTempalte = (obj: any, parent = '', keys: any = []) => {
  parent = parent ? parent + '.' : ''
  let template = ''
  Object.keys(obj).forEach((key) => {
    const keysK = parent + key
    if (typeof obj[key] === 'object') {
      template += objectToTempalte(obj[key], keysK, keys).template
    } else {
      template += `${obj[key]}\n`
      keys.push(keysK)
    }
  })
  return {
    template,
    keys,
  }
}

const getTranslate = async function (ENlocales: any) {
  const result: any = {
    en: {},
  }
  const keys: string | any[] = []
  let template = ''
  for (let i = 0; i < ENlocales.length; i++) {
    const locale = ENlocales[i]
    const source = await locale.source.read()
    try {
      const target = await locale.target.read()
      if (isEqual(source, target)) continue
    } catch (error) {}
    result.en[locale.ns] = source
    template += objectToTempalte(source, locale.ns, keys).template
  }

  for (let i = 0; i < languages.length; i++) {
    const language = languages[i]
    if (language.code === 'en') continue
    const translation = await translate(template, language.code)
    if (!translation) continue
    const values = translation.split('\n')
    const returnValue = {}
    for (let j = 0; j < keys.length; j++) {
      const key = keys[j]
      const value = values[j]
      set(returnValue, key, value)
    }
    result[language.code] = returnValue
  }
  return result
}

const getFinalResult = async function (translateResult: any, localesInfoMap: any) {
  const result: any = cloneDeep(translateResult)

  const infoKeys: any[] = Array.from(localesInfoMap.keys())
  for (let i = 0; i < infoKeys.length; i++) {
    const code = infoKeys[i]
    const localesInfo = localesInfoMap.get(code)
    for (let j = 0; j < localesInfo.ns.length; j++) {
      const ns = localesInfo.ns[j]
      const objectKey = `${code}.${ns}`
      const locale = localesInfo.locales[j]
      const sourceIntranslate = get(translateResult, objectKey)
      const source = merge(sourceIntranslate || {}, await locale.source.read())
      try {
        const target = await locale.target.read()
        const finalSource = merge({}, target, source)
        if (isEqual(finalSource, target)) continue
        set(result, objectKey, finalSource)
      } catch (error) {
        set(result, objectKey, source)
      }
    }
  }

  return result
}

const getLocalesInfoMap = async () => {
  const sourceLocales = fs.readdirSync(LOCALES_SOURCE_PATH)
  const localesInfoMap = new Map()
  for (let i = 0; i < sourceLocales.length; i++) {
    const code = sourceLocales[i]
    const nsFiles = fs.readdirSync(path.resolve(LOCALES_SOURCE_PATH, code))
    const ns = nsFiles.map((file) => file.split('.ts')[0])
    const localesInfo = {
      ns,
      locales: ns.map((n) => ({
        ...createLocale(`${code}/${n}`, false),
        ns: n,
      })),
    }
    localesInfoMap.set(code, localesInfo)
  }

  const ENlocalesInfo = localesInfoMap.get('en')
  localesInfoMap.delete('en')

  return {
    localesInfoMap,
    ENlocalesInfo,
  }
}

export const run = async () => {
  const { localesInfoMap, ENlocalesInfo } = await getLocalesInfoMap()
  const translateResult = await getTranslate(ENlocalesInfo.locales)
  const result = await getFinalResult(translateResult, localesInfoMap)

  const codes = Object.keys(result)
  const outputList = new Set<string>()
  for (let i = 0; i < codes.length; i++) {
    const code = codes[i]
    const ns = ENlocalesInfo.ns
    for (let j = 0; j < ns.length; j++) {
      const n = ns[j]
      if (!result[code][n]) continue
      const language = `${code}/${n}`
      const locale = createLocale(language, false)
      const localeDev = createLocale(language, true)
      await locale.target.write(result[code][n])
      await localeDev.target.write(result[code][n])
      outputList.add(language)
    }
  }

  outputLanguages()
  outputLocales()

  console.log('[api/i18n/generate] output to', LOCALES_TARGET_PATH)
  console.log('[api/i18n/generate] update', outputList.size ? Array.from(outputList.values()).join(',') : 'empty')
}
