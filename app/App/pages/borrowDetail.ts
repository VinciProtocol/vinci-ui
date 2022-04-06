import { createUseTabs } from 'utils/tabs'
import { TabValue } from 'app/Dialogs/constants'
export enum NFTTabValue {
  'deposit' = 'deposit',
  'wallet' = 'wallet',
}
const useNFTTabs = createUseTabs([NFTTabValue.wallet, NFTTabValue.deposit], 'borrow-detail:NFT.tabs.')
const useBorrowPoolTabs = createUseTabs([TabValue.borrow, TabValue.deposit])
export const useBorrowDetail = () => {
  const NTFTabs = useNFTTabs()
  const borrowPoolTabs = useBorrowPoolTabs()
  return {
    NTFTabs,
    borrowPoolTabs,
  }
}
