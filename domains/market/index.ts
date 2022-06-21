import { useMemo } from 'react'
import { createContext } from 'utils/createContext'
import { getMarket } from 'app/web3/market'
import { getProvider } from 'app/web3/provider'
import { useWallet } from 'app/wallet'

const useMarketService = () => {
  const { chainId, ethereum, network } = useWallet()
  const { provider, market } = useMemo(() => {
    const market = getMarket(chainId)
    const provider = network && ethereum ? ethereum : getProvider(market.chainId)
    return {
      provider,
      market,
    }
  }, [chainId, network, ethereum])

  return { provider, market }
}
const { Provider: MarketProvider, createUseContext } = createContext(useMarketService)
export const createMarketContext = createUseContext

export default MarketProvider
