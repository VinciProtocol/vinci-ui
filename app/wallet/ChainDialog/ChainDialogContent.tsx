import type { FC } from 'react'
import { useMemo, Fragment } from 'react'
import { useCallback } from 'react'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import { useWeb3React } from '@web3-react/core'
import { switchEthereumChain } from 'lib/wallet/utils'
import { ChainId } from 'app/web3/chain/types'
import { getNetwork } from 'app/web3/network'

import ChainIcon from '../ChainIcon'
import { useWallet } from '..'

const ChainDialogContent: FC = () => {
  const buttons = useMemo(
    () => (
      <Fragment>
        <ChainButton chainId={ChainId.ethereum} />
        <ChainButton chainId={ChainId.bsc} />
        <ChainButton chainId={ChainId.kovan} />
      </Fragment>
    ),
    []
  )

  return (
    <DialogContent>
      <Stack spacing={2}>{buttons}</Stack>
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
