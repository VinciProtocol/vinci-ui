import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import InsertChartTwoTone from '@mui/icons-material/InsertChartTwoTone'
import { useContractData } from 'domains'

import NumberDisplay from 'components/math/NumberDisplay'

import TitleTableCell, { ROOT, Title, Left } from '../common/TitleTableCell'

import NetAPYItem from './NetAPYItem'
import type { NetAPYProps } from './types'

const PCNetAPY: FC<NetAPYProps> = () => {
  const { t } = useTranslation('my-dashboard')

  const { dashboard } = useContractData()

  return (
    <ROOT direction="row" spacing={2}>
      <NetAPYItem>
        <Left>
          <Title>
            <Stack spacing={1} direction="row">
              <InsertChartTwoTone color="primary" />
              <span>{t('NetAPY.yourNetAPY')}</span>
            </Stack>
          </Title>
          <Typography variant="h4">
            <NumberDisplay
              sx={{
                width: '2.125rem',
                height: '2.125rem',
                marginRight: '8px',
              }}
              value={dashboard.netAPY}
              options="percent"
            />
          </Typography>
        </Left>
        <Table>
          <TableRow>
            <TitleTableCell title="NetAPY.yourSupplies" value={dashboard.supplyBalance} />
          </TableRow>
          <TableRow>
            <TitleTableCell title="NetAPY.yourLoans" value={dashboard.borrowBalance} />
          </TableRow>
        </Table>
      </NetAPYItem>
    </ROOT>
  )
}

export default PCNetAPY
