import { useMemo } from 'react'
import { styled } from '@mui/material/styles'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

import { useMenu } from './useMenu'
import BasicMenu from './components/BasicMenu'

const Menu = () => {
  const { menuList } = useMenu()
  const ROOT = useMemoEmpty(
    () => styled('div')`
      display: flex;
      align-items: center;
    `
  )

  const list = useMemo(
    () =>
      menuList
        .filter((item) => !item.hide && !item.onlyMobile)
        .map((menu) => <BasicMenu key={menu.linkTo} {...menu} />),
    [menuList]
  )

  return <ROOT>{list}</ROOT>
}

export default Menu
