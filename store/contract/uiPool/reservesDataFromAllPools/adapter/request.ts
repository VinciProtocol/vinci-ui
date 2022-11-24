import type { UiPoolDataContract } from '@vinci-protocol/protocol'
import { getAddress, getString } from 'utils/adapter'

export type ReservesDataProps = { registry: string; uiPool: UiPoolDataContract }
export const useReservesDataFromAllPools = (props: ReservesDataProps) => {
  const { registry, uiPool } = props
  if (!registry) return Promise.reject()
  return uiPool.contract.getReservesDataFromAllPools(registry).then((data) =>
    data.map(({ reservesData, marketId, currencyInfo, nftVaultsData }) => ({
      id: marketId,
      reservesData: reservesData.map((reserve) => {
        const {
          name,
          symbol,
          usageAsCollateralEnabled,
          borrowingEnabled,
          stableBorrowRateEnabled,
          isActive,
          isFrozen,
          lastUpdateTimestamp,
        } = reserve

        const returnValue = {
          name,
          symbol,
          ...getAddress(reserve, [
            'underlyingAsset',
            'vTokenAddress',
            'stableDebtTokenAddress',
            'variableDebtTokenAddress',
            'interestRateStrategyAddress',
          ]),
          ...getString(reserve, [
            'decimals',
            'baseLTVasCollateral',
            'reserveLiquidationThreshold',
            'reserveLiquidationBonus',
            'reserveFactor',
            'liquidityIndex',
            'variableBorrowIndex',
            'liquidityRate',
            'variableBorrowRate',
            'stableBorrowRate',
            'availableLiquidity',
            'totalPrincipalStableDebt',
            'averageStableRate',
            'stableDebtLastUpdateTimestamp',
            'totalScaledVariableDebt',
            'priceInMarketReferenceCurrency',
            'variableRateSlope1',
            'variableRateSlope2',
            'stableRateSlope1',
            'stableRateSlope2',
          ]),
          usageAsCollateralEnabled,
          borrowingEnabled,
          stableBorrowRateEnabled,
          isActive,
          isFrozen,
          lastUpdateTimestamp,
        }
        return returnValue
      }),
      currencyInfo: getString(currencyInfo, [
        'marketReferenceCurrencyUnit',
        'marketReferenceCurrencyPriceInUsd',
        'networkBaseTokenPriceDecimals',
        'networkBaseTokenPriceInUsd',
      ]),
      nftVaultsData: nftVaultsData.map((nftVault) => {
        const { name, symbol, usageAsCollateralEnabled, isActive, isFrozen, lockActionExpiration } = nftVault
        return {
          name,
          symbol,
          usageAsCollateralEnabled,
          isActive,
          isFrozen,
          lockActionExpiration,
          ...getAddress(nftVault, ['underlyingAsset', 'nTokenAddress']),
          ...getString(nftVault, [
            'baseLTVasCollateral',
            'reserveLiquidationThreshold',
            'reserveLiquidationBonus',
            'priceInMarketReferenceCurrency',
            'totalNumberOfCollateral',
          ]),
        }
      }),
    }))
  )
}

export type ReservesData = Awaited<ReturnType<typeof useReservesDataFromAllPools>>[0]
