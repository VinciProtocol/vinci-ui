import type { ComputedReserveData } from 'lib/protocol/ui-pool-data/types'

export class NFTFloorPriceProps {}
export class UseTableProps {}
export type NFTFloorPrice = ComputedReserveData & {
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
    depositDialogOpen?: (tabsValue: any, row: NFTFloorPrice) => void
  }
}
