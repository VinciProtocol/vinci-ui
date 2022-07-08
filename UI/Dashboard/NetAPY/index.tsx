import type { FC } from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import PCNetAPY from './PCNetAPY'
import MobileNetAPY from './MobileNetAPY'

const NetAPY: FC = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  return matches ? <PCNetAPY /> : <MobileNetAPY />
}

export default NetAPY
