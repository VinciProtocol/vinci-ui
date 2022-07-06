import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import BasicTable from 'lib/table/BasicTable'
import { useNFTCollateralCollections } from './useNFTCollateralCollections'
import type { NFTCollateralCollectionsProps } from './types'

const NFTCollateralCollections: FC<NFTCollateralCollectionsProps> = () => {
  const { t } = useTranslation()
  const { table } = useNFTCollateralCollections()
  const Title = useMemoEmpty(() =>
    styled(Typography)(({ theme }) => ({
      padding: theme.spacing(2),
    }))
  )
  const ROOT = useMemoEmpty(
    () => styled(Paper)`
      .ReactVirtualized__Table__row:hover {
        cursor: pointer;
      }
    `
  )

  return (
    <ROOT variant="card">
      <Stack spacing={2}>
        <Title variant="h5">{t('borrow:NFTCollateralCollections.title')}</Title>
        <BasicTable {...table} />
      </Stack>
    </ROOT>
  )
}

export default NFTCollateralCollections
