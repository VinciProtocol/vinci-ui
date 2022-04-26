import type { FC } from 'react'
import dynamic from 'next/dynamic'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

import ThemeButton from 'app/Theme/ThemeButton'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

import Menu from './Menu'
import MenuMobile from './Menu/mobile'
import Logo from './Logo'
import { RESPONSIVE_DESIGN } from 'styles/constants'

const ChainButton = dynamic(() => import('app/wallet/ChainButton'), { ssr: false })
const ConnectButton = dynamic(() => import('app/wallet/ConnectButton'), { ssr: false })
const LanguageMenu = dynamic(() => import('app/i18n/components/LanguageMenu'), { ssr: false })
const NProgress = dynamic(() => import('lib/nprogress/NProgress'), { ssr: false })

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
  const RIGHT = useMemoEmpty(
    () => styled(Stack)`
      min-width: 300px;
      justify-content: right;
    `
  )

  return (
    <ROOT>
      <BODY sx={RESPONSIVE_DESIGN.display.GEMD('flex')}>
        <Logo />
        <Menu />
        <RIGHT direction="row" spacing={2}>
          <ChainButton />
          <ConnectButton />
          <ThemeButton />
          <LanguageMenu />
        </RIGHT>
      </BODY>
      <BODY sx={RESPONSIVE_DESIGN.display.LESM('flex')}>
        <Logo />
        <MenuMobile />
      </BODY>
      <NProgress />
    </ROOT>
  )
}

export default Header
