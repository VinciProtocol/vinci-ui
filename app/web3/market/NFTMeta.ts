import type { NFTSetting } from './types'

export const getNFTMeta = ({ name, symbol, imageName }: NFTSetting) => {
  if (symbol === 'Sandbox') symbol = 'Land'
  return {
    name: `Vinci wrapped ${name}`,
    description: `v${symbol}s are wrapped NFTs that are minted when ${symbol} holders deposit their ${symbol}s as collateral in Vinci Protocol, and burned when they withdraw the ${symbol}s.`,
    image: `https://gateway.pinata.cloud/ipfs/QmXDAGsZzJPz8QP7VFqS1HKznGvwjVgXmgYhnqg2v4txgL/${imageName}`,
  }
}
