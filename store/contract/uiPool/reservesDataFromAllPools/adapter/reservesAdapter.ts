import { LTV_PRECISION } from '@vinci-protocol/math'
import { normalizeBN, valueToBigNumber } from '@vinci-protocol/math'
import type { ReservesData } from './request'

export const getReserves = (reservesData: ReservesData['reservesData']) => {
  return reservesData.map(
    ({
      underlyingAsset,
      name,
      symbol,
      decimals,
      baseLTVasCollateral,
      reserveLiquidationThreshold,
      // reserveLiquidationBonus,
      reserveFactor,
      usageAsCollateralEnabled,
      borrowingEnabled,
      stableBorrowRateEnabled,
      isActive,
      isFrozen,
      liquidityIndex,
      variableBorrowIndex,
      liquidityRate,
      variableBorrowRate,
      stableBorrowRate,
      lastUpdateTimestamp,
      vTokenAddress,
      stableDebtTokenAddress,
      variableDebtTokenAddress,
      interestRateStrategyAddress,
      availableLiquidity,
      totalPrincipalStableDebt,
      averageStableRate,
      stableDebtLastUpdateTimestamp,
      totalScaledVariableDebt,
      priceInMarketReferenceCurrency,
      variableRateSlope1,
      variableRateSlope2,
      stableRateSlope1,
      stableRateSlope2,
    }) => ({
      underlyingAsset: underlyingAsset.toLowerCase(),
      name,
      symbol,
      decimals: valueToBigNumber(decimals),
      baseLTVasCollateral: normalizeBN(baseLTVasCollateral, LTV_PRECISION),
      reserveLiquidationThreshold: normalizeBN(reserveLiquidationThreshold, LTV_PRECISION),
      // reserveLiquidationBonus: normalizeBN(
      //   valueToBigNumber(reserveLiquidationBonus).minus(10 ** LTV_PRECISION),
      //   LTV_PRECISION
      // ),
      reserveFactor: valueToBigNumber(reserveFactor),
      usageAsCollateralEnabled,
      borrowingEnabled,
      stableBorrowRateEnabled,
      isActive,
      isFrozen,
      liquidityIndex: valueToBigNumber(liquidityIndex),
      variableBorrowIndex: valueToBigNumber(variableBorrowIndex),
      liquidityRate: valueToBigNumber(liquidityRate),
      variableBorrowRate: valueToBigNumber(variableBorrowRate),
      stableBorrowRate: valueToBigNumber(stableBorrowRate),
      lastUpdateTimestamp,
      vTokenAddress: vTokenAddress.toLowerCase(),
      stableDebtTokenAddress: stableDebtTokenAddress.toLowerCase(),
      variableDebtTokenAddress: variableDebtTokenAddress.toLowerCase(),
      interestRateStrategyAddress: interestRateStrategyAddress.toLowerCase(),
      availableLiquidity: valueToBigNumber(availableLiquidity),
      totalPrincipalStableDebt: valueToBigNumber(totalPrincipalStableDebt),
      averageStableRate: valueToBigNumber(averageStableRate),
      stableDebtLastUpdateTimestamp: valueToBigNumber(stableDebtLastUpdateTimestamp),
      totalScaledVariableDebt: valueToBigNumber(totalScaledVariableDebt),
      priceInMarketReferenceCurrency: valueToBigNumber(priceInMarketReferenceCurrency),
      variableRateSlope1: valueToBigNumber(variableRateSlope1),
      variableRateSlope2: valueToBigNumber(variableRateSlope2),
      stableRateSlope1: valueToBigNumber(stableRateSlope1),
      stableRateSlope2: valueToBigNumber(stableRateSlope2),
    })
  )
}
export type Reserves = ReturnType<typeof getReserves>[0]
