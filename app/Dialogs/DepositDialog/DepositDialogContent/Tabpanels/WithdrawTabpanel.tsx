import { useDialogs } from 'domains'
import type { TabPanelBaseProps } from 'app/hoc/tabs/withTabPanel'
import { withTabPanel } from 'app/hoc/tabs/withTabPanel'
import { useControllers } from 'domains'
import { TabValue } from 'app/Dialogs/constants'
import { createUseTabpanel } from 'app/Dialogs/tabpanel/helpers'
import { useMemo } from 'react'
import { useTranslation } from 'next-i18next'

import InternalTabpanel from './InternalTabpanel'

const useTabpanel = createUseTabpanel({
  getPostProps: ({ lendingPoolAddress, user, amt, underlyingAsset, isMax, vTokenAddress }) => ({
    lendingPoolAddress,
    user,
    reserve: underlyingAsset,
    amount: isMax ? '-1' : amt,
    vTokenAddress,
  }),
})
const tabpanelKey = TabValue.withdraw

export const WithdrawTabpanel = withTabPanel(
  (props: TabPanelBaseProps) => {
    const { lendingPool } = useControllers()
    const { t } = useTranslation()

    const dialogs = useDialogs()
    const { tableData } = dialogs.deposit

    const { balance, balanceInUSD } = useMemo(() => {
      if (!tableData) return {}
      return {
        balance: tableData.underlyingBalance,
        balanceInUSD: tableData.underlyingBalanceInUSD,
      }
    }, [tableData])

    const tab = useTabpanel({
      tabpanelKey,
      balance,
      props,
      dialog: dialogs.deposit,
      req: lendingPool.withdraw,
      balanceInUSD,
      text: t('lend:lendingPools.available'),
    })

    return <InternalTabpanel {...tab} />
  },
  {
    tabpanelKey,
  }
)

export default WithdrawTabpanel
