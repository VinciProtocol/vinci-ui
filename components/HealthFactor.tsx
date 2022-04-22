import type { FC } from 'react'
import { useMemo } from 'react'
import { useTheme } from '@mui/material/styles'
import { Typography } from '@mui/material'
import type BigNumber from 'bignumber.js'

import NumberDisplay from './math/NumberDisplay'

const HealthFactor: FC<{ value: BigNumber }> = ({ value }) => {
  const theme = useTheme()
  const color = useMemo(() => {
    if (!value) return theme.palette.info.main
    if (value.lt(1.1)) return theme.palette.error.main
    if (value.lt(1.3)) return theme.palette.warning.main
    return theme.palette.success.main
  }, [theme.palette.error.main, theme.palette.info.main, theme.palette.success.main, theme.palette.warning.main, value])
  return (
    <Typography variant="h6" color={color}>
      <NumberDisplay value={value} />
    </Typography>
  )
}
export default HealthFactor
