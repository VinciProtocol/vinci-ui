import type { providers } from 'ethers'
import BaseService from '../commons/BaseService'
import type {
  EthereumTransactionTypeExtended,
  PermitSignature,
  tEthereumAddress,
  transactionType,
} from '../commons/types'
import { eEthereumTxType, InterestRate, ProtocolAction } from '../commons/types'
import type { IRepayWithCollateral } from './typechain/IRepayWithCollateral'
import { IRepayWithCollateral__factory } from './typechain/IRepayWithCollateral__factory'

export type RepayWithCollateralType = {
  user: tEthereumAddress
  collateralAsset: tEthereumAddress
  debtAsset: tEthereumAddress
  collateralAmount: string
  debtRepayAmount: string
  debtRateMode: InterestRate
  permit: PermitSignature
  useEthPath?: boolean
}

export interface RepayWithCollateralAdapterInterface {
  swapAndRepay: (
    args: RepayWithCollateralType,
    txs: EthereumTransactionTypeExtended[]
  ) => EthereumTransactionTypeExtended
}

export class RepayWithCollateralAdapterService
  extends BaseService<IRepayWithCollateral>
  implements RepayWithCollateralAdapterInterface
{
  readonly repayWithCollateralAddress: string

  constructor(provider: providers.Provider, repayWithCollateralAddress?: string) {
    super(provider, IRepayWithCollateral__factory)

    this.repayWithCollateralAddress = repayWithCollateralAddress ?? ''
    this.swapAndRepay = this.swapAndRepay.bind(this)
  }

  public swapAndRepay(
    {
      user,
      collateralAsset,
      debtAsset,
      collateralAmount,
      debtRepayAmount,
      debtRateMode,
      permit,
      useEthPath,
    }: RepayWithCollateralType,
    txs?: EthereumTransactionTypeExtended[]
  ): EthereumTransactionTypeExtended {
    const numericInterestRate = debtRateMode === InterestRate.Stable ? 1 : 2

    const repayWithCollateralContract: IRepayWithCollateral = this.getContractInstance(this.repayWithCollateralAddress)

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        repayWithCollateralContract.populateTransaction.swapAndRepay(
          collateralAsset,
          debtAsset,
          collateralAmount,
          debtRepayAmount,
          numericInterestRate,
          permit,
          useEthPath ?? false
        ),
      from: user,
    })

    return {
      tx: txCallback,
      txType: eEthereumTxType.DLP_ACTION,
      gas: this.generateTxPriceEstimation(txs ?? [], txCallback, ProtocolAction.repayCollateral),
    }
  }
}
