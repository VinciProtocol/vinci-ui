import type { BigNumber as EthersprojectBigNumber } from '@ethersproject/bignumber'
import type { BigNumber } from 'bignumber.js'

export type BigNumberValue =
  | string
  | number
  | BigNumber
  | EthersprojectBigNumber
  | {
      _hex: string
      _isBigNumber: true
    }
