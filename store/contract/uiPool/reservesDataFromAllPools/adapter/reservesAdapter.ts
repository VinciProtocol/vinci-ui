import { LTV_PRECISION } from 'app/App/constants'
import { normalizeBN, valueToBigNumber } from 'utils/math'
import type { ReservesData } from './request'
// import type {  UserReservesData } from './request'

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
      aTokenAddress,
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
      aTokenAddress: aTokenAddress.toLowerCase(),
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

// export const getUserReserves = (userReserves: UserReservesData['userReservesData']) => {
//   return userReserves.map(
//     ({
//       underlyingAsset,
//       scaledATokenBalance,
//       usageAsCollateralEnabledOnUser,
//       stableBorrowRate,
//       scaledVariableDebt,
//       principalStableDebt,
//       stableBorrowLastUpdateTimestamp,
//     }) => ({
//       underlyingAsset: underlyingAsset.toLowerCase(),
//       scaledATokenBalance: valueToBigNumber(scaledATokenBalance),
//       usageAsCollateralEnabledOnUser,
//       stableBorrowRate: valueToBigNumber(stableBorrowRate),
//       scaledVariableDebt: valueToBigNumber(scaledVariableDebt),
//       principalStableDebt: valueToBigNumber(principalStableDebt),
//       stableBorrowLastUpdateTimestamp: valueToBigNumber(stableBorrowLastUpdateTimestamp),
//     })
//   )
// }

// export type UserReserves = ReturnType<typeof getUserReserves>[0]
