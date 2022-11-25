import type { FC } from 'react'

import ContractNFTProvider from './nft'
export { createContractNFTContext } from './nft'

const Provider: FC = ({ children }) => {
  return <ContractNFTProvider>{children}</ContractNFTProvider>
}

export default Provider
