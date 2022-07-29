import type { FC } from 'react'
import { useMemo } from 'react'
import { useTheme } from '@mui/material/styles'
import type { TypographyTypeMap } from '@mui/material'
import { Typography } from '@mui/material'

import NumberDisplay from './NumberDisplay'
import { valueToBigNumber } from 'utils/math'

const RiseOrFall: FC<{ value: any } & TypographyTypeMap<{}, 'span'>['props']> = ({ value, ...props }) => {
  const theme = useTheme()
  const bn = useMemo(() => valueToBigNumber(value), [value])
  const isZero = useMemo(() => bn.isNaN() || bn.isZero(), [bn])
  const color = useMemo(() => {
    if (isZero) return theme.palette.text.primary
    if (bn.gt(0)) return theme.palette.error.main
    return theme.palette.success.main
  }, [bn, isZero, theme.palette.error.main, theme.palette.success.main, theme.palette.text.primary])
  return (
    <Typography {...props} color={color}>
      {isZero ? (
        <span>0</span>
      ) : (
        <NumberDisplay
          value={value}
          options="percent"
          numberFormatOptions={{
            maximumFractionDigits: 2,
          }}
        />
      )}
    </Typography>
  )
}

export default RiseOrFall
