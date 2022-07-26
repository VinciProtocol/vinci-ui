import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

import BasicTable from '../BasicTable'
import type { SearchTableProps } from './types'

const MobileTable: FC<SearchTableProps> = (props) => {
  const { table, title, search } = props
  const Header = useMemoEmpty(
    () =>
      styled(Stack)`
        padding: 24px;
      `
  )

  return (
    <ROOT className="table search-table">
      <Header spacing={2}>
        <Typography variant="h5">{title}</Typography>
        {search.content}
      </Header>
      <BasicTable {...table} />
    </ROOT>
  )
}

export const ROOT = styled('div')``

export default MobileTable
