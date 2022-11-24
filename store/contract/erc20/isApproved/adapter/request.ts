import type { ApproveType, ERC20Service } from '@vinci-protocol/protocol'

export type IsApprovedProps = {
  erc20Service: ERC20Service
  keys: string[]
} & Omit<ApproveType, 'token' | 'spender'>
export const getIsApproved = (props: IsApprovedProps) => {
  const { erc20Service, keys } = props
  const promises: Array<Promise<boolean>> = []

  keys.forEach((key) => {
    const [spender, token] = key.split('-')
    promises.push(
      erc20Service.isApproved({
        ...props,
        token,
        spender,
      })
    )
  })

  return Promise.all(promises).then((results) =>
    keys.reduce((obj, k, i) => {
      obj[k] = results[i]
      return obj
    }, {} as Record<string, boolean>)
  )
}
export type IsApproved = Awaited<ReturnType<typeof getIsApproved>>
