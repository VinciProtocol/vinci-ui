import type { SendTransaction } from 'app/web3/hooks/sendTransaction'
import type { EthereumTransactionTypeExtended } from '@vinci-protocol/protocol'
import { toast } from 'lib/toastify'

export enum TransactionStatus {
  init = 'init',
  ready = 'ready',
  approval = 'approval',
  action = 'action',
  success = 'success',
  error = 'error',
}

export const transaction = (props: {
  createTransaction: Promise<EthereumTransactionTypeExtended[]>
  setStatus: (status: TransactionStatus) => void
  sendTransaction: SendTransaction
  isOnlyApprove: boolean
}) => {
  const { createTransaction, setStatus, sendTransaction, isOnlyApprove } = props
  setStatus(TransactionStatus.init)

  return Promise.resolve(createTransaction)
    .then((txs) => {
      setStatus(TransactionStatus.ready)
      let approveTxData: EthereumTransactionTypeExtended = undefined
      let actionTxData: EthereumTransactionTypeExtended = undefined
      const approvalTx = txs.find(
        (tx) => tx.txType === 'ERC20_APPROVAL' || tx.txType === 'ERC721_APPROVAL' || tx.txType === 'ERC1155_APPROVAL'
      )
      const actionTx = txs.find((tx) =>
        ['DLP_ACTION', 'GOVERNANCE_ACTION', 'STAKE_ACTION', 'GOV_DELEGATION_ACTION', 'REWARD_ACTION'].includes(
          tx.txType
        )
      )

      if (approvalTx) {
        approveTxData = approvalTx
      }
      if (actionTx) {
        actionTxData = actionTx
      }

      return { approveTxData, actionTxData }
    })
    .then(({ approveTxData, actionTxData }) => {
      setStatus(TransactionStatus.approval)
      const approval = () =>
        approveTxData
          ? approveTxData
              .tx()
              .then(sendTransaction)
              .then((txResponse) => {
                console.log('[txResponse]', txResponse)
                return txResponse.wait()
              })
          : Promise.resolve()

      const approveAndTransaction = () => {
        if (!actionTxData) {
          setStatus(TransactionStatus.error)
          return Promise.reject()
        }
        return approval()
          .then(() => setStatus(TransactionStatus.action))
          .then(() => actionTxData.tx())
          .then(sendTransaction)
          .then((txResponse) => {
            console.log('[txResponse]', txResponse)
            return txResponse.wait()
          })
          .then(() => {
            console.log('success')
          })
      }

      const onlyApprove = () =>
        approval().then(() => {
          console.log('success')
        })
      return toast.promise(
        isOnlyApprove ? onlyApprove() : approveAndTransaction(),
        {
          pending: 'Transaction is pending',
          success: 'Transaction success 👌',
          error: 'Transaction rejected 🤯',
        },
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      )
    })
}
