import { LTV_PRECISION } from 'app/App/constants'
import { normalizeBN, valueToBigNumber } from 'utils/math'
import type { ReservesData } from './request'
// import type {  UserReservesData } from './request'

export const getNFTVault = (nftVaultsData: ReservesData['nftVaultsData']) => {
  if (!nftVaultsData[0]) return undefined
  nftVaultsData = nftVaultsData.filter((i) => i.isActive)
  const {
    underlyingAsset,
    name,
    symbol,
    baseLTVasCollateral,
    reserveLiquidationThreshold,
    reserveLiquidationBonus,
    priceInMarketReferenceCurrency,
    usageAsCollateralEnabled,
    isActive,
    isFrozen,
    totalNumberOfCollateral,
    lockActionExpiration,
  } = nftVaultsData[0]
  return {
    underlyingAsset: underlyingAsset.toLowerCase(),
    name,
    symbol,
    baseLTVasCollateral: normalizeBN(baseLTVasCollateral, LTV_PRECISION),
    reserveLiquidationThreshold: normalizeBN(reserveLiquidationThreshold, LTV_PRECISION),
    reserveLiquidationBonus: normalizeBN(
      valueToBigNumber(reserveLiquidationBonus).minus(10 ** LTV_PRECISION),
      LTV_PRECISION
    ),
    priceInMarketReferenceCurrency: valueToBigNumber(priceInMarketReferenceCurrency),
    usageAsCollateralEnabled,
    isActive,
    isFrozen,
    totalNumberOfCollateral: valueToBigNumber(totalNumberOfCollateral),
    lockActionExpiration: valueToBigNumber(lockActionExpiration).toNumber(),
  }
}
export type NFTVault = ReturnType<typeof getNFTVault>

// export const getUserNFTVault = (userNFTVaultsData: UserReservesData['userNFTVaultsData']) => {
//   const { underlyingAsset, usageAsCollateralEnabledOnUser, nTokenBalance, tokenIds } = userNFTVaultsData[0] || {}
//   return {
//     underlyingAsset: underlyingAsset.toLowerCase(),
//     usageAsCollateralEnabledOnUser,
//     nTokenBalance: valueToBigNumber(nTokenBalance),
//     tokenIds,
//   }
// }

// export type UserNFTVault = ReturnType<typeof getUserNFTVault>
