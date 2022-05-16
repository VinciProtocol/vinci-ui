import { isAddress } from 'ethers/lib/utils'
import type { Provider } from '../types'
import type { VinciNFT } from './typechain/VinciNFT'
import { VinciNFT__factory } from './typechain/VinciNFT__factory'

export interface UiPoolDataProviderContext {
  address: string
  provider: Provider
}

export class VinciNFTContract {
  contract: VinciNFT
  provider: Provider

  /**
   * Constructor
   * @param context The ui pool data provider context
   */
  public constructor(context: UiPoolDataProviderContext) {
    if (!isAddress(context.address)) return

    this.contract = VinciNFT__factory.connect(context.address, context.provider)
    this.provider = context.provider
  }
}
