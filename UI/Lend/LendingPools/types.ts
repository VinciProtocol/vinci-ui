import type { ComputedReserveData } from '@vinci-protocol/protocol'

export class LendingPoolsProps {}
export class UseTableProps {}
export type LendingPools = ComputedReserveData & {
  walletBalance: string
  walletBalanceInUSD: string
  underlyingBalance: string
  underlyingBalanceInUSD: string
  liquidityRate: string
  avg30DaysLiquidityRate: number
  borrowingEnabled: boolean
  interestHistory: any
  symbol: string
  APY: string
  totalSupply: string
  totalBorrowed: string
  utilization: string
  functionButtons: {
    depositDialogOpen?: (tabsValue: any, row: LendingPools) => void
  }
}
