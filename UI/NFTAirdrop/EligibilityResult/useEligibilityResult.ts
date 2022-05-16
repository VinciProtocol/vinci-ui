import { useWallet } from 'app/wallet'
import { useEffect, useMemo, useState } from 'react'
import claimableNFT from 'lib/protocol/vinci-claimable-nft/fe.json'

const list: any = claimableNFT
type EligibilityResultStatus = 'eligible' | 'notEligible' | 'needAccount'

export const useEligibilityResult = () => {
  const { account: walletAccount } = useWallet()
  const [inputAccount, setInputAccount] = useState('')
  useEffect(() => {
    setInputAccount('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAccount])
  const account = useMemo(() => inputAccount || walletAccount, [inputAccount, walletAccount])

  const status = useMemo(() => {
    if (!account) return 'needAccount'
    if (list[account]) return 'eligible'
    return 'notEligible'
  }, [account]) as EligibilityResultStatus

  return {
    account,
    status,
    setInputAccount,
  }
}
