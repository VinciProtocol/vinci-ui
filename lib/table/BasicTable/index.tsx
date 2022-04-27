import type { FC } from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import PCTable from './PCTable'
import MobileTable from './MobileTable'
import type { BasicTableProps } from './types'

const BasicTable: FC<BasicTableProps> = (props) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  return matches ? <PCTable {...props} /> : <MobileTable {...props} />
}

export default BasicTable
