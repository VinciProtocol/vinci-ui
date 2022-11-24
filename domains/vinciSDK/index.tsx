import { VinciSDKProvider } from '@vinci-protocol/domains'
import { useMarket } from 'domains'
import type { FC } from 'react'

const Provider: FC = ({ children }) => {
  const contractProps = useMarket()
  return <VinciSDKProvider contractProps={contractProps}>{children}</VinciSDKProvider>
}

export default Provider
