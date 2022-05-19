import type { providers } from 'ethers'
// import { getProvider } from 'app/web3/provider'
// import { ChainId } from 'app/web3/chain/types'
import BaseService from '../commons/BaseService'
import type { EthereumTransactionTypeExtended, tEthereumAddress, transactionType } from '../commons/types'
import { eEthereumTxType } from '../commons/types'
import type { IERC721 as IERC721Detailed } from './typechain/IERC721'
import { IERC721__factory as IERC721Detailed__factory } from './typechain/IERC721__factory'

export interface IERC721ServiceInterface {
  // getData: (args: DataType) => Promise<any>
  approve: (args: ApproveType) => EthereumTransactionTypeExtended
  isApproved: (args: ApproveType) => Promise<boolean>
  isApprovedForAll: (args: IsApprovalForAll) => Promise<boolean>
  setApprovalForAll: (args: SetApprovalForAll) => EthereumTransactionTypeExtended[]
}

export type DataType = {
  token: tEthereumAddress
  tokenIds: string[]
}

export type ApproveType = {
  user: tEthereumAddress
  spender: tEthereumAddress
  token: tEthereumAddress
  tokenId: string
}

export type SetApprovalForAll = {
  user: tEthereumAddress
  spender: tEthereumAddress
  token: tEthereumAddress
  value: boolean
}

export type IsApprovalForAll = {
  user: tEthereumAddress
  spender: tEthereumAddress
  token: tEthereumAddress
}

export class ERC721Service extends BaseService<IERC721Detailed> implements IERC721ServiceInterface {
  provider: any

  constructor(provider: providers.Provider) {
    super(provider, IERC721Detailed__factory)
    this.provider = provider

    this.approve = this.approve.bind(this)
    this.isApproved = this.isApproved.bind(this)
    this.isApprovedForAll = this.isApprovedForAll.bind(this)
    this.setApprovalForAll = this.setApprovalForAll.bind(this)
  }

  public approve({ user, spender, token, tokenId }: ApproveType): EthereumTransactionTypeExtended {
    const ERC721Contract: IERC721Detailed = this.getContractInstance(token)

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () => ERC721Contract.populateTransaction.approve(spender, tokenId),
      from: user,
    })

    return {
      tx: txCallback,
      txType: eEthereumTxType.ERC721_APPROVAL,
      gas: this.generateTxPriceEstimation([], txCallback),
    }
  }

  public async isApproved({ user, token, spender, tokenId }: ApproveType): Promise<boolean> {
    const ERC721Contract: IERC721Detailed = this.getContractInstance(token)
    const isApprovedForAll = await ERC721Contract.isApprovedForAll(user, spender)
    if (isApprovedForAll) return true
    const approvedAddress = await ERC721Contract.getApproved(tokenId)
    return spender === approvedAddress
  }

  public async isApprovedForAll({ user, token, spender }: IsApprovalForAll): Promise<boolean> {
    const ERC721Contract: IERC721Detailed = this.getContractInstance(token)
    return await ERC721Contract.isApprovedForAll(user, spender)
  }

  public setApprovalForAll({ user, spender, token, value }: SetApprovalForAll): EthereumTransactionTypeExtended[] {
    const ERC721Contract: IERC721Detailed = this.getContractInstance(token)

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () => ERC721Contract.populateTransaction.setApprovalForAll(spender, value),
      from: user,
    })

    return [
      {
        tx: txCallback,
        txType: eEthereumTxType.ERC721_APPROVAL,
        gas: this.generateTxPriceEstimation([], txCallback),
      },
    ]
  }
}
