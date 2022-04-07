import { useWallet } from 'lib/wallet'
import { useRequestController } from 'store/contract/erc20/isApproved'
import { useEffect, useMemo } from 'react'
import { useContractData } from 'domains'
import { useContract } from 'domains/contract'

export const useIsApproved = () => {
  const { generalAssets } = useContractData()
  const { account } = useWallet()
  const { ERC20Service } = useContract()
  const { single } = useRequestController()

  const keys = useMemo(() => {
    const returnValue = generalAssets.map(
      ({ lendingPoolAddress, underlyingAsset }) => `${lendingPoolAddress}-${underlyingAsset}`
    )
    if (__DEV__) console.log('[domains] [tokens]', returnValue)
    return returnValue
  }, [generalAssets])

  useEffect(() => {
    if (!account || !keys?.length) return
    const timer = setTimeout(() => {
      single.run({
        user: account,
        keys,
        amount: '1',
        erc20Service: ERC20Service,
      })
    }, 1000)
    return () => {
      clearTimeout(timer)
      single.stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ERC20Service, account, single, generalAssets])
}
