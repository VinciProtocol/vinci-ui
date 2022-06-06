import { usePageProgressController } from 'store/progress/page'
import { createContext } from 'utils/createContext'

import { useChainIDChange } from './application/chainIDChange'
import { useERC721Controller } from './application/erc721'
import { useLendingPoolController } from './application/lendingPool'
import { useReservesDataController } from './application/reservesData'
import { useUserReservesDataController } from './application/userReservesData'
import { useCountTablesController } from './application/thegraph/nftToken/countTables'
import { useTimeLockedTablesController } from './application/thegraph/nftToken/timeLockedTables'
import { useOracleController } from './application/oracle'
import { useWalletBalanceControllers } from './application/walletBalance'

import {
  useWalletNFTController1,
  useWalletNFTController2,
  useWalletNFTController3,
  useWalletNFTController4,
  useWalletNFTController5,
  useWalletNFTController6,
  useWalletNFTController7,
  useWalletNFTController8,
  useWalletNFTController9,
  useWalletNFTController10,
} from './application/walletNFT'

export const useControllersService = () => {
  const reservesData = useReservesDataController()
  const userReservesData = useUserReservesDataController()
  const walletBalances = useWalletBalanceControllers()
  const walletNFT1 = useWalletNFTController1()
  const walletNFT2 = useWalletNFTController2()
  const walletNFT3 = useWalletNFTController3()
  const walletNFT4 = useWalletNFTController4()
  const walletNFT5 = useWalletNFTController5()
  const walletNFT6 = useWalletNFTController6()
  const walletNFT7 = useWalletNFTController7()
  const walletNFT8 = useWalletNFTController8()
  const walletNFT9 = useWalletNFTController9()
  const walletNFT10 = useWalletNFTController10()

  useChainIDChange({
    controllers: [
      reservesData,
      userReservesData,
      walletNFT1,
      walletNFT2,
      walletNFT3,
      walletNFT4,
      walletNFT5,
      walletNFT6,
    ],
    ObjectControllers: [walletBalances],
  })

  const lendingPool = useLendingPoolController()
  const erc721 = useERC721Controller()
  const nftTokenCountTablesController = useCountTablesController()
  const nftTokenTimeLockedTablesController = useTimeLockedTablesController()
  const oracleController = useOracleController()

  const pageProcess = usePageProgressController()

  return {
    reservesData,
    userReservesData,
    walletBalances,
    walletNFT1,
    walletNFT2,
    walletNFT3,
    walletNFT4,
    walletNFT5,
    walletNFT6,
    walletNFT7,
    walletNFT8,
    walletNFT9,
    walletNFT10,
    lendingPool,
    erc721,
    pageProcess,
    nftTokenCountTablesController,
    nftTokenTimeLockedTablesController,
    oracleController,
  }
}

const { Provider: ControllersProvider, createUseContext } = createContext(useControllersService)

export const createControllersContext = createUseContext
export default ControllersProvider
