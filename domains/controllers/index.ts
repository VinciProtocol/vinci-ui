import { usePageProgressController } from 'store/progress/page'
import { useVinciControllers } from '@vinci-protocol/domains'
import { createContext } from 'utils/createContext'

import { useChainIDChange } from './application/chainIDChange'
import { useWalletBalanceControllers } from './application/walletBalance'
import { useWalletNFTController } from './application/walletNFT'

import { useOracleRecordsController } from './application/thegraph/oracleRecords'

export const useControllersService = () => {
  const { reservesData, userReservesData, lendingPool, erc721 } = useVinciControllers()
  const walletBalances = useWalletBalanceControllers()
  const walletNFT = useWalletNFTController()

  useChainIDChange({
    controllers: [reservesData, userReservesData, walletNFT],
    ObjectControllers: [walletBalances],
  })

  const pageProcess = usePageProgressController()
  const oracleRecords = useOracleRecordsController()

  return {
    reservesData,
    userReservesData,
    walletBalances,
    walletNFT,
    lendingPool,
    erc721,
    pageProcess,
    oracleRecords,
  }
}

const { Provider: ControllersProvider, createUseContext } = createContext(useControllersService)

export const createControllersContext = createUseContext
export default ControllersProvider
