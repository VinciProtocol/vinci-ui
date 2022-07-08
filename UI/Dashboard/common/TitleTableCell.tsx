import type { FC } from 'react'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import NumberDisplay from 'components/math/NumberDisplay'

type TitleTableCellProps = {
  title: string
  value: any
  isPercent?: boolean
}

const TitleTableCell: FC<TitleTableCellProps> = ({ title, value, isPercent }) => {
  const { t } = useTranslation('my-dashboard')
  const theme = useTheme()
  const SubTitle = useMemoEmpty(() =>
    styled('p')(({ theme }) => ({
      ...theme.typography.subtitle1,
      color: theme.palette.text.secondary,
    }))
  )
  const type = isPercent ? '' : 'network'
  const options = isPercent ? 'percent' : 'number'

  return (
    <Fragment>
      <TableCell>
        <SubTitle>{t(title)}</SubTitle>
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

export const ROOT = styled(Stack)(({ theme }) => ({
  minHeight: '136px',
  ['.MuiSvgIcon-root']: {
    fontSize: theme.typography.pxToRem(30),
  },
  ['.MuiTableCell-root']: {
    borderBottom: 'unset',
    padding: '0',
  },
}))

export const Title = styled('p')(({ theme }) => ({
  ...theme.typography.subtitle1,
  color: theme.palette.text.primary,
}))

export const Left = styled(Stack)(({ theme }) => ({
  minWidth: theme.spacing(35),
}))

export default TitleTableCell
