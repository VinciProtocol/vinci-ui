import type { NextApiRequest, NextApiResponse } from 'next'
import { MARKETS } from 'app/web3/market'
import { ChainId } from 'app/web3/chain/types'
import { getNFTMeta } from 'app/web3/market/NFTMeta'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let { id } = req.query
  if (typeof id !== 'string') return res.status(404).end()
  if (id.length === 42) id = id.toLowerCase()
  const NFT = MARKETS[ChainId.ethereum].nftsNtoken[id]
  if (!NFT) return res.status(404).end()
  const { name, description, image } = getNFTMeta(NFT)

  return res.json({
    name,
    description,
    image,
    external_link: 'https://vinci.io',
    seller_fee_basis_points: 0,
    fee_recipient: '',
  })
}
