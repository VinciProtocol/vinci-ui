import type { FC } from 'react'
import { useMemo } from 'react'
import Button from '@mui/material/Button'

import { useChainButton } from './useChainButton'

export const ChainButton: FC = () => {
  const { network, open } = useChainButton()

  const content = useMemo(() => {
    if (!network) return null
    return (
      <Button key="chain-btn" variant="linear" onClick={open}>
        {network.fullName}
      </Button>
    )
  }, [network, open])

  return content || null
}

export default ChainButton
// background: linear-gradient(105.3deg, #1AE2FA 12.14%, #B94AFF 93.19%);
