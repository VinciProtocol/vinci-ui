import type { FC } from 'react'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import LockTwoTone from '@mui/icons-material/LockTwoTone'
import { useTheme } from '@mui/material/styles'
import { useContractData } from 'domains'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import NumberDisplay from 'components/math/NumberDisplay'
import TVLItem from './TVLItem'
import type { TVLProps } from './types'

const TVL: FC<TVLProps> = () => {
  const { t } = useTranslation('my-dashboard')
  const theme = useTheme()
  const ROOT = useMemoEmpty(() =>
    styled(Stack)(({ theme }) => ({
      minHeight: '136px',
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
  }> = ({ title, value }) => (
    <Fragment>
      <TableCell>
        <SubTitle>{t(`TVL.${title}`)}</SubTitle>
      </TableCell>
      <TableCell>
        <Typography variant="h6" color={theme.palette.grey[500]}>
          <NumberDisplay
            sx={{
              width: '1.125rem',
              height: '1.125rem',
            }}
            value={value}
            type="network"
          />
        </Typography>
      </TableCell>
    </Fragment>
  )
  const Left = useMemoEmpty(() =>
    styled(Stack)(({ theme }) => ({
      minWidth: theme.spacing(30),
    }))
  )

  const { dashboard } = useContractData()

  return (
    <ROOT direction="row" spacing={2}>
      <TVLItem>
        <Left spacing={1}>
          <Title>
            <Stack spacing={1} direction="row">
              <LockTwoTone color="primary" />
              <span>{t('TVL.totalValueLocked')}</span>
            </Stack>
          </Title>
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
        </Left>
        <Table>
          <TableRow>
            <TitleTableCell title="totalSupply" value={dashboard.totalValueLocked} />
          </TableRow>
          <TableRow>
            <TitleTableCell title="totalBorrowed" value={dashboard.totalBorrowed} />
          </TableRow>
          <TableRow>
            <TitleTableCell title="nftCollaterals" value={dashboard.totalCollateralledValue} />
          </TableRow>
        </Table>
      </TVLItem>
    </ROOT>
  )
}

export default TVL
