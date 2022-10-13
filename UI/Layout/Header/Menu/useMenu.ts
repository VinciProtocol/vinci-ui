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
    key: 'NFTOracle',
    linkTo: '/nft-oracle',
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
    onlyMobile: true
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
    return MenuList.filter((menu) => {
      if (__DEV__) return true
      if (chainId === ChainId.goerli) {
        return menu.key !== 'NFTAirdrop'
      }
      return true
    }).map((menu) => ({ ...menu, label: t('router:menu.' + menu.key) }))
  }, [chainId, t])

  const currentMenu = useMemo(() => {
    const linkTo = router.route
    return menuList.find((item) => item.linkTo === linkTo) || ({} as undefined)
  }, [menuList, router.route])

  return { menuList, currentMenu }
}
