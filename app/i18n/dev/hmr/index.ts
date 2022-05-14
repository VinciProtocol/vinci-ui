import { useEffect } from 'react'
import { noop } from 'lodash'
import { useTranslation } from 'next-i18next'

export const useI18nHMR = __DEV__
  ? () => {
      const { i18n } = useTranslation()

      if (__SERVER__ && i18n) {
        import('./server-hmr').then(({ applyServerHMR }) => {
          applyServerHMR(i18n)
        })
      } else {
        ;(window as any).i18n = i18n
      }

      useEffect(() => {
        if (i18n) {
          import('i18next-hmr/client').then(({ applyClientHMR }) => {
            applyClientHMR(i18n)
          })
        }
      }, [i18n])
    }
  : noop
