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
import { useWalletNFTController } from './application/walletNFT'

export const useControllersService = () => {
  const reservesData = useReservesDataController()
  const userReservesData = useUserReservesDataController()
  const walletBalances = useWalletBalanceControllers()
  const walletNFT = useWalletNFTController()

  useChainIDChange({
    controllers: [reservesData, userReservesData, walletNFT],
    ObjectControllers: [walletBalances],
  })

  const lendingPool = useLendingPoolController()
  const erc721 = useERC721Controller()
  const nftTokenCountTables = useCountTablesController()
  const nftTokenTimeLockedTables = useTimeLockedTablesController()
  const oracleController = useOracleController()

  const pageProcess = usePageProgressController()

  return {
    reservesData,
    userReservesData,
    walletBalances,
    walletNFT,
    lendingPool,
    erc721,
    pageProcess,
    nftTokenCountTables,
    nftTokenTimeLockedTables,
    oracleController,
  }
}

const { Provider: ControllersProvider, createUseContext } = createContext(useControllersService)

export const createControllersContext = createUseContext
export default ControllersProvider
