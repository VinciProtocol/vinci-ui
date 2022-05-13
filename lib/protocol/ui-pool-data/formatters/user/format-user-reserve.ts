import { normalize, valueToBigNumber, valueToZDBigNumber } from 'utils/math'
import type { BigNumberValue } from 'utils/math/types'
import { LTV_PRECISION, RAY_DECIMALS, SECONDS_PER_YEAR } from 'app/App/constants'
import { RAY, rayPow } from 'utils/math/ray'
import type { UserReserveSummaryResponse } from './generate-user-reserve-summary'
import type { ComputedUserReserve } from './index'

export interface FormatUserReserveRequest {
  reserve: UserReserveSummaryResponse
  marketRefCurrencyDecimals: number
}

export interface FormatUserReserveResponse {
  reserve: ComputedUserReserve
}

export function formatUserReserve({
  reserve: _reserve,
  marketRefCurrencyDecimals,
}: FormatUserReserveRequest): ComputedUserReserve {
  const { userReserve } = _reserve
  const { reserve } = userReserve
  const reserveDecimals = reserve.decimals

  const normalizeWithReserve = (n: BigNumberValue) => normalize(n, reserve.decimals)

  const exactStableBorrowRate = rayPow(
    valueToZDBigNumber(userReserve.stableBorrowRate).dividedBy(SECONDS_PER_YEAR).plus(RAY),
    SECONDS_PER_YEAR
  ).minus(RAY)

  return {
    ...userReserve,
    reserve: {
      ...reserve,
      reserveLiquidationBonus: normalize(
        valueToBigNumber(reserve.reserveLiquidationBonus).shiftedBy(LTV_PRECISION),
        LTV_PRECISION
      ),
    },
    scaledVTokenBalance: normalizeWithReserve(userReserve.scaledVTokenBalance),
    underlyingBalance: normalize(_reserve.underlyingBalance, reserveDecimals),
    underlyingBalanceMarketReferenceCurrency: normalize(
      _reserve.underlyingBalanceMarketReferenceCurrency,
      marketRefCurrencyDecimals
    ),
    underlyingBalanceUSD: _reserve.underlyingBalanceUSD.toString(),
    stableBorrows: normalizeWithReserve(_reserve.stableBorrows),
    stableBorrowsMarketReferenceCurrency: normalize(
      _reserve.stableBorrowsMarketReferenceCurrency,
      marketRefCurrencyDecimals
    ),
    stableBorrowsUSD: _reserve.stableBorrowsUSD.toString(),
    variableBorrows: normalizeWithReserve(_reserve.variableBorrows),
    variableBorrowsMarketReferenceCurrency: normalize(
      _reserve.variableBorrowsMarketReferenceCurrency,
      marketRefCurrencyDecimals
    ),
    variableBorrowsUSD: _reserve.variableBorrowsUSD.toString(),
    totalBorrows: normalizeWithReserve(_reserve.totalBorrows),
    totalBorrowsMarketReferenceCurrency: normalize(
      _reserve.totalBorrowsMarketReferenceCurrency,
      marketRefCurrencyDecimals
    ),
    totalBorrowsUSD: _reserve.totalBorrowsUSD.toString(),
    totalLiquidity: normalizeWithReserve(_reserve.totalLiquidity),
    totalStableDebt: normalizeWithReserve(_reserve.totalStableDebt),
    totalVariableDebt: normalizeWithReserve(_reserve.totalVariableDebt),
    stableBorrowAPR: normalize(userReserve.stableBorrowRate, RAY_DECIMALS),
    stableBorrowAPY: normalize(exactStableBorrowRate, RAY_DECIMALS),
  }
}
