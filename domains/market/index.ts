import { useMemo } from 'react'
import { createContext } from 'utils/createContext'
import { getMarketsData } from 'app/web3/market'
import { getProvider } from 'app/web3/provider'
import { useWallet } from 'app/wallet'

const useMarketService = () => {
  const { chainId, ethereum, error } = useWallet()
  const { provider, market } = useMemo(() => {
    const market = getMarketsData(chainId)
    const provider = !error && ethereum ? ethereum : getProvider(market.chainId)
    return {
      provider,
      market,
    }
  }, [chainId, error, ethereum])

  return { provider, market }
}
const { Provider: MarketProvider, createUseContext } = createContext(useMarketService)
export const createMarketContext = createUseContext

export default MarketProvider
