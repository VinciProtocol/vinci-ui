import type { ColumnProps, TableProps } from 'react-virtualized'

export interface BasicTableProps<D = any> {
  columns: TableColumnsProps[]
  rowHeight?: number
  headerHeight?: number
  data: Array<D>
  tableProps?: Partial<TableProps>
}

export type TableColumnsProps = ColumnProps
