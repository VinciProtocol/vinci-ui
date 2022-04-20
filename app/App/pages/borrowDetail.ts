import { createUseTabs } from 'utils/tabs'

export enum NFTTabValue {
  'deposit' = 'depositNFT',
  'borrow' = 'borrow',
  'wallet' = 'wallet',
}
const useNFTTabs = createUseTabs([NFTTabValue.wallet, NFTTabValue.deposit], 'borrow-detail:NFT.tabs.')
const useBorrowPoolTabs = createUseTabs([NFTTabValue.borrow, NFTTabValue.deposit], 'borrow-detail:tabs.')
export const useBorrowDetail = () => {
  const NTFTabs = useNFTTabs()
  const borrowPoolTabs = useBorrowPoolTabs()
  return {
    NTFTabs,
    borrowPoolTabs,
  }
}
