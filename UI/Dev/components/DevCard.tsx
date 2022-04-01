import type { FC } from 'react'
import { useMemo } from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import type { TableColumnsProps } from 'lib/table/BasicTable'
import { headerRenderer, cellRenderer } from 'components/Table'
import BasicTable from 'lib/table/BasicTable'

type DevCardProps = {
  title: string
  data: any[]
}

export const DevCard: FC<DevCardProps> = ({ title, data }) => {
  const columns = useMemo(
    () =>
      [
        {
          dataKey: 'path',
          label: '路径',
          width: 300,
          headerRenderer,
          cellRenderer,
        },
        {
          dataKey: 'description',
          label: '说明',
          width: 700,
          headerRenderer,
          cellRenderer,
        },
        {
          dataKey: 'action',
          label: '功能',
          width: 200,
          headerRenderer,
          cellRenderer,
        },
      ] as TableColumnsProps[],
    []
  )

  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <BasicTable
          {...{
            columns,
            data,
          }}
        />
      </CardContent>
    </Card>
  )
}
