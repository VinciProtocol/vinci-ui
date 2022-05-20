import type { UiPoolDataContract } from 'lib/protocol/ui-pool-data'
import { getAddress, getString } from 'domains/contract/adapter/utils'

export type UserReservesDataProps = {
  registry: string
  user: string
  uiPool: UiPoolDataContract
}
export const useUserReservesDataFromAllPools = (props: UserReservesDataProps) => {
  const { registry, user, uiPool } = props
  if (!registry || !user) return Promise.reject()
  return uiPool.contract.getUserReservesDataFromAllPools(registry, user).then((data) => {
    return data.map(({ marketId, userReservesData, userNFTVaultsData }) => {
      return {
        id: marketId,
        userReservesData: userReservesData.map((userReserve) => {
          const { usageAsCollateralEnabledOnUser } = userReserve
          return {
            usageAsCollateralEnabledOnUser,
            ...getAddress(userReserve, ['underlyingAsset']),
            ...getString(userReserve, [
              'scaledVTokenBalance',
              'stableBorrowRate',
              'scaledVariableDebt',
              'principalStableDebt',
              'stableBorrowLastUpdateTimestamp',
            ]),
          }
        }),
        userNFTVaultsData: userNFTVaultsData.map((userNFTVault) => {
          const { usageAsCollateralEnabledOnUser, tokenIds, locks } = userNFTVault
          return {
            usageAsCollateralEnabledOnUser,
            ...getAddress(userNFTVault, ['underlyingAsset']),
            ...getString(userNFTVault, ['nTokenBalance']),
            tokenIds: tokenIds.map((id) => id.toString()),
            locks,
          }
        }),
      }
    })
  })
}

export type UserReservesData = Awaited<ReturnType<typeof useUserReservesDataFromAllPools>>[0]
