import type { NextApiRequest, NextApiResponse } from 'next'
import { https } from 'follow-redirects'
import { createPromise } from 'utils/promise'
import { WAD } from 'utils/math/ray'

const requestNFT = (address: string) => {
  const { promise, reslove, reject } = createPromise<string>()
  const options = {
    method: 'POST',
    hostname: 'api.thegraph.com',
    path: '/subgraphs/name/pancakeswap/nft-market',
    headers: {
      'Content-Type': 'application/json',
    },
    maxRedirects: 20,
  }

  const req = https.request(options, function (res) {
    const chunks: any = []

    res.on('data', function (chunk) {
      chunks.push(chunk)
    })

    res.on('end', function () {
      let body = Buffer.concat(chunks)
      const value = body.toString()
      reslove(value)
    })

    res.on('error', function (error) {
      console.error(error)
      reject(error)
    })
  })

  const postData = JSON.stringify({
    query:
      '\nquery getCollectionActivity($address: ID!, $first: Int!) {\n  nfts(first: $first, where: { collection: $address, isTradable: true }, orderBy: currentAskPrice, orderDirection: asc) {\n  tokenId\n  currentAskPrice }\n}\n',
    variables: {
      first: 1,
      address,
    },
  })

  req.write(postData)

  req.end()
  return promise
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.query.token
  if (token !== '0a8901b0e25deb55a87524f0cc164e9644020eba') return res.status(404).end()
  const nftAddress = (req.query.nft as any).toLowerCase()
  try {
    const {
      data: { nfts },
    } = JSON.parse(await requestNFT(nftAddress))
    if (!nfts.length) return res.status(404).end()
    const price = WAD.multipliedBy(nfts[0].currentAskPrice)
    if (price.isNaN()) throw new Error('currentAskPrice is ' + nfts[0].currentAskPrice)
    res.status(200).json({ floor_price: price.toString() })
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}

export default handler
