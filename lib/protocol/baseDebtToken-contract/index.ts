import type { providers } from 'ethers'
import { BigNumber } from 'ethers'
import BaseService from '../commons/BaseService'
import type { EthereumTransactionTypeExtended, tEthereumAddress, transactionType } from '../commons/types'
import { eEthereumTxType } from '../commons/types'
import { valueToWei } from '../commons/utils'
import type { IERC20ServiceInterface } from '../erc20-contract'
import type { IDebtTokenBase } from './typechain/IDebtTokenBase'
import { IDebtTokenBase__factory } from './typechain/IDebtTokenBase__factory'

export interface BaseDebtTokenInterface {
  approveDelegation: (args: ApproveDelegationType) => EthereumTransactionTypeExtended
  isDelegationApproved: (args: DelegationApprovedType) => Promise<boolean>
}

export type ApproveDelegationType = {
  user: tEthereumAddress
  delegatee: tEthereumAddress
  debtTokenAddress: tEthereumAddress
  amount: string // wei
}

export type DelegationApprovedType = {
  debtTokenAddress: tEthereumAddress
  allowanceGiver: tEthereumAddress
  allowanceReceiver: tEthereumAddress
  amount: string // normal
}

export class BaseDebtToken extends BaseService<IDebtTokenBase> implements BaseDebtTokenInterface {
  readonly erc20Service: IERC20ServiceInterface

  constructor(provider: providers.Provider, erc20Service: IERC20ServiceInterface) {
    super(provider, IDebtTokenBase__factory)
    this.erc20Service = erc20Service
  }

  public approveDelegation({
    user,
    delegatee,
    debtTokenAddress,
    amount,
  }: ApproveDelegationType): EthereumTransactionTypeExtended {
    const debtTokenContract: IDebtTokenBase = this.getContractInstance(debtTokenAddress)
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () => debtTokenContract.populateTransaction.approveDelegation(delegatee, amount),
      from: user,
    })

    return {
      tx: txCallback,
      txType: eEthereumTxType.ERC20_APPROVAL,
      gas: this.generateTxPriceEstimation([], txCallback),
    }
  }

  public async isDelegationApproved({
    debtTokenAddress,
    allowanceGiver,
    allowanceReceiver,
    amount,
  }: DelegationApprovedType): Promise<boolean> {
    const decimals: number = await this.erc20Service.decimalsOf(debtTokenAddress)
    const debtTokenContract: IDebtTokenBase = this.getContractInstance(debtTokenAddress)
    const delegatedAllowance: BigNumber = await debtTokenContract.borrowAllowance(allowanceGiver, allowanceReceiver)
    const amountBNWithDecimals: BigNumber = BigNumber.from(valueToWei(amount, decimals))

    return delegatedAllowance.gt(amountBNWithDecimals)
  }
}
