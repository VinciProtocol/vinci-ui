import { useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { TableCellRenderer } from 'react-virtualized'
import { useRouter } from 'next/router'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TableCell from '@mui/material/TableCell'
import { useDialogs, useThegraph } from 'domains'

import type { TableColumnsProps, BasicTableProps } from 'lib/table/BasicTable/types'
import { useWallet } from 'app/wallet'
import {
  leftHeaderRenderer,
  headerRenderer,
  collectionCellRenderer,
  collectionHeaderRenderer,
  cellRenderer,
  VCICellRenderer,
  BalanceCellRenderer,
  totalLockedNFTCellRenderer,
} from 'components/Table'

export const useTable = (): BasicTableProps => {
  const router = useRouter()
  const { t } = useTranslation('nft-lockdrop')
  const { account } = useWallet()

  const { actions } = useDialogs()
  const { nftAssetsTimeLocked } = useThegraph()

  const FunctionButtonsCellRenderer: TableCellRenderer = useCallback(
    ({ rowData }) => {
      return (
        <TableCell component="div">
          <Stack spacing={2} direction="row">
            <Button
              variant="outlined"
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                e.nativeEvent.stopImmediatePropagation()
                router.push({
                  pathname: '/nft-lockdrop/[id]',
                  query: { id: rowData.underlyingAsset },
                })
              }}
            >
              {t('NFTLockdropRewards.actions.depositNFT')}
            </Button>
          </Stack>
        </TableCell>
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, actions]
  )

  const columns = useMemo(
    () =>
      (
        [
          {
            dataKey: 'collection',
            width: 250,
            headerRenderer: collectionHeaderRenderer,
            cellRenderer: collectionCellRenderer,
          },
          {
            dataKey: 'TVL',
            width: 200,
            headerRenderer,
            cellRenderer: BalanceCellRenderer,
          },
          {
            dataKey: 'totalLockedNFT',
            width: 200,
            headerRenderer,
            cellRenderer: totalLockedNFTCellRenderer,
          },
          {
            dataKey: 'userLockedNFT',
            width: 200,
            headerRenderer,
            cellRenderer,
          },
          {
            dataKey: 'estmatedRewards',
            width: 200,
            headerRenderer,
            cellRenderer: VCICellRenderer,
          },
          {
            dataKey: 'functionButtons',
            width: 250,
            headerRenderer: leftHeaderRenderer,
            cellRenderer: FunctionButtonsCellRenderer,
          },
        ] as Array<
          TableColumnsProps & {
            hide?: boolean
          }
        >
      )
        .filter((column) => !column.hide)
        .map((column) => {
          column.label = t('NFTLockdropRewards.' + column.dataKey)
          return column
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, account]
  )

  const tableProps: BasicTableProps['tableProps'] = useMemo(
    () => ({
      onRowClick: ({ rowData }) => {
        router.push({
          pathname: '/nft-lockdrop/[id]',
          query: { id: rowData.underlyingAsset },
        })
      },
    }),
    [router]
  )

  return {
    columns,
    data: nftAssetsTimeLocked,
    tableProps,
  }
}
