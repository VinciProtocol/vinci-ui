import type { FC } from 'react'
import { useMemo } from 'react'
import { useCallback } from 'react'
import { styled } from '@mui/material/styles'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { useWeb3React } from '@web3-react/core'
import { switchEthereumChain } from 'lib/wallet/utils'
import { ChainId } from 'app/web3/chain/types'
import { getNetwork } from 'app/web3/network'

import ChainIcon from '../ChainIcon'
import { useWallet } from '..'

const ChainDialogContent: FC = () => {
  const ROOT = useMemoEmpty(() =>
    styled('div')(({ theme }) => ({
      display: 'flex',
      justifyContent: 'space-around',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(3),
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    }))
  )

  return (
    <DialogContent>
      <ROOT>
        <ChainButton chainId={ChainId.bsc} />
        <ChainButton chainId={ChainId.kovan} />
      </ROOT>
    </DialogContent>
  )
}

const ChainButton: FC<{ chainId: ChainId }> = (props) => {
  const {
    chainDialog: { close },
  } = useWallet()
  const { library } = useWeb3React()
  const onSwitchEthereumChain = useCallback(
    (chainId: ChainId) => {
      const provider = library || window.ethereum
      if (provider) return switchEthereumChain(provider, chainId)
    },
    [library]
  )
  const network = useMemo(() => getNetwork(props.chainId), [props.chainId])
  return (
    <Button
      variant="outlined"
      startIcon={<ChainIcon chainName={network.name} />}
      onClick={() => onSwitchEthereumChain(props.chainId).then(() => close())}
    >
      {network.fullName}
    </Button>
  )
}

export default ChainDialogContent
