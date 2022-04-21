import { useDialogs } from 'domains'
import { useTranslation } from 'next-i18next'
import type { TabPanelBaseProps } from 'app/hoc/tabs/withTabPanel'
import { withTabPanel } from 'app/hoc/tabs/withTabPanel'
import { useControllers } from 'domains'
import { TabValue } from 'app/Dialogs/constants'
import { createUseTabpanel } from 'app/Dialogs/tabpanel/helpers'
import { useMemo } from 'react'

import InternalTabpanel from './InternalTabpanel'

const useTabpanel = createUseTabpanel({
  getPostProps: ({ lendingPoolAddress, user, amt, underlyingAsset, isApproved }) => ({
    lendingPoolAddress,
    user,
    reserve: underlyingAsset,
    amount: amt,
    isOnlyApprove: !isApproved,
  }),
})
const tabpanelKey = TabValue.deposit

export const DepositTabpanel = withTabPanel(
  (props: TabPanelBaseProps) => {
    const { lendingPool } = useControllers()
    const { t } = useTranslation()

    const dialogs = useDialogs()
    const { tableData } = dialogs.deposit

    const { balance, balanceInUSD } = useMemo(() => {
      if (!tableData) return {}
      return {
        balance: tableData.walletBalance,
        balanceInUSD: tableData.underlyingBalanceInUSD,
      }
    }, [tableData])

    const tab = useTabpanel({
      tabpanelKey,
      balance,
      props,
      dialog: dialogs.deposit,
      req: lendingPool.deposit,
      balanceInUSD,
      text: t('lend:lendingPools.walletBalance'),
    })

    return <InternalTabpanel {...tab} />
  },
  {
    tabpanelKey,
  }
)

export default DepositTabpanel
