import { createUseTabs } from 'utils/tabs'

export enum LockdropDepositTabValue {
  'wallet' = 'wallet',
  'lockedNFT' = 'lockedNFT',
}

const useLockdropDepositTabs = createUseTabs(
  [LockdropDepositTabValue.wallet, LockdropDepositTabValue.lockedNFT],
  (key) => `nft-lockdrop-deposit:tabs.${key}.title`
)

export const useLockdropDeposit = () => {
  const lockdropDepositTabs = useLockdropDepositTabs()
  return {
    lockdropDepositTabs,
  }
}
