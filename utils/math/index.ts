import BigNumber from 'bignumber.js'
import type { BigNumberValue } from './types'

BigNumber.config({ EXPONENTIAL_AT: 1e9 })

export function valueToBigNumber(amount: BigNumberValue): BigNumber {
  if (!amount) return new BigNumber(0)
  if (amount instanceof BigNumber) {
    return amount
  } else if (typeof amount === 'string' || typeof amount === 'number') {
    return new BigNumber(amount)
  } else if (amount._hex) {
    return new BigNumber(amount._hex)
  } else {
    return new BigNumber(amount.toString())
  }
}

export function normalize(n: BigNumberValue, decimals: number): string {
  return normalizeBN(n, decimals).toString(10)
}

export function normalizeBN(n: BigNumberValue, decimals: number): BigNumber {
  return valueToBigNumber(n).shiftedBy(decimals * -1)
}

export const BigNumberZeroDecimal = BigNumber.clone({
  DECIMAL_PLACES: 0,
  ROUNDING_MODE: BigNumber.ROUND_DOWN,
})
export function valueToZDBigNumber(amount: BigNumberValue): BigNumber {
  return new BigNumberZeroDecimal(valueToBigNumber(amount))
}
