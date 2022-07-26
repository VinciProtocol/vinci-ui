import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

import BasicTable from '../BasicTable'
import type { SearchTableProps } from './types'

const PCTable: FC<SearchTableProps> = (props) => {
  const { table, title, search } = props
  const Header = useMemoEmpty(
    () =>
      styled('div')`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px;
      `
  )

  return (
    <ROOT className="search-table" spacing={2}>
      <Header>
        <Typography variant="h5">{title}</Typography>
        {search.content}
      </Header>
      <BasicTable {...table} />
    </ROOT>
  )
}

export const ROOT = styled(Stack)``

export default PCTable
