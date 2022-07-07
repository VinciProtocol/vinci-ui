import type { tEthereumAddress, InterestRate } from '../commons/types'

type SpecialNFTs = {
  isPunks?: boolean
}

export type LPDepositParamsType = {
  lendingPoolAddress: tEthereumAddress
  user: tEthereumAddress
  reserve: tEthereumAddress
  amount: string
  onBehalfOf?: tEthereumAddress
  referralCode?: string
}

export type LPDepositNFTParamsType = {
  lendingPoolAddress: tEthereumAddress
  user: tEthereumAddress
  nft: tEthereumAddress
  tokenIds: string[]
  amounts: string[]
  onBehalfOf?: tEthereumAddress
  referralCode?: string
} & SpecialNFTs

export type LPWithdrawParamsType = {
  lendingPoolAddress: tEthereumAddress
  user: tEthereumAddress
  reserve: tEthereumAddress
  amount: string
  onBehalfOf?: tEthereumAddress
  vTokenAddress?: tEthereumAddress
}

export type LPWithdrawNFTParamsType = {
  lendingPoolAddress: tEthereumAddress
  user: tEthereumAddress
  nft: tEthereumAddress
  tokenIds: string[]
  amounts: string[]
  onBehalfOf?: tEthereumAddress
} & SpecialNFTs
export type LPBorrowParamsType = {
  lendingPoolAddress: tEthereumAddress
  user: tEthereumAddress
  reserve: tEthereumAddress
  amount: string
  interestRateMode: InterestRate
  debtTokenAddress?: tEthereumAddress
  onBehalfOf?: tEthereumAddress
  referralCode?: string
}
export type LPRepayParamsType = {
  lendingPoolAddress: tEthereumAddress
  user: tEthereumAddress
  reserve: tEthereumAddress
  amount: string
  interestRateMode: InterestRate
  onBehalfOf?: tEthereumAddress
}
