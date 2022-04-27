import { useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const MenuList = [
  {
    key: 'Lend',
    linkTo: '/lend',
  },
  {
    key: 'Borrow',
    linkTo: '/borrow',
  },
  {
    key: 'Dashboard',
    linkTo: '/my-dashboard',
  },
  {
    key: 'BorrowDetail',
    linkTo: '/borrow/[id]',
    hide: true,
  },
  // {
  //   key: 'Stake',
  //   linkTo: '/stake',
  // },
  // {
  //   key: 'Liquidation',
  //   linkTo: '/liquidation-marketplace',
  // },
]

export function useMenu() {
  const { t } = useTranslation()
  const router = useRouter()

  const menuList = useMemo(() => MenuList.map((menu) => ({ ...menu, label: t('menu.' + menu.key) })), [t])
  const currentMenu = useMemo(() => {
    const linkTo = router.route === '/' ? '/lend' : router.route
    return menuList.find((item) => item.linkTo === linkTo) || ({} as undefined)
  }, [menuList, router.route])

  return { menuList, currentMenu }
}
