import { createContext } from 'utils/createContext'
import { useIsApproved } from './application/isApproved'

const useContractERC20Service = () => {
  useIsApproved()
}

export type ContractERC20 = ReturnType<typeof useContractERC20Service>

const { Provider } = createContext(useContractERC20Service)

export default Provider
