import { LTV_PRECISION } from '@vinci-protocol/math'
import { normalizeBN, valueToBigNumber } from '@vinci-protocol/math'
import type { ReservesData } from './request'

export const getNFTVaults = (nftVaultsData: ReservesData['nftVaultsData']) => {
  if (!nftVaultsData) return undefined
  nftVaultsData = nftVaultsData.filter((i) => i.isActive)
  return nftVaultsData.map(
    ({
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
      nTokenAddress,
    }) => ({
      underlyingAsset: underlyingAsset.toLowerCase(),
      nTokenAddress: nTokenAddress.toLowerCase(),
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
    })
  )
}

export type NFTVault = ReturnType<typeof getNFTVaults>[0]
