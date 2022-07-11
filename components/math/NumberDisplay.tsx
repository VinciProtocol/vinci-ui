import type { SxProps, Theme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import { useApp } from 'app/App'
import { useWallet } from 'app/wallet'
import { TokenIcon } from 'app/web3/TokenIcon'
import type { FC } from 'react'
import { useMemo } from 'react'
import { valueToBigNumber } from 'utils/math'
import type { BigNumberValue } from 'utils/math/types'

type NumberDisplayProps = {
  value: BigNumberValue
  options?: 'number' | 'USD' | 'percent'
  numberFormatOptions?: Intl.NumberFormatOptions
  type?: 'network' | 'VCI' | ''
  sx?: SxProps<Theme>
}

const NumberSpan = styled('div')`
  display: flex;
  align-items: center;
`

const NumberDisplay: FC<NumberDisplayProps> = ({ value, options, numberFormatOptions, type, sx }) => {
  const { network } = useWallet()

  const {
    format: { number: NF },
  } = useApp()
  const data = useMemo(() => {
    const d = valueToBigNumber(value)
    if (!d || d.isNaN() || d.eq(0)) return '-'
    return NF.format(d, NF.options(options, numberFormatOptions))
  }, [NF, numberFormatOptions, options, value])
  if (type) {
    let tokenSymbol = 'ETH'
    switch (type) {
      case 'network':
        if (network?.symbol) tokenSymbol = network.symbol
        break
      case 'VCI':
        if (network?.symbol) tokenSymbol = 'VCI'
        break
    }

    return (
      <NumberSpan>
        <TokenIcon
          tokenSymbol={tokenSymbol}
          sx={{
            width: '0.875rem',
            height: '0.875rem',
            marginRight: '4px',
            ...sx,
          }}
        />
        <span>{data}</span>
      </NumberSpan>
    )
  }
  return <span>{data}</span>
}

export default NumberDisplay
