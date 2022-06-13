import { valueToBigNumber } from 'utils/math'

import type { UserReservesData } from './request'

export const getUserReserves = (userReserves: UserReservesData['userReservesData']) => {
  return userReserves.map(
    ({
      underlyingAsset,
      scaledVTokenBalance,
      usageAsCollateralEnabledOnUser,
      stableBorrowRate,
      scaledVariableDebt,
      principalStableDebt,
      stableBorrowLastUpdateTimestamp,
    }) => ({
      underlyingAsset: underlyingAsset.toLowerCase(),
      scaledVTokenBalance: valueToBigNumber(scaledVTokenBalance),
      usageAsCollateralEnabledOnUser,
      stableBorrowRate: valueToBigNumber(stableBorrowRate),
      scaledVariableDebt: valueToBigNumber(scaledVariableDebt),
      principalStableDebt: valueToBigNumber(principalStableDebt),
      stableBorrowLastUpdateTimestamp: valueToBigNumber(stableBorrowLastUpdateTimestamp),
    })
  )
}

export type UserReserves = ReturnType<typeof getUserReserves>[0]
