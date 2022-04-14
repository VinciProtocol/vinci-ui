import type { FC } from 'react'
import dynamic from 'next/dynamic'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import ThemeButton from 'app/Theme/ThemeButton'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

import Menu from './Menu'
import Logo from './Logo'

const ChainButton = dynamic(() => import('app/wallet/ChainButton'), { ssr: false })
const ConnectButton = dynamic(() => import('app/wallet/ConnectButton'), { ssr: false })
const LanguageMenu = dynamic(() => import('app/i18n/components/LanguageMenu'), { ssr: false })

const Header: FC = () => {
  const ROOT = useMemoEmpty(
    () => styled('header')`
      height: 85px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      ${({ theme }) => ({
        background: '#1C0200',
        padding: `0 ${theme.spacing(3)}`,
        boxShadow: `0 -1px 20px ${theme.palette.primary.dark}`,
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
      <Logo />
      <Menu />
      <RIGHT direction="row" spacing={2}>
        <ChainButton />
        <ConnectButton />
        <ThemeButton />
        <LanguageMenu />
      </RIGHT>
    </ROOT>
  )
}

export default Header
