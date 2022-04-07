import type { FC } from 'react'
import { Fragment } from 'react'

import { textCenterEllipsis } from 'utils/string/text-center-ellipsis'
import { useWallet } from 'app/wallet'

export const Account: FC = () => {
  const { account } = useWallet()

  return <Fragment>{textCenterEllipsis(account)}</Fragment>
}

export default Account
