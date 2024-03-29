import { useMemo, useState } from 'react'
import Link from 'next/link'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { useLinks } from 'UI/Layout/Footer/Links/useLinks'

import Logo from '../Logo'
import { useMenu } from './useMenu'
import LinkButtonMobile from './components/LinkButtonMobile'

const MenuMobile = () => {
  const { menuList, currentMenu } = useMenu()
  const { links } = useLinks()
  const [openDrawer, setOpenDrawer] = useState(false)
  const ROOT = useMemoEmpty(() => styled('div')``)

  const list = useMemo(
    () => (
      <List sx={{ paddingTop: 0 }}>
        <ListItem sx={{ background: '#1C0200', paddingTop: '16px', paddingBottom: '16px' }}>
          <Logo />
        </ListItem>
        <Divider />
        {menuList
          .filter((item) => !item.hide)
          .map((menu) => (
            <LinkButtonMobile
              key={menu.linkTo}
              {...{ ...menu, handleClose: () => setOpenDrawer(false), currentMenu }}
            />
          ))}
        <Divider />
        {links.map(({ label, linkTo, icon }) => (
          <Link href={linkTo} key={linkTo} passHref>
            <ListItem button>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
        <Divider />
        <ListItem>
          <ListItemText primary=" © 2022, VINCI. All Rights Reserved" />
        </ListItem>
      </List>
    ),
    [currentMenu, links, menuList]
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
