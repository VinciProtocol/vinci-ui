import Avatar from '@mui/material/Avatar'
import type { SxProps, Theme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import { getAssetInfo } from './assets-list'
import { getNFTInfoByNFTID } from './nft-list'
import { useMarket } from 'domains'

export interface TokenIconProps {
  tokenSymbol: string
  sx?: SxProps<Theme>
}

const TokenAvatar = styled(Avatar)`
  .MuiAvatar-img {
    object-fit: contain;
  }
`

export function TokenIcon({ tokenSymbol, sx }: TokenIconProps) {
  if (!tokenSymbol) return null

  const asset = getAssetInfo(tokenSymbol)

  return <TokenAvatar sx={sx} alt={tokenSymbol} src={asset.icon.src} />
}

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}))

export interface NFTIconProps {
  NFT_ID: string
  sx?: SxProps<Theme>
}

export function NFTSmallIcon({ NFT_ID, sx }: NFTIconProps) {
  const { market } = useMarket()
  if (!NFT_ID) return null

  const { src } = getNFTInfoByNFTID(market, NFT_ID)
  return <SmallAvatar sx={sx} alt={NFT_ID} src={src} />
}

export function NFTIcon({ NFT_ID, sx }: NFTIconProps) {
  const { market } = useMarket()
  if (!NFT_ID) return null

  const { src } = getNFTInfoByNFTID(market, NFT_ID)
  return <Avatar sx={sx} alt={NFT_ID} src={src} />
}
