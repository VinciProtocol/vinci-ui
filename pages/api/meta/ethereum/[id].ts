import type { NextApiRequest, NextApiResponse } from 'next'
import { MARKETS } from 'app/web3/market'
import { ChainId } from 'app/web3/chain/types'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let { id } = req.query
  if (typeof id !== 'string') return res.status(404).end()
  if (id.length === 42) id = id.toLowerCase()
  const NFT = MARKETS[ChainId.ethereum].nfts[id]
  if (!NFT) return res.status(404).end()
  const { name, symbol, imageName } = NFT

  return res.json({
    name: `Vinci wrapped ${name}`,
    description: `v${symbol}s are wrapped NFTs that are minted when ${symbol} holders deposit their ${symbol}s as collateral in Vinci Protocol, and burned when they withdraw the ${symbol}s.`,
    image: `https://gateway.pinata.cloud/ipfs/QmXDAGsZzJPz8QP7VFqS1HKznGvwjVgXmgYhnqg2v4txgL/${imageName}`,
    external_link: 'https://vinci.io',
    seller_fee_basis_points: 0,
    fee_recipient: '',
  })
}
