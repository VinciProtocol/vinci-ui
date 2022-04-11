import type { FC } from 'react'
import { useCallback } from 'react'
import { styled } from '@mui/material/styles'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { useWeb3React } from '@web3-react/core'
import { switchEthereumChain } from 'lib/wallet/utils'
import { ChainId } from 'app/web3/chain/types'

const ChainDialogContent: FC = () => {
  const ROOT = useMemoEmpty(() =>
    styled('div')(({ theme }) => ({
      display: 'flex',
      justifyContent: 'center',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(3),
    }))
  )
  const { library } = useWeb3React()
  const onSwitchEthereumChain = useCallback(
    (chainId: any) => {
      const provider = library || window.ethereum
      if (provider) return switchEthereumChain(provider, chainId)
    },
    [library]
  )

  return (
    <DialogContent>
      <ROOT>
        <Button onClick={() => onSwitchEthereumChain(ChainId.bsc)}>BSC</Button>
        <Button onClick={() => onSwitchEthereumChain(ChainId.kovan)}>Koven Test</Button>
        <Button onClick={() => onSwitchEthereumChain(ChainId.bsct)}>BSC Test</Button>
        <Button onClick={() => onSwitchEthereumChain(ChainId.vinci)}>Vinci Stage Test</Button>
      </ROOT>
    </DialogContent>
  )
}

export default ChainDialogContent
