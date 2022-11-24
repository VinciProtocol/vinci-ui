import { useCallback, useState } from 'react'

import { usePost } from 'app/hooks/request'
import type { ERC721Service } from '@vinci-protocol/protocol'
import { useVinciContract } from '@vinci-protocol/domains'
import { useSendTransaction } from 'app/web3/hooks/sendTransaction'
import { TransactionStatus, transaction } from '../adapter/transaction'

type PropsType<T> = T extends (props: infer P) => any ? P : any
type TransactionSettings = {
  isOnlyApprove?: boolean
}
const createERC721Use =
  <K extends keyof ERC721Service, F extends ERC721Service[K], P extends PropsType<F>>(key: K) =>
  (erc721: ERC721Service) => {
    const [status, setStatus] = useState<TransactionStatus>(TransactionStatus.init)
    const sendTransaction = useSendTransaction()

    const fn = useCallback(
      (props: P, settings: TransactionSettings) => {
        console.log(`[domains] [ERC721] [${key}] [req]`, props, settings)
        const { isOnlyApprove } = settings
        return transaction({
          createTransaction: erc721[key](props),
          setStatus,
          sendTransaction,
          isOnlyApprove,
        })
      },
      [erc721, sendTransaction]
    )

    const { post, cancel, loading } = usePost(fn)

    return { status, loading, post, cancel }
  }

const useSetApprovalForAll = createERC721Use('setApprovalForAll')

export const useERC721Controller = () => {
  const { ERC721Service } = useVinciContract()
  const setApprovalForAll = useSetApprovalForAll(ERC721Service)
  const isApprovedForAll = ERC721Service.isApprovedForAll

  return { setApprovalForAll, isApprovedForAll }
}
