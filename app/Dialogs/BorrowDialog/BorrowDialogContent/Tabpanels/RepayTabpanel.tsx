import { useDialogs } from 'domains'
import type { TabPanelBaseProps } from 'app/hoc/tabs/withTabPanel'
import { withTabPanel } from 'app/hoc/tabs/withTabPanel'
import { useControllers } from 'domains'
import { TabValue } from 'app/Dialogs/constants'
import { createUseTabpanel } from 'app/Dialogs/tabpanel/helpers'
import { InterestRate } from '@vinci-protocol/protocol'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'next-i18next'

import InternalTabpanel from './InternalTabpanel'
import { valueToBigNumber } from '@vinci-protocol/math'

const useTabpanel = createUseTabpanel({
  getPostProps: ({ lendingPoolAddress, user, amt, underlyingAsset, isMax }) => ({
    lendingPoolAddress,
    interestRateMode: InterestRate.Variable,
    user,
    reserve: underlyingAsset,
    amount: isMax ? valueToBigNumber(amt).multipliedBy('1.0025') : amt,
  }),
})
const tabpanelKey = TabValue.repay

export const RepayTabpanel = withTabPanel(
  (props: TabPanelBaseProps) => {
    const { lendingPool } = useControllers()
    const { t } = useTranslation()

    const dialogs = useDialogs()
    const { tableData } = dialogs.borrow

    const { balance, balanceInUSD, isWalletBalance } = useMemo(() => {
      if (!tableData) return {}
      const isWalletBalance = tableData.borrowBalance && tableData.borrowBalance.gt(tableData.walletBalance)
      return {
        isWalletBalance,
        balance: isWalletBalance ? tableData.walletBalance : tableData.borrowBalance,
        balanceInUSD: tableData.borrowBalanceInUSD,
      }
    }, [tableData])

    const getIsMax = useCallback(
      (value: string, balance: string) => {
        if (isWalletBalance) return false
        return value === balance
      },
      [isWalletBalance]
    )

    const tab = useTabpanel({
      tabpanelKey,
      balance,
      props,
      dialog: dialogs.borrow,
      req: lendingPool.repay,
      balanceInUSD,
      text: t('borrow-detail:NFTBorrowPool.availableToRepay'),
      getIsMax,
    })

    return <InternalTabpanel {...tab} />
  },
  {
    tabpanelKey,
  }
)

export default RepayTabpanel
