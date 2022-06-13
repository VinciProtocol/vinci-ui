import type { FormatReserveResponse } from '../formatters/reserve'

export interface ComputedReserveData extends FormatReserveResponse {
  id: string
  underlyingAsset: string
  name: string
  symbol: string
  decimals: number
  usageAsCollateralEnabled: boolean
  borrowingEnabled: boolean
  stableBorrowRateEnabled: boolean
  isActive: boolean
  isFrozen: boolean
  vTokenAddress: string
  stableDebtTokenAddress: string
  variableDebtTokenAddress: string
  priceInMarketReferenceCurrency: string
  avg30DaysLiquidityRate?: string
  avg30DaysVariableBorrowRate?: string
}

export interface ReserveDataHumanized {
  id: string
  underlyingAsset: string
  name: string
  symbol: string
  decimals: number
  baseLTVasCollateral: string
  reserveLiquidationThreshold: string
  reserveLiquidationBonus: string
  reserveFactor: string
  usageAsCollateralEnabled: boolean
  borrowingEnabled: boolean
  stableBorrowRateEnabled: boolean
  isActive: boolean
  isFrozen: boolean
  liquidityIndex: string
  variableBorrowIndex: string
  liquidityRate: string
  variableBorrowRate: string
  stableBorrowRate: string
  lastUpdateTimestamp: number
  vTokenAddress: string
  stableDebtTokenAddress: string
  variableDebtTokenAddress: string
  interestRateStrategyAddress: string
  availableLiquidity: string
  totalPrincipalStableDebt: string
  averageStableRate: string
  stableDebtLastUpdateTimestamp: number
  totalScaledVariableDebt: string
  priceInMarketReferenceCurrency: string
  variableRateSlope1: string
  variableRateSlope2: string
  stableRateSlope1: string
  stableRateSlope2: string
}

export interface ReservesDataHumanized {
  reservesData: ReserveDataHumanized[]
  NFTVaultData: NFTVaultDataHumanized[]
  baseCurrencyData: PoolBaseCurrencyHumanized
}

export interface UserReserveDataHumanized {
  userReservesData: Array<{
    underlyingAsset: string
    scaledVTokenBalance: string
    usageAsCollateralEnabledOnUser: boolean
    stableBorrowRate: string
    scaledVariableDebt: string
    principalStableDebt: string
    stableBorrowLastUpdateTimestamp: number
  }>
  userNFTRReservesData: Array<{
    underlyingAsset: string
    usageAsCollateralEnabledOnUser: boolean
    nTokenBalance: BigNumber
    tokenIds: string[]
    amounts: string[]
  }>
}

export interface PoolBaseCurrencyHumanized {
  marketReferenceCurrencyDecimals: number
  marketReferenceCurrencyPriceInUsd: string
  networkBaseTokenPriceInUsd: string
  networkBaseTokenPriceDecimals: number
}

export type NFTVaultDataHumanized = {
  id: string
  priceInMarketReferenceCurrency: string
  underlyingAsset: string
  name: string
  symbol: string
  baseLTVasCollateral: string
  reserveLiquidationThreshold: string
  reserveLiquidationBonus: string
  usageAsCollateralEnabled: boolean
  isActive: boolean
  isFrozen: boolean
  lastUpdateTimestamp: number
  totalNumberOfCollateral: string
}
