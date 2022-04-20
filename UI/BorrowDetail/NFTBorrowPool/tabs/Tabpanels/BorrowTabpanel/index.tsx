import { NFTTabValue } from 'app/App/pages/borrowDetail'
import { withTabPanel } from 'app/hoc/tabs/withTabPanel'
import BasicTable from 'lib/table/BasicTable'
import { useTable } from './useTable'

const BorrowTabpanel = withTabPanel(
  (props) => {
    const { TabPanel } = props
    const table = useTable()

    return (
      <TabPanel>
        <BasicTable {...table} />
      </TabPanel>
    )
  },
  {
    tabpanelKey: NFTTabValue.borrow,
  }
)

export default BorrowTabpanel
