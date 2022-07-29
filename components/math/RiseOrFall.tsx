import type { FC } from 'react'
import { useMemo } from 'react'
import { useTheme } from '@mui/material/styles'
import type { TypographyTypeMap } from '@mui/material'
import { Typography } from '@mui/material'

import NumberDisplay from './NumberDisplay'
import { valueToBigNumber } from 'utils/math'

const RiseOrFall: FC<{ value: any } & TypographyTypeMap<{}, 'span'>['props']> = ({ value, ...props }) => {
  const theme = useTheme()
  const isZero = useMemo(() => valueToBigNumber(value).isZero, [value])
  const color = useMemo(() => {
    if (isZero) return theme.palette.text.primary
    if (value.gt(0)) return theme.palette.error.main
    return theme.palette.success.main
  }, [isZero, theme.palette.error.main, theme.palette.success.main, theme.palette.text.primary, value])
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
