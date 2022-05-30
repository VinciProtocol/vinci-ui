import { constants } from 'ethers'
import type { Provider } from '../types'
import BaseService from '../commons/BaseService'
import type { EthereumTransactionTypeExtended, transactionType, LendingPoolMarketConfig } from '../commons/types'
import { eEthereumTxType, InterestRate, ProtocolAction } from '../commons/types'
import { getTxValue, valueToWei, API_ETH_MOCK_ADDRESS, DEFAULT_APPROVE_AMOUNT } from '../commons/utils'
import type { IERC20ServiceInterface } from '../erc20-contract'
import { ERC20Service } from '../erc20-contract'
import type { LiquiditySwapAdapterInterface } from '../paraswap-liquiditySwapAdapter-contract'
import { LiquiditySwapAdapterService } from '../paraswap-liquiditySwapAdapter-contract'
import type { RepayWithCollateralAdapterInterface } from '../repayWithCollateralAdapter-contract'
import { RepayWithCollateralAdapterService } from '../repayWithCollateralAdapter-contract'
import type { SynthetixInterface } from '../synthetix-contract'
import { SynthetixService } from '../synthetix-contract'
import type { WETHGatewayInterface } from '../wethgateway-contract'
import { WETHGatewayService } from '../wethgateway-contract'
import type {
  LPBorrowParamsType,
  LPDepositAndLockNFTParamsType,
  LPDepositNFTParamsType,
  LPDepositParamsType,
  LPRepayParamsType,
  LPWithdrawNFTParamsType,
  LPWithdrawParamsType,
} from './lendingPoolTypes'
import type { ILendingPool } from './typechain/ILendingPool'
import { ILendingPool__factory } from './typechain/ILendingPool__factory'
import type { IERC721ServiceInterface } from 'lib/protocol/erc721-contract'
import { ERC721Service } from 'lib/protocol/erc721-contract'

export interface LendingPoolInterface {
  deposit: (args: LPDepositParamsType) => Promise<EthereumTransactionTypeExtended[]>
  withdraw: (args: LPWithdrawParamsType) => Promise<EthereumTransactionTypeExtended[]>
  borrow: (args: LPBorrowParamsType) => Promise<EthereumTransactionTypeExtended[]>
  repay: (args: LPRepayParamsType) => Promise<EthereumTransactionTypeExtended[]>
}

export class LendingPoolContract extends BaseService<ILendingPool> implements LendingPoolInterface {
  provider: any

  readonly erc20Service: IERC20ServiceInterface
  readonly erc721Service: IERC721ServiceInterface

  readonly synthetixService: SynthetixInterface

  readonly wethGatewayService: WETHGatewayInterface

  readonly liquiditySwapAdapterService: LiquiditySwapAdapterInterface

  readonly repayWithCollateralAdapterService: RepayWithCollateralAdapterInterface

  readonly flashLiquidationAddress: string

  readonly swapCollateralAddress: string

  readonly repayWithCollateralAddress: string

  constructor(provider: Provider, lendingPoolConfig?: LendingPoolMarketConfig) {
    super(provider, ILendingPool__factory)
    this.provider = provider

    const { FLASH_LIQUIDATION_ADAPTER, REPAY_WITH_COLLATERAL_ADAPTER, SWAP_COLLATERAL_ADAPTER, WETH_GATEWAY } =
      lendingPoolConfig ?? {}

    this.flashLiquidationAddress = FLASH_LIQUIDATION_ADAPTER ?? ''
    this.swapCollateralAddress = SWAP_COLLATERAL_ADAPTER ?? ''
    this.repayWithCollateralAddress = REPAY_WITH_COLLATERAL_ADAPTER ?? ''

    // initialize services
    this.erc20Service = new ERC20Service(provider)
    this.erc721Service = new ERC721Service(provider)
    this.synthetixService = new SynthetixService(provider)
    this.wethGatewayService = new WETHGatewayService(provider, this.erc20Service, WETH_GATEWAY)
    this.liquiditySwapAdapterService = new LiquiditySwapAdapterService(provider, SWAP_COLLATERAL_ADAPTER)
    this.repayWithCollateralAdapterService = new RepayWithCollateralAdapterService(
      provider,
      REPAY_WITH_COLLATERAL_ADAPTER
    )
  }

  public async deposit({
    lendingPoolAddress,
    user,
    reserve,
    amount,
    onBehalfOf,
    referralCode,
  }: LPDepositParamsType): Promise<EthereumTransactionTypeExtended[]> {
    if (reserve.toLowerCase() === API_ETH_MOCK_ADDRESS) {
      return this.wethGatewayService.depositETH({
        lendingPool: lendingPoolAddress,
        user,
        amount,
        onBehalfOf,
        referralCode,
      })
    }
    const { isApproved, approve, decimalsOf }: IERC20ServiceInterface = this.erc20Service
    const txs: EthereumTransactionTypeExtended[] = []
    const reserveDecimals: number = await decimalsOf(reserve)
    const convertedAmount: string = valueToWei(amount, reserveDecimals)

    const fundsAvailable: boolean = await this.synthetixService.synthetixValidation({
      user,
      reserve,
      amount: convertedAmount,
    })
    if (!fundsAvailable) {
      throw new Error('Not enough funds to execute operation')
    }

    const approved = await isApproved({
      token: reserve,
      user,
      spender: lendingPoolAddress,
      amount,
    })

    if (!approved) {
      const approveTx: EthereumTransactionTypeExtended = approve({
        user,
        token: reserve,
        spender: lendingPoolAddress,
        amount: DEFAULT_APPROVE_AMOUNT,
      })
      txs.push(approveTx)
    }

    const lendingPoolContract: ILendingPool = this.getContractInstance(lendingPoolAddress)

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        lendingPoolContract.populateTransaction.deposit(
          reserve,
          convertedAmount,
          onBehalfOf ?? user,
          referralCode ?? '0'
        ),
      from: user,
      value: getTxValue(reserve, convertedAmount),
    })

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.DLP_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback, ProtocolAction.deposit),
    })

    return txs
  }

  public async withdraw({
    lendingPoolAddress,
    user,
    reserve,
    amount,
    onBehalfOf,
    aTokenAddress,
  }: LPWithdrawParamsType): Promise<EthereumTransactionTypeExtended[]> {
    if (reserve.toLowerCase() === API_ETH_MOCK_ADDRESS) {
      if (!aTokenAddress) {
        throw new Error('To withdraw ETH you need to pass the aWETH token address')
      }

      return this.wethGatewayService.withdrawETH({
        lendingPool: lendingPoolAddress,
        user,
        amount,
        onBehalfOf,
        aTokenAddress,
      })
    }

    const { decimalsOf }: IERC20ServiceInterface = this.erc20Service
    const decimals: number = await decimalsOf(reserve)

    const convertedAmount: string = amount === '-1' ? constants.MaxUint256.toString() : valueToWei(amount, decimals)

    const lendingPoolContract: ILendingPool = this.getContractInstance(lendingPoolAddress)

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        lendingPoolContract.populateTransaction.withdraw(reserve, convertedAmount, onBehalfOf ?? user),
      from: user,
      action: ProtocolAction.withdraw,
    })

    return [
      {
        tx: txCallback,
        txType: eEthereumTxType.DLP_ACTION,
        gas: this.generateTxPriceEstimation([], txCallback, ProtocolAction.withdraw),
      },
    ]
  }

  public async borrow({
    lendingPoolAddress,
    user,
    reserve,
    amount,
    interestRateMode,
    onBehalfOf,
    referralCode,
    debtTokenAddress,
  }: LPBorrowParamsType): Promise<EthereumTransactionTypeExtended[]> {
    if (reserve.toLowerCase() === API_ETH_MOCK_ADDRESS) {
      if (!debtTokenAddress) {
        throw new Error(
          `To borrow ETH you need to pass the stable or variable WETH debt Token Address corresponding the interestRateMode`
        )
      }

      return this.wethGatewayService.borrowETH({
        lendingPool: lendingPoolAddress,
        user,
        amount,
        debtTokenAddress,
        interestRateMode,
        referralCode,
      })
    }

    const { decimalsOf }: IERC20ServiceInterface = this.erc20Service
    const reserveDecimals = await decimalsOf(reserve)
    const formatAmount: string = valueToWei(amount, reserveDecimals)

    const numericRateMode = interestRateMode === InterestRate.Variable ? 2 : 1

    const lendingPoolContract = this.getContractInstance(lendingPoolAddress)

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        lendingPoolContract.populateTransaction.borrow(
          reserve,
          formatAmount,
          numericRateMode,
          referralCode ?? 0,
          onBehalfOf ?? user
        ),
      from: user,
    })

    return [
      {
        tx: txCallback,
        txType: eEthereumTxType.DLP_ACTION,
        gas: this.generateTxPriceEstimation([], txCallback),
      },
    ]
  }

  public async repay({
    lendingPoolAddress,
    user,
    reserve,
    amount,
    interestRateMode,
    onBehalfOf,
  }: LPRepayParamsType): Promise<EthereumTransactionTypeExtended[]> {
    if (reserve.toLowerCase() === API_ETH_MOCK_ADDRESS) {
      return this.wethGatewayService.repayETH({
        lendingPool: lendingPoolAddress,
        user,
        amount,
        interestRateMode,
        onBehalfOf,
      })
    }

    const txs: EthereumTransactionTypeExtended[] = []
    const { isApproved, approve, decimalsOf }: IERC20ServiceInterface = this.erc20Service

    const lendingPoolContract = this.getContractInstance(lendingPoolAddress)
    const { populateTransaction }: ILendingPool = lendingPoolContract
    const numericRateMode = interestRateMode === InterestRate.Variable ? 2 : 1
    const decimals: number = await decimalsOf(reserve)

    const convertedAmount: string = amount === '-1' ? constants.MaxUint256.toString() : valueToWei(amount, decimals)

    if (amount !== '-1') {
      const fundsAvailable: boolean = await this.synthetixService.synthetixValidation({
        user,
        reserve,
        amount: convertedAmount,
      })
      if (!fundsAvailable) {
        throw new Error('Not enough funds to execute operation')
      }
    }

    const approved = await isApproved({
      token: reserve,
      user,
      spender: lendingPoolAddress,
      amount,
    })

    if (!approved) {
      const approveTx: EthereumTransactionTypeExtended = approve({
        user,
        token: reserve,
        spender: lendingPoolAddress,
        amount: DEFAULT_APPROVE_AMOUNT,
      })
      txs.push(approveTx)
    }

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () => populateTransaction.repay(reserve, convertedAmount, numericRateMode, onBehalfOf ?? user),
      from: user,
      value: getTxValue(reserve, convertedAmount),
    })

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.DLP_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback, ProtocolAction.repay),
    })

    return txs
  }

  public async depositNFT({
    lendingPoolAddress,
    user,
    nft,
    tokenIds,
    amounts,
    onBehalfOf,
    referralCode,
  }: LPDepositNFTParamsType): Promise<EthereumTransactionTypeExtended[]> {
    const lendingPoolContract: ILendingPool = this.getContractInstance(lendingPoolAddress)
    const txs: EthereumTransactionTypeExtended[] = []
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
      const txCallback: () => Promise<transactionType> = this.generateTxCallback({
        rawTxMethod: async () =>
          lendingPoolContract.populateTransaction.depositNFT(
            nft,
            tokenIds,
            amounts,
            onBehalfOf ?? user,
            referralCode ?? '0'
          ),
        from: user,
        value: getTxValue(nft, tokenIds.length + ''),
      })

      txs.push({
        tx: txCallback,
        txType: eEthereumTxType.DLP_ACTION,
        gas: this.generateTxPriceEstimation(txs, txCallback, ProtocolAction.deposit),
      })
    } else {
      const amount = amounts[0]
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

      const txCallback: () => Promise<transactionType> = this.generateTxCallback({
        rawTxMethod: async () =>
          lendingPoolContract.populateTransaction.depositNFT(
            nft,
            [tokenId],
            [amount],
            onBehalfOf ?? user,
            referralCode ?? '0'
          ),
        from: user,
        value: getTxValue(nft, amount),
      })

      txs.push({
        tx: txCallback,
        txType: eEthereumTxType.DLP_ACTION,
        gas: this.generateTxPriceEstimation(txs, txCallback, ProtocolAction.deposit),
      })
    }

    return txs
  }

  public async depositAndLockNFT({
    lendingPoolAddress,
    user,
    nft,
    tokenIds,
    amounts,
    onBehalfOf,
    lockType,
    referralCode,
  }: LPDepositAndLockNFTParamsType): Promise<EthereumTransactionTypeExtended[]> {
    const lendingPoolContract: ILendingPool = this.getContractInstance(lendingPoolAddress)
    const txs: EthereumTransactionTypeExtended[] = []
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
      const txCallback: () => Promise<transactionType> = this.generateTxCallback({
        rawTxMethod: async () =>
          (lendingPoolContract.populateTransaction as any).depositAndLockNFT(
            nft,
            tokenIds,
            amounts,
            onBehalfOf ?? user,
            lockType,
            referralCode ?? '0'
          ),
        from: user,
        value: getTxValue(nft, tokenIds.length + ''),
      })

      txs.push({
        tx: txCallback,
        txType: eEthereumTxType.DLP_ACTION,
        gas: this.generateTxPriceEstimation(txs, txCallback, ProtocolAction.deposit),
      })
    } else {
      const amount = amounts[0]
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

      const txCallback: () => Promise<transactionType> = this.generateTxCallback({
        rawTxMethod: async () =>
          (lendingPoolContract.populateTransaction as any).depositAndLockNFT(
            nft,
            [tokenId],
            [amount],
            onBehalfOf ?? user,
            lockType,
            referralCode ?? '0'
          ),
        from: user,
        value: getTxValue(nft, amount),
      })

      txs.push({
        tx: txCallback,
        txType: eEthereumTxType.DLP_ACTION,
        gas: this.generateTxPriceEstimation(txs, txCallback, ProtocolAction.deposit),
      })
    }

    return txs
  }

  public async withdrawNFT({
    lendingPoolAddress,
    user,
    nft,
    tokenIds,
    amounts,
    onBehalfOf,
  }: LPWithdrawNFTParamsType): Promise<EthereumTransactionTypeExtended[]> {
    const lendingPoolContract: ILendingPool = this.getContractInstance(lendingPoolAddress)

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        lendingPoolContract.populateTransaction.withdrawNFT(nft, tokenIds, amounts, onBehalfOf ?? user),
      from: user,
      action: ProtocolAction.withdraw,
    })

    return [
      {
        tx: txCallback,
        txType: eEthereumTxType.DLP_ACTION,
        gas: this.generateTxPriceEstimation([], txCallback, ProtocolAction.withdraw),
      },
    ]
  }
}
