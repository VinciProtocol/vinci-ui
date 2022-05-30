import { valueToBigNumber } from 'utils/math'
import type { UserReservesData } from './request'

const getCreateTime = (lockType: number, endTime: number) => {
  let temp = 0

  switch (lockType) {
    case 0:
      return 0
    case 1:
      temp += 1 * 60 * 10000
      break
    case 2:
      temp += 5 * 60 * 10000
      break
    case 3:
      temp += 24 * 60 * 10000
      break
  }

  return endTime - temp
}

export const getUserNFTVault = (userNFTVaultsData: UserReservesData['userNFTVaultsData']) => {
  if (!userNFTVaultsData) return [] as undefined
  return userNFTVaultsData.map(
    ({ underlyingAsset, usageAsCollateralEnabledOnUser, nTokenBalance, tokenIds, locks }) => ({
      underlyingAsset: underlyingAsset.toLowerCase(),
      usageAsCollateralEnabledOnUser,
      nTokenBalance: valueToBigNumber(nTokenBalance),
      tokenIds,
      locks: locks?.map(({ expiration, lockType }: any) => {
        const endTime = expiration * 1000
        return {
          createTime: getCreateTime(lockType, endTime),
          expiration: endTime,
          lockType,
        }
      }),
    })
  )
}

export type UserNFTVault = ReturnType<typeof getUserNFTVault>[0]
