import { usePageProgressController } from 'store/progress/page'
import { createContext } from 'utils/createContext'

import { useChainIDChange } from './application/chainIDChange'
import { useERC721Controller } from './application/erc721'
import { useLendingPoolController } from './application/lendingPool'
import { useReservesDataController } from './application/reservesData'
import { useUserReservesDataController } from './application/userReservesData'
import { useCountTablesController } from './application/thegraph/nftToken/countTables'
import { useTimeLockedTablesController } from './application/thegraph/nftToken/timeLockedTables'
import {
  useWalletBalanceController1,
  useWalletBalanceController2,
  useWalletBalanceController3,
  useWalletBalanceController4,
  useWalletBalanceController5,
  useWalletBalanceController6,
} from './application/walletBalance'

import {
  useWalletNFTController1,
  useWalletNFTController2,
  useWalletNFTController3,
  useWalletNFTController4,
  useWalletNFTController5,
  useWalletNFTController6,
} from './application/walletNFT'

export const useControllersService = () => {
  const reservesData = useReservesDataController()
  const userReservesData = useUserReservesDataController()
  const walletBalance1 = useWalletBalanceController1()
  const walletBalance2 = useWalletBalanceController2()
  const walletBalance3 = useWalletBalanceController3()
  const walletBalance4 = useWalletBalanceController4()
  const walletBalance5 = useWalletBalanceController5()
  const walletBalance6 = useWalletBalanceController6()
  const walletNFT1 = useWalletNFTController1()
  const walletNFT2 = useWalletNFTController2()
  const walletNFT3 = useWalletNFTController3()
  const walletNFT4 = useWalletNFTController4()
  const walletNFT5 = useWalletNFTController5()
  const walletNFT6 = useWalletNFTController6()

  useChainIDChange({
    controllers: [
      reservesData,
      userReservesData,
      walletBalance1,
      walletBalance2,
      walletBalance3,
      walletBalance4,
      walletBalance5,
      walletBalance6,
      walletNFT1,
      walletNFT2,
      walletNFT3,
      walletNFT4,
      walletNFT5,
      walletNFT6
    ],
  })

  const lendingPool = useLendingPoolController()
  const erc721 = useERC721Controller()
  const nftTokenCountTablesController = useCountTablesController()
  const nftTokenTimeLockedTablesController = useTimeLockedTablesController()

  const pageProcess = usePageProgressController()

  return {
    reservesData,
    userReservesData,
    walletBalance1,
    walletBalance2,
    walletBalance3,
    walletBalance4,
    walletBalance5,
    walletNFT1,
    walletNFT2,
    walletNFT3,
    lendingPool,
    erc721,
    pageProcess,
    nftTokenCountTablesController,
    nftTokenTimeLockedTablesController,
  }
}

const { Provider: ControllersProvider, createUseContext } = createContext(useControllersService)

export const createControllersContext = createUseContext
export default ControllersProvider
