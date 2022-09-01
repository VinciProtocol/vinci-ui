import { useMemo } from 'react'
import Link from 'next/link'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

import { useMenu } from './useMenu'

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
        .map(({ label, linkTo }) => (
          <Link href={linkTo} key={linkTo} passHref>
            <Button
              variant="text"
              sx={{
                color: 'primary.contrastText',
              }}
              size="large"
            >
              {label}
            </Button>
          </Link>
        )),
    [menuList]
  )

  return <ROOT>{list}</ROOT>
}

export default Menu
