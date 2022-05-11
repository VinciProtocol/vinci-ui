import type { FC } from 'react'
import dynamic from 'next/dynamic'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { RESPONSIVE_DESIGN } from 'styles/constants'

import Logo from './Logo'

const NProgress = dynamic(() => import('lib/nprogress/NProgress'), { ssr: false })
const Menu = dynamic(() => import('./Menu'), { ssr: false })
const MenuMobile = dynamic(() => import('./Menu/mobile'), { ssr: false })
const Actions = dynamic(() => import('./Actions'), { ssr: false })
const ActionsMobile = dynamic(() => import('./Actions/mobile'), { ssr: false })

const Header: FC = () => {
  const ROOT = useMemoEmpty(
    () => styled('header')`
      position: relative;
    `
  )
  const BODY = useMemoEmpty(
    () => styled(Box)`
      height: 85px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      ${({ theme }) => ({
        background: '#1C0200',
        padding: `0 ${theme.spacing(3)}`,
        boxShadow: theme.palette.mode === 'dark' ? `0 -1px 20px ${theme.palette.secondary.dark}` : 'none',
      })}
    `
  )

  return (
    <ROOT>
      <BODY sx={RESPONSIVE_DESIGN.display.GTSM('flex')}>
        <Stack spacing={2} direction="row">
          <Logo />
          <Menu />
        </Stack>
        <Actions />
      </BODY>
      <BODY sx={RESPONSIVE_DESIGN.display.LESM('flex')}>
        <Logo />
        <MenuMobile />
        <ActionsMobile />
      </BODY>
      <NProgress />
    </ROOT>
  )
}

export default Header
