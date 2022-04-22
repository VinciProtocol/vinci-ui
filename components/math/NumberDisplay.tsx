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
  type?: 'network'
}

const NumberSpan = styled('div')`
  display: flex;
  align-items: center;
`

const NumberDisplay: FC<NumberDisplayProps> = ({ value, options, type }) => {
  const { network } = useWallet()

  const {
    format: { number: NF },
  } = useApp()
  const data = useMemo(() => {
    const d = valueToBigNumber(value)
    if (!d || d.isNaN() || d.eq(0)) return '-'
    return options ? NF.format(d, NF.options(options)) : d.toFixed(2)
  }, [NF, options, value])
  if (type) {
    return (
      <NumberSpan>
        <TokenIcon
          tokenSymbol={network?.symbol || 'BNB'}
          sx={{
            width: '0.875rem',
            height: '0.875rem',
            marginRight: '4px',
          }}
        />
        <span>{data}</span>
      </NumberSpan>
    )
  }
  return <span>{data}</span>
}

export default NumberDisplay
