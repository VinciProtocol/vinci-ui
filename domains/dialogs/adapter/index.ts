import { createUseTabs } from 'utils/tabs'
import { useAppSelector } from 'store'
import { vinciSDKReducers } from '@vinci-protocol/store'
const { select } = vinciSDKReducers.contract.erc20.isApproved
import { TabValue } from 'app/Dialogs/constants'
import { useState, useCallback, useMemo } from 'react'

type GetUseBorrowDialogProps = {
  list: TabValue[]
}

export const getUseDialog = (props: GetUseBorrowDialogProps) => {
  const { list } = props
  const useTabs = createUseTabs(list)
  return (data: any) => {
    const [row, setRow] = useState<any>({} as any)
    const [visible, setVisible] = useState(false)

    const tabs = useTabs()

    const open = useCallback((tabsValue, row) => {
      tabs.setTab(tabsValue)
      setRow(row)
      setVisible(true)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const close = useCallback(() => {
      setVisible(false)
    }, [])

    const tableData = useMemo(() => {
      if (!row || !row.underlyingAsset || !data) return
      return data.find(({ underlyingAsset, id }: any) => underlyingAsset === row.underlyingAsset && id === row.id)
    }, [data, row])

    const { data: erc20IsApproved } = useAppSelector(select)

    const isApproved = useMemo(() => {
      if (tabs.value != TabValue.deposit) return true
      if (!row || !row.underlyingAsset || !erc20IsApproved) return false
      const { underlyingAsset, lendingPoolAddress } = row
      return erc20IsApproved[`${lendingPoolAddress}-${underlyingAsset}`]
    }, [erc20IsApproved, row, tabs.value])

    return { visible, tabs, open, close, row, tableData, isApproved }
  }
}
