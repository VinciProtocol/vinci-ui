import { valueToBigNumber } from 'utils/math'
import type { UserReservesData } from './request'

export const getUserNFTVault = (userNFTVaultsData: UserReservesData['userNFTVaultsData']) => {
  if (!userNFTVaultsData) return [] as undefined
  return userNFTVaultsData.map(({ underlyingAsset, usageAsCollateralEnabledOnUser, nTokenBalance, tokenIds }) => ({
    underlyingAsset: underlyingAsset.toLowerCase(),
    usageAsCollateralEnabledOnUser,
    nTokenBalance: valueToBigNumber(nTokenBalance),
    tokenIds,
  }))
}

export type UserNFTVault = ReturnType<typeof getUserNFTVault>[0]
