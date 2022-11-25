import { useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useWallet } from 'app/wallet'
import { ChainId } from 'app/web3/chain/types'

const MenuList = [
  {
    key: 'App',
    linkTo: '/',
    hide: true,
  },
  {
    key: 'NFTFinance',
    linkTo: '/nft-finance',
  },
  {
    key: 'NFTOracle',
    linkTo: '/nft-oracle',
  },
  {
    key: 'LendingMarket',
    menuChildren: [
      {
        key: 'Dashboard',
        linkTo: '/dashboard',
      },
      {
        key: 'Lend',
        linkTo: '/lend',
      },
      {
        key: 'Borrow',
        linkTo: '/borrow',
      },
    ],
  },
  {
    key: 'BorrowDetail',
    linkTo: '/borrow/[id]',
    hide: true,
  },
  {
    key: 'NFTAirdrop',
    linkTo: '/nft-airdrop',
    hide: true,
  },
  {
    key: 'NFTOracleDetail',
    linkTo: '/nft-oracle/[id]',
    hide: true,
  },
  {
    key: 'Audit',
    linkTo: 'https://www.certik.com/projects/vinci-protocol',
    target: '_blank',
    onlyMobile: true,
  },
  {
    key: 'Documentation',
    linkTo: 'https://docs.vinci.io/',
    target: '_blank',
  },
  // {
  //   key: 'Liquidation',
  //   linkTo: '/liquidation-marketplace',
  // },
]

export function useMenu() {
  const { t } = useTranslation()
  const router = useRouter()
  const { chainId } = useWallet()

  const menuList = useMemo(() => {
    const getMenuList = (list: any[]) => {
      return list.map((menu) => {
        if (menu.menuChildren) menu.menuChildren = getMenuList(menu.menuChildren)
        return {
          ...menu,
          label: t('router:menu.' + menu.key),
        }
      })
    }
    return getMenuList(
      MenuList.filter((menu) => {
        if (__DEV__) return true
        if (chainId === ChainId.goerli) {
          return menu.key !== 'NFTAirdrop'
        }
        return true
      })
    )
  }, [chainId, t])

  const currentMenu = useMemo(() => {
    const linkTo = router.route
    const getCurrentMenu = (list: any[]): any => {
      for (let index = 0; index < list.length; index++) {
        const menu = list[index]
        if (menu.linkTo === linkTo) return menu
        if (menu.menuChildren) {
          const returnValue = getCurrentMenu(menu.menuChildren)
          if (returnValue) return returnValue
        }
      }
    }
    return getCurrentMenu(menuList) || ({} as undefined)
  }, [menuList, router.route])

  return { menuList, currentMenu }
}
