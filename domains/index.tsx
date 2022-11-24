import type { FC } from 'react'
import SocketProvider from 'lib/dev/socket/domain'
import MarketProvider, { createMarketContext } from 'domains/market'
import ContractDataProvider, { createContractDataContext, createContractNFTContext } from './contractData'
import ThegraphProvider, { createThegraphContext } from './thegraph'
import DialogsProvider, { createDialogsContext } from './dialogs'
import ControllersProvider, { createControllersContext } from './controllers'
import VinciSDKProvider from './vinciSDK'

const Provider: FC = ({ children }) => {
  return (
    <MarketProvider>
      <VinciSDKProvider>
        <ContractDataProvider>
          <ThegraphProvider>
            <ControllersProvider>
              <DialogsProvider>{children}</DialogsProvider>
            </ControllersProvider>
          </ThegraphProvider>
        </ContractDataProvider>
      </VinciSDKProvider>
    </MarketProvider>
  )
}

const DevProvider: FC = ({ children }) => {
  return (
    <SocketProvider>
      <Provider>{children}</Provider>
    </SocketProvider>
  )
}

export default __DEV__ ? DevProvider : Provider

export const useContractData = createContractDataContext()
export const useContractNFT = createContractNFTContext()
export const useThegraph = createThegraphContext()
export const useDialogs = createDialogsContext()
export const useControllers = createControllersContext()
export const useMarket = createMarketContext()
