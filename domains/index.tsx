import type { FC } from 'react'
import SocketProvider from 'lib/dev/socket/domain'
import MarketProvider, { createMarketContext } from 'domains/market'
import ContractProvider from 'domains/contract'
import ContractDataProvider, { createContractDataContext, createContractNFTContext } from './contractData'

import DialogsProvider, { createDialogsContext } from './dialogs'
import ControllersProvider, { createControllersContext } from './controllers'

const Provider: FC = ({ children }) => {
  return (
    <MarketProvider>
      <ContractProvider>
        <ContractDataProvider>
          <ControllersProvider>
            <DialogsProvider>{children}</DialogsProvider>
          </ControllersProvider>
        </ContractDataProvider>
      </ContractProvider>
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
export const useDialogs = createDialogsContext()
export const useControllers = createControllersContext()
export const useMarket = createMarketContext()
