import { useMemo } from 'react'
import { createContext } from 'utils/createContext'
import { ERC20Service } from 'lib/protocol/erc20-contract'
import { ERC721Service } from 'lib/protocol/erc721-contract'
import { LendingPoolContract } from 'lib/protocol/lending-pool'
import { UiPoolDataContract } from 'lib/protocol/ui-pool-data'
import { WalletBalanceContract } from 'lib/protocol/wallet-balance'
import { VinciNFTContract } from 'lib/protocol/vinci-claimable-nft'
import { useMarket } from 'domains'

const useContractService = () => {
  const { provider, market } = useMarket()
  const contracts = useMemo(
    () => ({
      lendingPool: new LendingPoolContract(provider, {
        WETH_GATEWAY: market.addresses.WETH_GATEWAY,
      }),
      uiPool: new UiPoolDataContract({
        address: market.addresses.uiPoolDataProvider,
        provider,
      }),
      wallet: new WalletBalanceContract({
        address: market.addresses.walletBalanceProvider,
        provider,
      }),
      ERC20Service: new ERC20Service(provider),
      ERC721Service: new ERC721Service(provider),
      vinciNFT: new VinciNFTContract({
        address: market.addresses.vinciNFTProvider,
        provider,
      }),
    }),
    [
      market.addresses.WETH_GATEWAY,
      market.addresses.uiPoolDataProvider,
      market.addresses.vinciNFTProvider,
      market.addresses.walletBalanceProvider,
      provider,
    ]
  )

  return contracts
}
const { Provider: ContractProvider, createUseContext } = createContext(useContractService)
export const useContract = createUseContext()

export default ContractProvider
