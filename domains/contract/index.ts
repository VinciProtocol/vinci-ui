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
  const contracts = useMemo(() => {
    const { WETH_GATEWAY, WPUNKS_GATEWAY, uiPoolDataProvider, walletBalanceProvider, vinciNFTProvider } =
      market.addresses
    return {
      lendingPool: new LendingPoolContract(provider, {
        WETH_GATEWAY,
        WPUNKS_GATEWAY,
      }),
      uiPool: new UiPoolDataContract({
        address: uiPoolDataProvider,
        provider,
      }),
      wallet: new WalletBalanceContract({
        address: walletBalanceProvider,
        provider,
      }),
      ERC20Service: new ERC20Service(provider),
      ERC721Service: new ERC721Service(provider),
      vinciNFT: new VinciNFTContract({
        address: vinciNFTProvider,
        provider,
      }),
    }
  }, [market.addresses, provider])

  return contracts
}
const { Provider: ContractProvider, createUseContext } = createContext(useContractService)
export const useContract = createUseContext()

export default ContractProvider
