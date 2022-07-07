import type { FC } from 'react'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import InsertChartTwoTone from '@mui/icons-material/InsertChartTwoTone'
import { useTheme } from '@mui/material/styles'
import { useContractData } from 'domains'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import NumberDisplay from 'components/math/NumberDisplay'
import NetAPYItem from './NetAPYItem'
import type { NetAPYProps } from './types'

const NetAPY: FC<NetAPYProps> = () => {
  const { t } = useTranslation('my-dashboard')
  const theme = useTheme()
  const ROOT = useMemoEmpty(() =>
    styled(Stack)(({ theme }) => ({
      ['.MuiSvgIcon-root']: {
        fontSize: theme.typography.pxToRem(30),
      },
      ['.MuiTableCell-root']: {
        borderBottom: 'unset',
        padding: '0',
      },
    }))
  )
  const SubTitle = useMemoEmpty(() =>
    styled('p')(({ theme }) => ({
      ...theme.typography.h6,
      fontSize: theme.typography.pxToRem(18),
      color: theme.palette.grey[500],
    }))
  )
  const Title = useMemoEmpty(() =>
    styled('p')(({ theme }) => ({
      ...theme.typography.h6,
      color: theme.palette.grey[500],
    }))
  )

  const TitleTableCell: FC<{
    title: string
    value: any
    isPercent?: boolean
  }> = ({ title, value, isPercent }) => {
    const type = isPercent ? '' : 'network'
    const options = isPercent ? 'percent' : 'number'
    return (
      <Fragment>
        <TableCell>
          <SubTitle>{t(`NetAPY.${title}`)}</SubTitle>
        </TableCell>
        <TableCell>
          <Typography variant="h6" color={theme.palette.grey[500]}>
            <NumberDisplay
              sx={{
                width: '1.125rem',
                height: '1.125rem',
              }}
              value={value}
              type={type}
              options={options}
            />
          </Typography>
        </TableCell>
      </Fragment>
    )
  }

  const { dashboard } = useContractData()

  return (
    <ROOT direction="row" spacing={2}>
      <NetAPYItem>
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
        <Table>
          <TableRow>
            <TitleTableCell title="yourSupplies" value={dashboard.supplyBalance} />
          </TableRow>
          <TableRow>
            <TitleTableCell title="yourLoans" value={dashboard.borrowBalance} />
          </TableRow>
        </Table>
      </NetAPYItem>
    </ROOT>
  )
}

export default NetAPY
