import axios from 'axios'
import { utils } from 'ethers'
import { groupBy } from 'lodash'

import type { ChainId } from 'app/web3/chain/types'
import { safeGet } from 'utils/get'

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
  if (__DEV__ && tokenAddresses[0] === '0x1CfccDC825BCA6199E5FcbF956275AC99F58C801') {
    return fetch('https://api.thegraph.com/subgraphs/name/imsunhao/cryptopunks', {
      headers: {
        accept: '*/*',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'content-type': 'application/json',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
      referrer: 'https://thegraph.com/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: `{"query":"{users(first: 1, where: {id: \\"${user.toLowerCase()}\\"  }) { id tokenIndex}}","variables":null}`,
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
    })
      .then((data) => data.json())
      .then((data) => {
        return [
          {
            underlyingNFT: tokenAddresses[0],
            tokenIds: safeGet(() => data.data.users[0].tokenIndex) || [],
          },
        ]
      })
  }

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
