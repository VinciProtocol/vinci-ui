import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

import { TokenIcon } from 'app/web3/TokenIcon'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

import type { SymbolDialogTitleProps } from './types'

const SymbolDialogTitle: FC<SymbolDialogTitleProps> = ({ row }) => {
  const ROOT = useMemoEmpty(() => styled(Stack)``)

  return (
    <DialogTitle>
      <ROOT spacing={2} direction="row">
        <TokenIcon tokenSymbol={row.symbol} />
        <Typography variant="h6" sx={{ lineHeight: '40px' }}>
          {row.symbol}
        </Typography>
      </ROOT>
    </DialogTitle>
  )
}
export default SymbolDialogTitle
