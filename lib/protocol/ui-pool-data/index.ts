import { isAddress } from 'ethers/lib/utils'
import type { IUiPoolDataProvider } from './typechain/UiPoolDataProvider'
import { IUiPoolDataProvider__factory } from './typechain/UiPoolDataProviderFactory'

export * from './types/UiPoolDataProviderTypes'
import type { Provider } from '../types'

export interface UiPoolDataProviderContext {
  address: string
  provider: Provider
}

export class UiPoolDataContract {
  contract: IUiPoolDataProvider
  provider: Provider

  /**
   * Constructor
   * @param context The ui pool data provider context
   */
  public constructor(context: UiPoolDataProviderContext) {
    if (!isAddress(context.address)) return

    this.contract = IUiPoolDataProvider__factory.connect(context.address, context.provider)
    this.provider = context.provider
  }
}
