import type { IERC721ServiceInterface } from 'lib/protocol/erc721-contract'

import BaseService from '../commons/BaseService'
import type { EthereumTransactionTypeExtended, transactionType } from '../commons/types'
import { eEthereumTxType, ProtocolAction } from '../commons/types'
import { CryptoPunksContract } from '../crypto-punks'
import type { LPDepositNFTParamsType, LPWithdrawNFTParamsType } from '../lending-pool/lendingPoolTypes'
import type { Provider } from '../types'
import type { IWPUNKSGateway } from './typechain/IWPUNKSGateway'
import { IWPUNKSGateway__factory } from './typechain/IWPUNKSGateway__factory'

export class WPUNKSGatewayService extends BaseService<IWPUNKSGateway> {
  readonly wPunksGatewayAddress: string
  readonly erc721Service: IERC721ServiceInterface
  readonly cryptoPunksContract: CryptoPunksContract

  constructor(provider: Provider, erc721Service: IERC721ServiceInterface, address: string) {
    super(provider, IWPUNKSGateway__factory)

    this.wPunksGatewayAddress = address
    this.erc721Service = erc721Service
    this.cryptoPunksContract = new CryptoPunksContract(provider)

    this.depositPUNKS = this.depositPUNKS.bind(this)
    this.withdrawPUNKS = this.withdrawPUNKS.bind(this)
  }

  public async depositPUNKS({
    lendingPoolAddress,
    user,
    nft,
    tokenIds,
    amounts,
    onBehalfOf,
    referralCode,
  }: LPDepositNFTParamsType): Promise<EthereumTransactionTypeExtended[]> {
    const txs: EthereumTransactionTypeExtended[] = []
    const tokenId = tokenIds[0]
    const wPunksGatewayAddress = this.wPunksGatewayAddress

    const approveProps = {
      user,
      spender: wPunksGatewayAddress,
      token: nft,
      tokenId,
    }

    if (!(await this.cryptoPunksContract.isApproved(approveProps))) {
      const approveTx = this.cryptoPunksContract.approve({
        punkIndex: tokenId,
        wPunksGatewayAddress,
        user,
        token: nft,
      })
      txs.push(approveTx)
    }

    const wPunksGatewayContract: IWPUNKSGateway = this.getContractInstance(wPunksGatewayAddress)
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        wPunksGatewayContract.populateTransaction.depositPUNKS(
          lendingPoolAddress,
          tokenIds,
          amounts,
          onBehalfOf ?? user,
          referralCode ?? '0'
        ),
      from: user,
    })

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.DLP_ACTION,
      gas: this.generateTxPriceEstimation([], txCallback),
    })

    return txs
  }

  public async withdrawPUNKS({
    lendingPoolAddress,
    user,
    nft,
    tokenIds,
    amounts,
    onBehalfOf,
  }: LPWithdrawNFTParamsType): Promise<EthereumTransactionTypeExtended[]> {
    const txs: EthereumTransactionTypeExtended[] = []
    const wPunksGatewayContract: IWPUNKSGateway = this.getContractInstance(this.wPunksGatewayAddress)

    const { setApprovalForAll, isApprovedForAll } = this.erc721Service
    const approveProps = {
      user,
      spender: this.wPunksGatewayAddress,
      token: nft,
      value: true,
    }

    const approved = await isApprovedForAll(approveProps)
    if (!approved) {
      const approveTx: EthereumTransactionTypeExtended = setApprovalForAll(approveProps)[0]
      txs.push(approveTx)
    }

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        wPunksGatewayContract.populateTransaction.withdrawPUNKS(
          lendingPoolAddress,
          tokenIds,
          amounts,
          onBehalfOf ?? user
        ),
      from: user,
    })

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.DLP_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback, ProtocolAction.withdrawPUNKS),
    })

    return txs
  }
}
