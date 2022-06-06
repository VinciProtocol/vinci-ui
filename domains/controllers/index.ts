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
import { useWalletNFTControllers } from './application/walletNFT'

export const useControllersService = () => {
  const reservesData = useReservesDataController()
  const userReservesData = useUserReservesDataController()
  const walletBalances = useWalletBalanceControllers()
  const walletNFTs = useWalletNFTControllers()

  useChainIDChange({
    controllers: [reservesData, userReservesData],
    ObjectControllers: [walletBalances, walletNFTs],
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
    walletNFTs,
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
