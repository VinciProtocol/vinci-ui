import type { FC } from 'react'
import { useMemo } from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import PCTable from './PCTable'
import MobileTable from './MobileTable'
import type { SearchTableProps } from './types'

const SearchTable: FC<SearchTableProps> = (props) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const searchTableProps = useMemo(() => {
    if (props.search.data) {
      props.table.data = props.search.data
    }
    return props
  }, [props])
  return matches ? <PCTable {...searchTableProps} /> : <MobileTable {...searchTableProps} />
}

export default SearchTable
