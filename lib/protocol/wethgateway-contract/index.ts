import type { providers } from 'ethers'
import { constants } from 'ethers'
import type { BaseDebtTokenInterface } from '../baseDebtToken-contract'
import { BaseDebtToken } from '../baseDebtToken-contract'
import BaseService from '../commons/BaseService'
import type { EthereumTransactionTypeExtended, tEthereumAddress, transactionType } from '../commons/types'
import { eEthereumTxType, InterestRate, ProtocolAction } from '../commons/types'
import { valueToWei } from '../commons/utils'
import type { IERC20ServiceInterface } from '../erc20-contract'
import type { IWETHGateway } from './typechain/IWETHGateway'
import { IWETHGateway__factory } from './typechain/IWETHGateway__factory'

export type WETHDepositParamsType = {
  lendingPool: tEthereumAddress
  user: tEthereumAddress
  amount: string // normal
  onBehalfOf?: tEthereumAddress
  referralCode?: string
}

export type WETHWithdrawParamsType = {
  lendingPool: tEthereumAddress
  user: tEthereumAddress
  amount: string
  vTokenAddress: tEthereumAddress
  onBehalfOf?: tEthereumAddress
}

export type WETHRepayParamsType = {
  lendingPool: tEthereumAddress
  user: tEthereumAddress
  amount: string
  interestRateMode: InterestRate
  onBehalfOf?: tEthereumAddress
}

export type WETHBorrowParamsType = {
  lendingPool: tEthereumAddress
  user: tEthereumAddress
  amount: string
  debtTokenAddress: tEthereumAddress
  interestRateMode: InterestRate
  referralCode?: string
}

export interface WETHGatewayInterface {
  depositETH: (args: WETHDepositParamsType) => EthereumTransactionTypeExtended[]
  withdrawETH: (args: WETHWithdrawParamsType) => Promise<EthereumTransactionTypeExtended[]>
  repayETH: (args: WETHRepayParamsType) => EthereumTransactionTypeExtended[]
  borrowETH: (args: WETHBorrowParamsType) => Promise<EthereumTransactionTypeExtended[]>
}

export class WETHGatewayService extends BaseService<IWETHGateway> implements WETHGatewayInterface {
  readonly wethGatewayAddress: string

  readonly baseDebtTokenService: BaseDebtTokenInterface

  readonly erc20Service: IERC20ServiceInterface

  constructor(provider: providers.Provider, erc20Service: IERC20ServiceInterface, wethGatewayAddress?: string) {
    super(provider, IWETHGateway__factory)
    this.erc20Service = erc20Service

    this.baseDebtTokenService = new BaseDebtToken(this.provider, this.erc20Service)

    this.wethGatewayAddress = wethGatewayAddress ?? ''

    this.depositETH = this.depositETH.bind(this)
    this.withdrawETH = this.withdrawETH.bind(this)
    this.repayETH = this.repayETH.bind(this)
    this.borrowETH = this.borrowETH.bind(this)
  }

  public depositETH({
    lendingPool,
    user,
    amount,
    onBehalfOf,
    referralCode,
  }: WETHDepositParamsType): EthereumTransactionTypeExtended[] {
    const convertedAmount: string = valueToWei(amount, 18)

    const wethGatewayContract: IWETHGateway = this.getContractInstance(this.wethGatewayAddress)
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        wethGatewayContract.populateTransaction.depositETH(lendingPool, onBehalfOf ?? user, referralCode ?? '0'),
      from: user,
      value: convertedAmount,
    })

    return [
      {
        tx: txCallback,
        txType: eEthereumTxType.DLP_ACTION,
        gas: this.generateTxPriceEstimation([], txCallback),
      },
    ]
  }

  public async borrowETH({
    lendingPool,
    user,
    amount,
    debtTokenAddress,
    interestRateMode,
    referralCode,
  }: WETHBorrowParamsType): Promise<EthereumTransactionTypeExtended[]> {
    const txs: EthereumTransactionTypeExtended[] = []
    const convertedAmount: string = valueToWei(amount, 18)
    const numericRateMode = interestRateMode === InterestRate.Variable ? 2 : 1

    const delegationApproved: boolean = await this.baseDebtTokenService.isDelegationApproved({
      debtTokenAddress,
      allowanceGiver: user,
      allowanceReceiver: this.wethGatewayAddress,
      amount,
    })

    if (!delegationApproved) {
      const approveDelegationTx: EthereumTransactionTypeExtended = this.baseDebtTokenService.approveDelegation({
        user,
        delegatee: this.wethGatewayAddress,
        debtTokenAddress,
        amount: constants.MaxUint256.toString(),
      })

      txs.push(approveDelegationTx)
    }

    const wethGatewayContract: IWETHGateway = this.getContractInstance(this.wethGatewayAddress)

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        wethGatewayContract.populateTransaction.borrowETH(
          lendingPool,
          convertedAmount,
          numericRateMode,
          referralCode ?? '0'
        ),
      from: user,
    })

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.DLP_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback, ProtocolAction.borrowETH),
    })

    return txs
  }

  public async withdrawETH({
    lendingPool,
    user,
    amount,
    onBehalfOf,
    vTokenAddress,
  }: WETHWithdrawParamsType): Promise<EthereumTransactionTypeExtended[]> {
    const txs: EthereumTransactionTypeExtended[] = []
    const { isApproved, approve }: IERC20ServiceInterface = this.erc20Service
    const convertedAmount: string = amount === '-1' ? constants.MaxUint256.toString() : valueToWei(amount, 18)

    const approved: boolean = await isApproved({
      token: vTokenAddress,
      user,
      spender: this.wethGatewayAddress,
      amount,
    })

    if (!approved) {
      const approveTx: EthereumTransactionTypeExtended = approve({
        user,
        token: vTokenAddress,
        spender: this.wethGatewayAddress,
        amount: constants.MaxUint256.toString(),
      })
      txs.push(approveTx)
    }

    const wethGatewayContract: IWETHGateway = this.getContractInstance(this.wethGatewayAddress)

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        wethGatewayContract.populateTransaction.withdrawETH(lendingPool, convertedAmount, onBehalfOf ?? user),
      from: user,
    })

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.DLP_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback, ProtocolAction.withdrawETH),
    })

    return txs
  }

  public repayETH({
    lendingPool,
    user,
    amount,
    interestRateMode,
    onBehalfOf,
  }: WETHRepayParamsType): EthereumTransactionTypeExtended[] {
    const convertedAmount = valueToWei(amount, 18)
    const numericRateMode = interestRateMode === InterestRate.Variable ? 2 : 1
    const wethGatewayContract: IWETHGateway = this.getContractInstance(this.wethGatewayAddress)

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        wethGatewayContract.populateTransaction.repayETH(
          lendingPool,
          convertedAmount,
          numericRateMode,
          onBehalfOf ?? user
        ),
      gasSurplus: 30,
      from: user,
      value: convertedAmount,
    })

    return [
      {
        tx: txCallback,
        txType: eEthereumTxType.DLP_ACTION,
        gas: this.generateTxPriceEstimation([], txCallback),
      },
    ]
  }
}
