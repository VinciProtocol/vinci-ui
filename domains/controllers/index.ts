import { createContext } from 'utils/createContext'

import { useChainIDChange } from './application/chainIDChange'
import { useERC721Controller } from './application/erc721'
import { useLendingPoolController } from './application/lendingPool'
import { useReservesDataController } from './application/reservesData'
import { useUserReservesDataController } from './application/userReservesData'
import {
  useWalletBalanceController1,
  useWalletBalanceController2,
  useWalletBalanceController3,
} from './application/walletBalance'
import { useWalletNFTController1, useWalletNFTController2, useWalletNFTController3 } from './application/walletNFT'

export const useControllersService = () => {
  const reservesData = useReservesDataController()
  const userReservesData = useUserReservesDataController()
  const walletBalance1 = useWalletBalanceController1()
  const walletBalance2 = useWalletBalanceController2()
  const walletBalance3 = useWalletBalanceController3()
  const walletNFT1 = useWalletNFTController1()
  const walletNFT2 = useWalletNFTController2()
  const walletNFT3 = useWalletNFTController3()

  useChainIDChange({
    controllers: [
      reservesData,
      userReservesData,
      walletBalance1,
      walletBalance2,
      walletBalance3,
      walletNFT1,
      walletNFT2,
      walletNFT3,
    ],
  })

  const lendingPool = useLendingPoolController()
  const erc721 = useERC721Controller()

  return {
    reservesData,
    userReservesData,
    walletBalance1,
    walletBalance2,
    walletBalance3,
    walletNFT1,
    walletNFT2,
    walletNFT3,
    lendingPool,
    erc721,
  }
}

const { Provider: ControllersProvider, createUseContext } = createContext(useControllersService)

export const createControllersContext = createUseContext
export default ControllersProvider