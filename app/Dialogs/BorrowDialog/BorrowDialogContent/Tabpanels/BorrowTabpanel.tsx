import { useDialogs } from 'domains'
import type { TabPanelBaseProps } from 'app/hoc/tabs/withTabPanel'
import { withTabPanel } from 'app/hoc/tabs/withTabPanel'
import { TabValue } from 'app/Dialogs/constants'
import { createUseTabpanel } from 'app/Dialogs/tabpanel/helpers'
import { InterestRate } from '@vinci-protocol/protocol'
import { useMemo } from 'react'
import { useTranslation } from 'next-i18next'

import InternalTabpanel from './InternalTabpanel'
import { useControllers } from 'domains'

const useTabpanel = createUseTabpanel({
  getPostProps: ({ lendingPoolAddress, user, amt, underlyingAsset, variableDebtTokenAddress }) => ({
    lendingPoolAddress,
    interestRateMode: InterestRate.Variable,
    referralCode: undefined,
    user,
    amount: amt,
    reserve: underlyingAsset,
    debtTokenAddress: variableDebtTokenAddress,
  }),
})
const tabpanelKey = TabValue.borrow

export const BorrowTabpanel = withTabPanel(
  (props: TabPanelBaseProps) => {
    const { lendingPool } = useControllers()
    const { t } = useTranslation()

    const dialogs = useDialogs()
    const { tableData } = dialogs.borrow

    const { balance, balanceInUSD } = useMemo(() => {
      if (!tableData) return {}
      return {
        balance: tableData.availableToBorrow,
        balanceInUSD: tableData.borrowBalanceInUSD,
      }
    }, [tableData])

    const tab = useTabpanel({
      tabpanelKey,
      balance,
      props,
      dialog: dialogs.borrow,
      req: lendingPool.borrow,
      balanceInUSD,
      text: t('borrow-detail:NFTBorrowPool.availableToBorrow'),
    })

    return <InternalTabpanel {...tab} />
  },
  {
    tabpanelKey,
  }
)

export default BorrowTabpanel
