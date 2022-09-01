import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import MaterialLink from '@mui/material/Link'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

import type { CertikProps } from './types'
import { certikRender } from './render'
import { useMount } from 'app/hooks/useMount'

const Certik: FC<CertikProps> = () => {
  const ROOT = useMemoEmpty(
    () => styled(MaterialLink)`
      display: flex;
      align-items: center;
    `
  )

  useMount(() => {
    certikRender()
  })
  return (
    <ROOT sx={{ height: '40px', width: '128px' }} target="_blank">
      <div className="certik-emblem" data-id="a23f4b88">
        View project at certik.com
      </div>
    </ROOT>
  )
}

export default Certik
