import { VinciSDKProvider } from '@vinci-protocol/domains'
import type { providers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { useMarket } from 'domains'
import type { FC } from 'react'
import { useWallet } from 'app/wallet'
import { toast } from 'lib/toastify'
import { useWalletBalanceData } from 'store/contract/uiPool/walletBalances/hooks'
import { useWalletNFTData } from 'store/contract/uiPool/walletNFT/hooks'

const onSendTransaction = (promise: Promise<any>) => {
  return toast.promise(
    promise,
    {
      pending: 'Transaction is pending',
      success: 'Transaction success 👌',
      error: 'Transaction rejected 🤯',
    },
    {
      position: toast.POSITION.BOTTOM_RIGHT,
    }
  )
}

const Provider: FC = ({ children }) => {
  const { networkAccount } = useWallet()
  const contractProps = useMarket()
  const { library: web3Provider } = useWeb3React<providers.Web3Provider>()
  const walletBalanceData = useWalletBalanceData()
  const walletNFTData = useWalletNFTData()
  return (
    <VinciSDKProvider
      {...{ web3Provider, networkAccount, ...contractProps, onSendTransaction, walletBalanceData, walletNFTData }}
    >
      {children}
    </VinciSDKProvider>
  )
}

export default Provider
