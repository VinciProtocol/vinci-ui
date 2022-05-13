import { useTranslation } from 'next-i18next'
import { useState, useMemo } from 'react'

type TranslationValue = string | ((key: string) => string)
export const createUseTabs = <T extends string[], K extends T[0]>(
  list: T,
  translationValue: TranslationValue = 'common:wallet.btn.'
) => {
  const useTabs = () => {
    const { t } = useTranslation()
    const [tab, setTab] = useState<K>(list[0] as any)

    const tabProps = useMemo(() => {
      const getProps = (value: string) => ({
        value,
        id: `tab-${value}`,
        label: t(typeof translationValue === 'string' ? translationValue + value : translationValue(value)),
        'aria-controls': `tabpanel-${value}`,
      })
      return list.map((key) => getProps(key))
    }, [t])

    const tabs = useMemo(
      () => ({
        value: tab,
        setTab,
        tabProps,
        onChange: (e: React.SyntheticEvent, newValue: K) => setTab(newValue),
      }),
      [tab, tabProps]
    )

    return tabs
  }

  return useTabs
}
