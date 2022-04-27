import Image from 'next/image'
import Link from 'next/link'
import { styled } from '@mui/material/styles'
import MaterialLink from '@mui/material/Link'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

import LogoImg from './images/logo.svg'
import type { LogoProps } from './types'
import { RESPONSIVE_DESIGN } from 'styles/constants'

const Logo = (props: LogoProps) => {
  const ROOT = useMemoEmpty(
    () => styled(MaterialLink)`
      display: flex;
      align-items: center;
    `
  )
  return (
    <Link href={__DEV__ ? '/dev' : '/'} passHref>
      <ROOT sx={RESPONSIVE_DESIGN.width.LESM('100px', '143px')}>
        <Image src={props.imgSrc || LogoImg} alt="Vinci Protocol" />
      </ROOT>
    </Link>
  )
}

export default Logo
