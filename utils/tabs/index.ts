import { useTranslation } from 'next-i18next'
import { useState, useMemo } from 'react'

export const createUseTabs = <T extends string[], K extends T[0]>(list: T, translationKey = 'common:wallet.btn.') => {
  const useTabs = () => {
    const { t } = useTranslation()
    const [tab, setTab] = useState<K>(list[0] as any)

    const tabProps = useMemo(() => {
      const getProps = (value: string) => ({
        value,
        id: `tab-${value}`,
        label: t(translationKey + value),
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
