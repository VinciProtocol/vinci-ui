import Image from 'next/image'
import Link from 'next/link'
import { styled } from '@mui/material/styles'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

import LogoImg from './images/logo.svg'
import type { LogoProps } from './types'

const Logo = (props: LogoProps) => {
  const ROOT = useMemoEmpty(
    () => styled('a')`
      display: flex;
      align-items: center;
      .text {
        ${({ theme }) => ({
          marginLeft: theme.spacing(1),
          color: theme.palette.primary.contrastText,
        })}
      }
    `
  )
  return (
    <Link href={__DEV__ ? '/dev' : '/'} passHref>
      <ROOT>
        <Image src={props.imgSrc || LogoImg} alt="Vinci Protocol" />
      </ROOT>
    </Link>
  )
}

export default Logo
