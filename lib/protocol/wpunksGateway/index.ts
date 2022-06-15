import type { providers } from 'ethers'
import type { IERC721ServiceInterface } from 'lib/protocol/erc721-contract'
import { ERC721Service } from 'lib/protocol/erc721-contract'

import BaseService from '../commons/BaseService'
import type { EthereumTransactionTypeExtended, transactionType } from '../commons/types'
import { eEthereumTxType, ProtocolAction } from '../commons/types'
import { CryptoPunksContract } from '../crypto-punks'
import type {
  LPDepositAndLockNFTParamsType,
  LPDepositNFTParamsType,
  LPWithdrawNFTParamsType,
} from '../lending-pool/lendingPoolTypes'
import type { IWPUNKSGateway } from './typechain/IWPUNKSGateway'
import { IWPUNKSGateway__factory } from './typechain/IWPUNKSGateway__factory'

export class WPUNKSGatewayService extends BaseService<IWPUNKSGateway> {
  readonly wPunksGatewayAddress: string
  readonly erc721Service: IERC721ServiceInterface
  readonly cryptoPunksContract: CryptoPunksContract

  constructor(provider: providers.Provider, wPunksGatewayAddress?: string) {
    super(provider, IWPUNKSGateway__factory)

    this.wPunksGatewayAddress = wPunksGatewayAddress ?? ''
    this.erc721Service = new ERC721Service(provider)
    this.cryptoPunksContract = new CryptoPunksContract(provider)

    this.depositPUNKS = this.depositPUNKS.bind(this)
    this.depositAndLockPUNKS = this.depositAndLockPUNKS.bind(this)
    this.withdrawPUNKS = this.withdrawPUNKS.bind(this)
  }

  public depositPUNKS({
    lendingPoolAddress,
    user,
    nft,
    tokenIds,
    amounts,
    onBehalfOf,
    referralCode,
  }: LPDepositNFTParamsType): EthereumTransactionTypeExtended[] {
    const txs: EthereumTransactionTypeExtended[] = []
    const tokenId = tokenIds[0]
    const wPunksGatewayAddress = this.wPunksGatewayAddress

    const approveTx = this.cryptoPunksContract.approve({
      punkIndex: tokenId,
      wPunksGatewayAddress,
      user,
      token: nft,
    })
    txs.push(approveTx)

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
      value: tokenIds.length + '',
    })

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.DLP_ACTION,
      gas: this.generateTxPriceEstimation([], txCallback),
    })

    return txs
  }

  public depositAndLockPUNKS({
    lendingPoolAddress,
    user,
    nft,
    tokenIds,
    amounts,
    onBehalfOf,
    lockType,
    referralCode,
  }: LPDepositAndLockNFTParamsType): EthereumTransactionTypeExtended[] {
    const txs: EthereumTransactionTypeExtended[] = []
    const tokenId = tokenIds[0]
    const wPunksGatewayAddress = this.wPunksGatewayAddress

    const approveTx = this.cryptoPunksContract.approve({
      punkIndex: tokenId,
      wPunksGatewayAddress,
      user,
      token: nft,
    })
    txs.push(approveTx)

    const wPunksGatewayContract: IWPUNKSGateway = this.getContractInstance(wPunksGatewayAddress)
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        wPunksGatewayContract.populateTransaction.depositAndLockPUNKS(
          lendingPoolAddress,
          tokenIds,
          amounts,
          onBehalfOf ?? user,
          lockType,
          referralCode ?? '0'
        ),
      from: user,
      value: tokenIds.length + '',
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

    if (tokenIds.length > 1) {
      const { setApprovalForAll, isApprovedForAll } = this.erc721Service
      const approveProps = {
        user,
        spender: lendingPoolAddress,
        token: nft,
        value: true,
      }

      const approved = await isApprovedForAll(approveProps)
      if (!approved) {
        const approveTx: EthereumTransactionTypeExtended = setApprovalForAll(approveProps)[0]
        txs.push(approveTx)
      }
    } else {
      const tokenId = tokenIds[0]
      const { approve, isApproved } = this.erc721Service

      const approveProps = {
        user,
        spender: lendingPoolAddress,
        token: nft,
        tokenId,
      }

      const approved = await isApproved(approveProps)
      if (!approved) {
        const approveTx: EthereumTransactionTypeExtended = approve(approveProps)
        txs.push(approveTx)
      }
    }

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        wPunksGatewayContract.populateTransaction.withdrawPUNKS(nft, tokenIds, amounts, onBehalfOf ?? user),
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
