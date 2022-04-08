import type { FC } from 'react'
import { useMemo } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import type { ColumnProps, TableProps } from 'react-virtualized'

import ROOT from './css/ROOT'

export interface BasicTableProps<D = any> {
  columns: TableColumnsProps[]
  rowHeight?: number
  headerHeight?: number
  data: Array<D>
  tableProps?: Partial<TableProps>
}

export type TableColumnsProps = ColumnProps

const BasicTable: FC<BasicTableProps> = (props) => {
  const { columns, data } = props
  const { onRowClick } = props.tableProps || {}

  const table = useMemo(() => {
    return {
      head: columns.map((column) => (
        <td
          key={column.dataKey}
          className="ReactVirtualized__Table__headerColumn"
          role="columnheader"
          style={{
            overflow: 'hidden',
            flex: `0 1 ${column.width}px`,
          }}
        >
          {column.headerRenderer(column)}
        </td>
      )),
      body:
        data &&
        data.map((row, rowIndex) => (
          <TableRow
            onClick={(e) =>
              onRowClick &&
              onRowClick({
                rowData: row,
                index: rowIndex,
                event: e,
              })
            }
            key={rowIndex}
            className="ReactVirtualized__Table__row"
          >
            {columns.map((column, columnIndex) => (
              <td
                key={rowIndex + column.dataKey}
                className="ReactVirtualized__Table__rowColumn"
                role="gridcell"
                style={{
                  overflow: 'hidden',
                  flex: `0 1 ${column.width}px`,
                }}
              >
                {column.cellRenderer({
                  cellData: row[column.dataKey],
                  columnData: column,
                  columnIndex,
                  dataKey: column.dataKey,
                  isScrolling: false,
                  rowData: row,
                  rowIndex,
                })}
              </td>
            ))}
          </TableRow>
        )),
    }
  }, [columns, data, onRowClick])

  return (
    <ROOT className="table basic-table">
      <Table>
        <TableHead>
          <TableRow className="ReactVirtualized__Table__headerRow">{table.head}</TableRow>
        </TableHead>
        <TableBody>{table.body}</TableBody>
      </Table>
    </ROOT>
  )
}

export default BasicTable
