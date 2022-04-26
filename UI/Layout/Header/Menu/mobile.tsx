import { useMemo, useState } from 'react'
import Link from 'next/link'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

import { useMenu } from './useMenu'

const MenuMobile = () => {
  const { menuList, currentMenu } = useMenu()
  const [openDrawer, setOpenDrawer] = useState(false)
  const ROOT = useMemoEmpty(
    () => styled('div')`
      display: flex;
      align-items: center;
    `
  )

  const list = useMemo(
    () => (
      <List>
        {menuList.map(({ label, linkTo, key }) => (
          <Link href={linkTo} key={linkTo} passHref>
            <ListItem button selected={currentMenu.key === key}>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
    ),
    [currentMenu.key, menuList]
  )

  return (
    <ROOT>
      <Button
        variant="text"
        sx={{
          color: 'primary.contrastText',
        }}
        size="large"
        onClick={() => setOpenDrawer(true)}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {currentMenu.label}
      </Button>
      <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        {list}
      </Drawer>
    </ROOT>
  )
}

export default MenuMobile
