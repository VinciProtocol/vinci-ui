import { isAddress } from 'ethers/lib/utils'
import type { UiPoolDataProvider } from './typechain/UiPoolDataProvider'
import { UiPoolDataProvider__factory } from './typechain/UiPoolDataProviderFactory'

export * from './types/UiPoolDataProviderTypes'
import type { Provider } from '../types'

export interface UiPoolDataProviderContext {
  address: string
  provider: Provider
}

export class UiPoolDataContract {
  contract: UiPoolDataProvider
  provider: Provider

  /**
   * Constructor
   * @param context The ui pool data provider context
   */
  public constructor(context: UiPoolDataProviderContext) {
    if (!isAddress(context.address)) return

    this.contract = UiPoolDataProvider__factory.connect(context.address, context.provider)
    this.provider = context.provider
  }
}
