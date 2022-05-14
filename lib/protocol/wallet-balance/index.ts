import { isAddress } from 'ethers/lib/utils'
import type { Provider } from '../types'
import type { WalletBalanceProvider as WalletBalanceProviderContract } from './typechain/WalletBalanceProvider'
import { WalletBalanceProvider__factory } from './typechain/WalletBalanceProviderFactory'

export interface UiPoolDataProviderContext {
  address: string
  provider: Provider
}

export class WalletBalanceContract {
  contract: WalletBalanceProviderContract
  provider: Provider

  /**
   * Constructor
   * @param context The ui pool data provider context
   */
  public constructor(context: UiPoolDataProviderContext) {
    if (!isAddress(context.address)) return

    this.contract = WalletBalanceProvider__factory.connect(context.address, context.provider)
    this.provider = context.provider
  }
}
