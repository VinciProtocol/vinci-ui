import { merge } from 'lodash'
import { createLocale } from '../fs'
const { extractLangAndNS, printList } = require('i18next-hmr/lib/utils')
const pluginName = `\x1b[35m\x1b[1m${'I18NextHMR'}\x1b[0m\x1b[39m`

function log(message: string) {
  console.log(`[ ${pluginName} ] ${message}`)
}

export const applyServerHMR = (i18n: any) => {
  const reloadServerTranslation = ({ changedFiles }: any) => {
    const list = changedFiles
      .map((changedFile: any) => extractLangAndNS(changedFile, i18n.options.ns))
      .filter(({ lang, ns }: any) => Boolean(lang) && Boolean(ns))
    const langs = Array.from(new Set(list.map((item: { lang: any }) => item.lang)))
    const namespaces = Array.from(new Set(list.map((item: { ns: any }) => item.ns)))

    i18n.reloadResources(langs, namespaces, (error: any) => {
      if (error) {
        log(`\x1b[31m\x1b[1m${error}\x1b[0m\x1b[39m`)
      } else {
        log(`Server reloaded locale of ${printList(list)} successfully`)
      }
    })
  }

  const updateTemplate = ({ changedFiles }: any) => {
    const promises: Promise<void>[] = []
    changedFiles.forEach((language: string) => {
      const { source, target } = createLocale(language, true)
      promises.push(
        language.startsWith('en/')
          ? source.read().then((data) => target.write(data))
          : target.read().then((t) => source.read().then((s) => target.write(merge(t, s))))
      )
    })
    return Promise.all(promises)
  }

  const HMRPlugin = require('i18next-hmr/lib/plugin')
  HMRPlugin.addListener((props: any) => {
    if (props.changedFiles.length === 0) return
    updateTemplate(props).then(() => reloadServerTranslation(props))
  })
}
