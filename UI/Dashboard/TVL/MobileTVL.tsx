import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import LockTwoTone from '@mui/icons-material/LockTwoTone'
import { useVinciContractData } from '@vinci-protocol/domains'

import NumberDisplay from 'components/math/NumberDisplay'

import TitleTableCell, { ROOT, Title } from '../common/TitleTableCell'

import TVLItem from './TVLItem'
import type { TVLProps } from './types'

const PCTVL: FC<TVLProps> = () => {
  const { t } = useTranslation('dashboard')

  const { dashboard } = useVinciContractData()

  return (
    <ROOT direction="row" spacing={2}>
      <TVLItem>
        <Table sx={{ width: '100%' }}>
          <TableRow sx={{ height: '60px' }}>
            <TableCell>
              <Title>
                <Stack spacing={1} direction="row">
                  <LockTwoTone color="primary" />
                  <span>{t('TVL.totalValueLocked')}</span>
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
                  value={dashboard.TVL}
                  type="network"
                />
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TitleTableCell title="TVL.totalSupply" value={dashboard.totalValueLocked} />
          </TableRow>
          <TableRow>
            <TitleTableCell title="TVL.totalBorrowed" value={dashboard.totalBorrowed} />
          </TableRow>
          <TableRow>
            <TitleTableCell title="TVL.nftCollaterals" value={dashboard.totalCollateralledValue} />
          </TableRow>
        </Table>
      </TVLItem>
    </ROOT>
  )
}

export default PCTVL
