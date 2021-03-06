import { useMemo } from 'react'
import { styled } from '@mui/material/styles'

import { withTabPanel } from 'app/hoc/tabs/withTabPanel'
import { NFTTabValue } from 'app/App/pages/borrowDetail'

import TabTitle from './tabs/TabTitle'
import TabContent from './tabs/TabContent'

const DepositTabpanel = withTabPanel(
  (props) => {
    const { TabPanel } = props
    const ROOT = useMemo(
      () =>
        styled(TabPanel)(({ theme }) => ({
          padding: theme.spacing(2),
          paddingTop: 0,
        })),
      [TabPanel]
    )
    return (
      <ROOT>
        <TabTitle />
        <TabContent />
      </ROOT>
    )
  },
  {
    tabpanelKey: NFTTabValue.deposit,
  }
)

export default DepositTabpanel
