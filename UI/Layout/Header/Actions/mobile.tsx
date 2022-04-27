import type { FC } from 'react'
import { useState } from 'react'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import MenuIcon from '@mui/icons-material/Menu'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import ThemeButton from 'app/Theme/ThemeButton'
import ChainButton from 'app/wallet/ChainButton'
import ConnectButton from 'app/wallet/ConnectButton'
import LanguageMenu from 'app/i18n/components/LanguageMenu'

const ActionsMobile: FC = () => {
  const ROOT = useMemoEmpty(() => styled(Stack)``)
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <ROOT direction="row" spacing={2}>
      <IconButton
        sx={{
          color: 'primary.contrastText',
        }}
        onClick={() => setOpenDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        sx={{
          '.MuiDrawer-paper': {
            background: '#20100f',
          },
        }}
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          <ListItem>
            <ChainButton />
          </ListItem>
          <ListItem>
            <ConnectButton />
          </ListItem>
          <ListItem>
            <ThemeButton />
          </ListItem>
          <ListItem>
            <LanguageMenu />
          </ListItem>
        </List>
      </Drawer>
    </ROOT>
  )
}

export default ActionsMobile
