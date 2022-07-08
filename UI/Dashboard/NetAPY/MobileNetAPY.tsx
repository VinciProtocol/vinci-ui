import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import TableCell from '@mui/material/TableCell'
import InsertChartTwoTone from '@mui/icons-material/InsertChartTwoTone'
import { useContractData } from 'domains'

import NumberDisplay from 'components/math/NumberDisplay'

import TitleTableCell, { ROOT, Title } from '../common/TitleTableCell'

import NetAPYItem from './NetAPYItem'
import type { NetAPYProps } from './types'

const MobileNetAPY: FC<NetAPYProps> = () => {
  const { t } = useTranslation('dashboard')

  const { dashboard } = useContractData()

  return (
    <ROOT>
      <NetAPYItem>
        <Table sx={{ width: '100%' }}>
          <TableRow sx={{ height: '60px' }}>
            <TableCell>
              <Title>
                <Stack spacing={1} direction="row">
                  <InsertChartTwoTone color="primary" />
                  <span>{t('NetAPY.yourNetAPY')}</span>
                </Stack>
              </Title>
            </TableCell>
            <TableCell>
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
            </TableCell>
          </TableRow>
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

export default MobileNetAPY
