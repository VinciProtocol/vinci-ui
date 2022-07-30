import type { FC } from 'react'
import { useCallback, useMemo } from 'react'
import { styled } from '@mui/material/styles'
import type { Size, ColumnProps, TableProps } from 'react-virtualized'
import { AutoSizer, Column, Table } from 'react-virtualized'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

export const ROOT = styled('div')`
  height: 100%;
  width: 100%;
  .MuiTable-root,
  .MuiTableHead-root,
  .MuiTableBody-root {
    display: block;
  }
  .ReactVirtualized__Table__headerRow,
  .ReactVirtualized__Table__rowColumn {
    display: flex;
  }
  .MuiTableCell-root {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    flex: 1;
  }

  .MuiTableCell-alignCenter {
    justify-content: center;
  }

  .ReactVirtualized__Table__row {
    display: flex;
    will-change: transform;
    &:hover {
      ${({ theme }) => ({
        backgroundColor: theme.palette.background.papers.primary,
        cursor: 'pointer',
      })}
    }
  }
`

const tableDefaultProps = {
  headerHeight: 57,
  rowHeight: 74,
}

export interface VirtualizedTableProps<D = any> {
  columns: TableColumnsProps[]
  rowHeight?: number
  headerHeight?: number
  data: Array<D>
  tableProps?: Partial<TableProps>
}

export type TableColumnsProps = ColumnProps

const TableWithSize: FC<VirtualizedTableProps & Size> = ({ data, height, width, columns, tableProps = {} }) => {
  const rowCount = useMemo(() => data?.length || 0, [data?.length])
  const rowGetter = useCallback(({ index }) => data[index] || {}, [data])
  const tableContent = useMemo(() => columns.map((props) => <Column key={props.dataKey} {...props} />), [columns])

  return (
    <Table
      rowHeight={tableDefaultProps.rowHeight}
      headerHeight={tableDefaultProps.headerHeight}
      {...tableProps}
      height={height}
      width={width}
      rowGetter={rowGetter}
      rowCount={rowCount}
    >
      {tableContent}
    </Table>
  )
}

const VirtualizedTable: FC<VirtualizedTableProps> = (props) => {
  const CONTENT = useMemoEmpty(
    () =>
      styled(AutoSizer)`
        min-height: 100%;
        min-width: 100%;
      `
  )

  return (
    <ROOT className="virtualized-table">
      <CONTENT>
        {(size) => (
          <TableWithSize
            key="virtualized-table"
            {...{
              ...props,
              ...size,
            }}
          />
        )}
      </CONTENT>
    </ROOT>
  )
}

export default VirtualizedTable
