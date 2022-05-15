import { useWallet } from 'app/wallet'
import { useMemo } from 'react'

type EligibilityResultStatus = 'eligible' | 'loading' | 'notEligible' | 'needAccount'

export const useEligibilityResult = () => {
  const { account } = useWallet()
  const status = useMemo(() => {
    if (!account) return 'needAccount'
    return 'notEligible'
  }, [account])

  return {
    status,
  } as {
    status: EligibilityResultStatus
  }
}
