import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { useTheme } from '@mui/material/styles'

import { RESPONSIVE_DESIGN } from 'styles/constants'

import Logo from '../Header/Logo'
import LogoImgDark from './images/logo-black.svg'
import LogoImg from '../Header/Logo/images/logo.svg'
import Links from './Links'

const Footer: FC = () => {
  const theme = useTheme()

  const ROOT = useMemoEmpty(
    () => styled(Box)`
      ${() => ({
        padding: `${theme.spacing(12)} 0 ${theme.spacing(4)} 0`,
      })}
    `
  )

  const Content = useMemoEmpty(
    () => styled(Container)`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `
  )

  const CopyRight = useMemoEmpty(
    () => styled(Typography)`
      ${({ theme }) => ({
        color: theme.palette.text.secondary,
        fontWeight: 'normal',
        marginLeft: theme.spacing(1),
      })}
    `
  )

  return (
    <ROOT component="footer" sx={RESPONSIVE_DESIGN.display.GTSM('flex')}>
      <Content>
        <Logo imgSrc={theme.palette.mode === 'dark' ? LogoImg : LogoImgDark} />
        <Links />
        <CopyRight variant="caption">© 2022, VINCI. All Rights Reserved</CopyRight>
      </Content>
    </ROOT>
  )
}

export default Footer
