import type { providers } from 'ethers'
import { BigNumber } from 'ethers'
import BaseService from '../commons/BaseService'
import { ChainId } from '../commons/types'
import type { ISynthetix } from './typechain/ISynthetix'
import { ISynthetix__factory } from './typechain/ISynthetix__factory'

export const synthetixProxyByChainId: Record<number, string> = {
  [ChainId.mainnet]: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
}

export type SynthetixValidationType = {
  user: string
  reserve: string
  amount: string // wei
}

export interface SynthetixInterface {
  synthetixValidation: (args: SynthetixValidationType) => Promise<boolean>
}

export class SynthetixService extends BaseService<ISynthetix> implements SynthetixInterface {
  constructor(provider: providers.Provider) {
    super(provider, ISynthetix__factory)

    this.synthetixValidation = this.synthetixValidation.bind(this)
  }

  public async synthetixValidation({
    user,
    reserve,
    amount, // wei
  }: SynthetixValidationType): Promise<boolean> {
    const { chainId } = await this.provider.getNetwork()
    if (synthetixProxyByChainId[chainId] && reserve.toLowerCase() === synthetixProxyByChainId[chainId].toLowerCase()) {
      const synthContract = this.getContractInstance(synthetixProxyByChainId[chainId])

      const transferableAmount: BigNumber = await synthContract.transferableSynthetix(user)
      return BigNumber.from(amount).lte(transferableAmount)
    }

    return true
  }
}
