import type { providers } from 'ethers'
import BaseService from '../commons/BaseService'
import type { EthereumTransactionTypeExtended, tEthereumAddress, transactionType } from '../commons/types'
import { eEthereumTxType } from '../commons/types'
import type { IERC1155 as IERC1155Detailed } from './typechain/IERC1155'
import { IERC1155__factory as IERC1155Detailed__factory } from './typechain/IERC1155__factory'

export interface IERC1155ServiceInterface {
  isApprovedForAll: (args: IsApprovalForAll) => Promise<boolean>
  setApprovalForAll: (args: SetApprovalForAll) => EthereumTransactionTypeExtended[]
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

export class ERC1155Service extends BaseService<IERC1155Detailed> implements IERC1155ServiceInterface {
  provider: any

  constructor(provider: providers.Provider) {
    super(provider, IERC1155Detailed__factory)
    this.provider = provider

    this.isApprovedForAll = this.isApprovedForAll.bind(this)
    this.setApprovalForAll = this.setApprovalForAll.bind(this)
  }

  public async isApprovedForAll({ user, token, spender }: IsApprovalForAll): Promise<boolean> {
    const ERC1155Contract: IERC1155Detailed = this.getContractInstance(token)
    return await ERC1155Contract.isApprovedForAll(user, spender)
  }

  public setApprovalForAll({ user, spender, token, value }: SetApprovalForAll): EthereumTransactionTypeExtended[] {
    const ERC1155Contract: IERC1155Detailed = this.getContractInstance(token)

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () => ERC1155Contract.populateTransaction.setApprovalForAll(spender, value),
      from: user,
    })

    return [
      {
        tx: txCallback,
        txType: eEthereumTxType.ERC1155_APPROVAL,
        gas: this.generateTxPriceEstimation([], txCallback),
      },
    ]
  }
}
