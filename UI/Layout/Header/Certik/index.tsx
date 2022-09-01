import type { FC } from 'react'
import Link from 'next/link'
import { styled } from '@mui/material/styles'
import MaterialLink from '@mui/material/Link'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

import type { CertikProps } from './types'
import { RESPONSIVE_DESIGN } from 'styles/constants'

const Certik: FC<CertikProps> = () => {
  const ROOT = useMemoEmpty(
    () => styled(MaterialLink)`
      display: flex;
      align-items: center;
    `
  )
  return (
    <Link
      href="https://www.certik.com/projects/vinci-protocol?utm_source=SkyEmblem&amp;utm_campaign=vinci-protocol&amp;utm_medium=link"
      passHref
    >
      <ROOT sx={RESPONSIVE_DESIGN.width.LESM('100px', '143px')}>
        <div className="certik-emblem" data-id="a23f4b88">
          View project at certik.com
        </div>
      </ROOT>
    </Link>
  )
}

export default Certik
