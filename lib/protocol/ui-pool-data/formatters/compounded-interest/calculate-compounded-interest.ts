import type BigNumber from 'bignumber.js'
import { valueToZDBigNumber } from 'utils/math'
import type { BigNumberValue } from 'utils/math/types'
import { SECONDS_PER_YEAR } from 'app/App/constants'
import { binomialApproximatedRayPow } from 'utils/math/ray'

export interface CalculateCompoundedInterestRequest {
  rate: BigNumberValue
  currentTimestamp: number
  lastUpdateTimestamp: number
}

export function calculateCompoundedInterest({
  rate,
  currentTimestamp,
  lastUpdateTimestamp,
}: CalculateCompoundedInterestRequest): BigNumber {
  const timeDelta = valueToZDBigNumber(currentTimestamp - lastUpdateTimestamp)
  const ratePerSecond = valueToZDBigNumber(rate).dividedBy(SECONDS_PER_YEAR)
  return binomialApproximatedRayPow(ratePerSecond, timeDelta)
}
