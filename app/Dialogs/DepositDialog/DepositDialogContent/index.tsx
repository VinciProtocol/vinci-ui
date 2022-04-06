import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import DialogContent from '@mui/material/DialogContent'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { useDialogs } from 'domains'
import TabTitle from '../../components/tab/TabTitle'
import TabContent from './TabContent'

const DepositDialogContent: FC = () => {
  const ROOT = useMemoEmpty(() => styled(DialogContent)``)
  const {
    deposit: { tabs },
  } = useDialogs()

  return (
    <ROOT>
      <TabTitle tabs={tabs} />
      <TabContent tabs={tabs} />
    </ROOT>
  )
}

export default DepositDialogContent
