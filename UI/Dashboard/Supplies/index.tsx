import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import NoOpenPosition from '../common/NoOpenPosition'
import BasicTable from 'lib/table/BasicTable'
import { useTable } from './useTable'

const Supplies: FC = () => {
  const { t } = useTranslation()
  const table = useTable()
  const Title = useMemoEmpty(() =>
    styled(Typography)(({ theme }) => ({
      padding: theme.spacing(3),
    }))
  )
  const ROOT = useMemoEmpty(
    () => styled(Paper)`
      border-radius: 10px;
      .basic-table {
        min-height: 260px;
      }
    `
  )

  return (
    <ROOT variant="card">
      <Stack spacing={2}>
        <Title variant="h5">{t('my-dashboard:supplies.title')}</Title>
        {table.data.length ? <BasicTable {...table} /> : <NoOpenPosition />}
      </Stack>
    </ROOT>
  )
}

export default Supplies
