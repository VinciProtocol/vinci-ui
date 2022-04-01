import { useMemo } from 'react'
import { useTranslation } from 'next-i18next'

const MenuList = [
  {
    label: 'Lend',
    linkTo: '/lend',
  },
  {
    label: 'Borrow',
    linkTo: '/borrow',
  },
  {
    label: 'Dashboard',
    linkTo: '/my-dashboard',
  },
  // {
  //   label: 'Stake',
  //   linkTo: '/stake',
  // },
  // {
  //   label: 'Liquidation',
  //   linkTo: '/liquidation-marketplace',
  // },
]

export function useMenu() {
  const { t } = useTranslation()

  const menuList = useMemo(() => MenuList.map((menu) => ({ ...menu, label: t('menu.' + menu.label) })), [t])

  return { menuList }
}
