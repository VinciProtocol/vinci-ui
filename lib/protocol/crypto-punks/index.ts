import type { CryptoPunks } from './typechain/CryptoPunks'
import { CryptoPunks__factory } from './typechain/CryptoPunks__factory'

import type { Provider } from '../types'
import type { EthereumTransactionTypeExtended, tEthereumAddress, transactionType } from '../commons/types'
import { eEthereumTxType } from '../commons/types'
import BaseService from '../commons/BaseService'
import type { ApproveType } from '../erc721-contract'

export type OfferPunkForSaleToAddress = {
  punkIndex: string
  // minSalePriceInWei: PromiseOrValue<BigNumberish>,
  user: tEthereumAddress
  wPunksGatewayAddress: tEthereumAddress
  token: tEthereumAddress
}

export class CryptoPunksContract extends BaseService<CryptoPunks> {
  provider: Provider

  /**
   * Constructor
   * @param context The ui pool data provider context
   */
  public constructor(provider: Provider) {
    super(provider, CryptoPunks__factory)
    this.provider = provider

    this.approve = this.approve.bind(this)
    this.isApproved = this.isApproved.bind(this)
  }

  public approve({
    punkIndex,
    user,
    token,
    wPunksGatewayAddress,
  }: OfferPunkForSaleToAddress): EthereumTransactionTypeExtended {
    const cryptoPunksContract: CryptoPunks = this.getContractInstance(token)

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        cryptoPunksContract.populateTransaction.offerPunkForSaleToAddress(punkIndex, 0, wPunksGatewayAddress),
      from: user,
    })

    return {
      tx: txCallback,
      txType: eEthereumTxType.ERC721_APPROVAL,
      gas: this.generateTxPriceEstimation([], txCallback),
    }
  }

  public async isApproved({ user, token, spender, tokenId }: ApproveType): Promise<boolean> {
    const cryptoPunksContract: CryptoPunks = this.getContractInstance(token)
    const { onlySellTo } = await cryptoPunksContract.punksOfferedForSale(tokenId)
    const approvedAddress = (onlySellTo || '').toLowerCase()
    spender = (spender || '').toLowerCase()
    return spender === approvedAddress
  }
}
