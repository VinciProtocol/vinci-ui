import { BigNumber as BN } from '@ethersproject/bignumber'
import { useWeb3React } from '@web3-react/core'
import type { transactionType } from '@vinci-protocol/protocol'
import type { providers } from 'ethers'
import { useCallback } from 'react'

export const useSendTransaction = () => {
  const { library: web3Provider } = useWeb3React<providers.Web3Provider>()

  const send = useCallback(
    (extendedTxData: transactionType) => {
      const { from, ...txData } = extendedTxData
      const signer = web3Provider.getSigner(from)
      return signer.sendTransaction({
        ...txData,
        value: txData.value ? BN.from(txData.value) : undefined,
      })
    },
    [web3Provider]
  )

  return send
}

export type SendTransaction = ReturnType<typeof useSendTransaction>
