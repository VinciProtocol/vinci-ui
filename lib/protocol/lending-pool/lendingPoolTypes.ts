import type { tEthereumAddress, InterestRate } from '../commons/types'

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
}

export type LPDepositAndLockNFTParamsType = {
  lendingPoolAddress: tEthereumAddress
  user: tEthereumAddress
  nft: tEthereumAddress
  tokenIds: string[]
  amounts: string[]
  lockType: string
  onBehalfOf?: tEthereumAddress
  referralCode?: string
}

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
}
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
