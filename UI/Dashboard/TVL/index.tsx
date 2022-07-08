import type { FC } from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import PCTVL from './PCTVL'
import MobileTVL from './MobileTVL'

const TVL: FC = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  return matches ? <PCTVL /> : <MobileTVL />
}

export default TVL
