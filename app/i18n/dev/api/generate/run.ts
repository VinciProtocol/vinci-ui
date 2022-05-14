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
type ObjectToTempalteResultValue = { key: string; value: string; parentKey?: string; index?: number }
type ObjectToTempalteResult = {
  normal: ObjectToTempalteResultValue[]
  components: ObjectToTempalteResultValue[]
}

const getComponentsValue = (parentKey: string, parentValue: string) => {
  const returnValue = {
    hasComponentsValue: false,
    value: parentValue,
    key: parentKey,
    result: [] as ObjectToTempalteResultValue[],
  }
  let regExpExecArray
  const regExp = /<([a-zA-Z]*)>/g
  while ((regExpExecArray = regExp.exec(parentValue)) !== null) {
    const key = regExpExecArray[1]
    const startTagIndex = regExpExecArray.index
    const startTag = `<${key}>`
    const endTag = `</${key}>`
    const endTagIndex = parentValue.indexOf(endTag, startTagIndex)
    const content = parentValue.slice(startTagIndex + 2 + key.length, endTagIndex)
    const index = returnValue.result.length

    returnValue.value = returnValue.value.replace(`${startTag}${content}${endTag}`, `{{BBAA${index}AACC}}`)
    returnValue.result.push({
      key,
      value: `${content}\n`,
      parentKey,
      index,
    })
  }
  returnValue.hasComponentsValue = !!returnValue.result.length
  return returnValue
}

const objectToTempalte = (obj: any, result: ObjectToTempalteResult, parent = '') => {
  parent = parent ? parent + '.' : ''
  Object.keys(obj).forEach((key) => {
    const keysK = parent + key
    const value = obj[key]
    if (typeof value === 'object') {
      return objectToTempalte(value, result, keysK)
    }

    const components = getComponentsValue(keysK, value)

    if (components.hasComponentsValue) {
      result.components = result.components.concat(components.result)
      result.normal.push({
        key: keysK,
        value: `${components.value}\n`,
      })
    } else {
      result.normal.push({
        key: keysK,
        value: `${value}\n`,
      })
    }
  })
}

const getTranslate = async function (ENlocales: any) {
  const result: any = {
    en: {},
  }
  const objectToTempalteResult: ObjectToTempalteResult = {
    normal: [],
    components: [],
  }
  for (let i = 0; i < ENlocales.length; i++) {
    const locale = ENlocales[i]
    const source = await locale.source.read()
    try {
      const target = await locale.target.read()
      if (isEqual(source, target)) continue
    } catch (error) {}
    result.en[locale.ns] = source
    objectToTempalte(source, objectToTempalteResult, locale.ns)
  }
  let template = ''
  objectToTempalteResult.normal.forEach(({ value }) => {
    template += value
  })
  objectToTempalteResult.components.forEach(({ value }) => {
    template += value
  })

  for (let i = 0; i < languages.length; i++) {
    const language = languages[i]
    if (language.code === 'en') continue
    const translation = await translate(template, language.code)
    if (!translation) continue
    const values = translation.split('\n')
    const returnValue: any = {}
    for (let j = 0; j < objectToTempalteResult.normal.length; j++) {
      const { key } = objectToTempalteResult.normal[j]
      const value = values[j]
      set(returnValue, key, value)
    }
    const start = objectToTempalteResult.normal.length
    const end = objectToTempalteResult.components.length + start
    for (let j = start; j < end; j++) {
      const { key, parentKey, index } = objectToTempalteResult.components[j - start]
      const startTag = `<${key}>`
      const endTag = `</${key}>`
      const content = values[j]
      const value = `${startTag}${content}${endTag}`
      let parentValue = get(returnValue, parentKey).replace(`{{BBAA${index}AACC}}`, value)
      set(returnValue, parentKey, parentValue)
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
