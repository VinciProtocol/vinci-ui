import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import BasicTable from 'lib/table/BasicTable'
import { useNFTLockdropRewards } from './useNFTLockdropRewards'
import type { NFTLockdropRewardsProps } from './types'

const NFTLockdropRewards: FC<NFTLockdropRewardsProps> = () => {
  const { t } = useTranslation('nft-lockdrop')
  const { table } = useNFTLockdropRewards()
  const Title = useMemoEmpty(() =>
    styled(Typography)(({ theme }) => ({
      padding: theme.spacing(3),
    }))
  )
  const ROOT = useMemoEmpty(
    () => styled(Paper)`
      .basic-table {
        min-height: 360px;
      }
    `
  )

  return (
    <ROOT variant="card">
      <Stack spacing={2}>
        <Title variant="h5">{t('NFTLockdropRewards.title')}</Title>
        <BasicTable {...table} />
      </Stack>
    </ROOT>
  )
}

export default NFTLockdropRewards
