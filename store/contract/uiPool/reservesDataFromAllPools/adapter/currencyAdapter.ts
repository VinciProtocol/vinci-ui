import { normalizeBN } from 'utils/math'
import type { ReservesData } from './request'

export const getCurrency = ({
  marketReferenceCurrencyUnit,
  networkBaseTokenPriceDecimals,
  networkBaseTokenPriceInUsd,
}: ReservesData['currencyInfo']) => {
  const currencyDecimals = marketReferenceCurrencyUnit.toString().length - 1
  return {
    currencyDecimals,
    currencyPriceInUSD: normalizeBN(networkBaseTokenPriceInUsd, parseInt(networkBaseTokenPriceDecimals)),
  }
}

export type Currency = ReturnType<typeof getCurrency>
