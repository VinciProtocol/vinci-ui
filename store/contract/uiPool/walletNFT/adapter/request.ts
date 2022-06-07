import axios from 'axios'
import { utils } from 'ethers'
import { groupBy } from 'lodash'

import type { ChainId } from 'app/web3/chain/types'

export type WalletNFTProps = { chainId: ChainId; user: string; tokenAddresses: string[] }
export const useWalletNFT = (
  props: WalletNFTProps
): Promise<
  Array<{
    underlyingNFT: string
    tokenIds: string[]
  }>
> => {
  const { user, tokenAddresses, chainId } = props
  if (!user || !chainId || !tokenAddresses || !tokenAddresses.length) return Promise.reject()
  let results: any[] = []
  const fn = (params: any): Promise<any> =>
    axios
      .get(`https://deep-index.moralis.io/api/v2/${user}/nft`, {
        params,
        headers: {
          'x-api-key': 'FgLkty4uX7ZbGHbprH2VelX8upVUqT139M87gBhaf9oMiTMCro5ZHkmqJyocYxjg',
        },
      })
      .then(({ data: { cursor, page, page_size, total, result } }) => {
        results = results.concat(result)
        if ((page + 1) * page_size < total) {
          params.cursor = cursor
          return fn(params)
        }
      })
  return fn({
    chain: utils.hexValue(chainId),
    token_addresses: tokenAddresses,
    address: user,
  }).then(() => {
    const map = groupBy(
      results.map(({ token_address, token_id }) => ({
        underlyingNFT: token_address,
        tokenId: token_id,
      })),
      'underlyingNFT'
    )
    return Object.keys(map).map((underlyingNFT) => ({
      underlyingNFT,
      tokenIds: map[underlyingNFT].map(({ tokenId }) => tokenId),
    }))
  })
}

export type WalletNFT = Awaited<ReturnType<typeof useWalletNFT>>
