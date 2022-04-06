import { valueToBigNumber } from 'utils/math'

import type { UserReservesData } from './request'

export const getUserReserves = (userReserves: UserReservesData['userReservesData']) => {
  return userReserves.map(
    ({
      underlyingAsset,
      scaledATokenBalance,
      usageAsCollateralEnabledOnUser,
      stableBorrowRate,
      scaledVariableDebt,
      principalStableDebt,
      stableBorrowLastUpdateTimestamp,
    }) => ({
      underlyingAsset: underlyingAsset.toLowerCase(),
      scaledATokenBalance: valueToBigNumber(scaledATokenBalance),
      usageAsCollateralEnabledOnUser,
      stableBorrowRate: valueToBigNumber(stableBorrowRate),
      scaledVariableDebt: valueToBigNumber(scaledVariableDebt),
      principalStableDebt: valueToBigNumber(principalStableDebt),
      stableBorrowLastUpdateTimestamp: valueToBigNumber(stableBorrowLastUpdateTimestamp),
    })
  )
}

export type UserReserves = ReturnType<typeof getUserReserves>[0]
