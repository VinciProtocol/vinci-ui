import Avatar from '@mui/material/Avatar'
import type { SxProps, Theme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import { getAssetInfo } from './assets-list'
import { getNFTInfoByCollection } from './nft-list'
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
  collection: string
  sx?: SxProps<Theme>
}

export function NFTSmallIcon({ collection, sx }: NFTIconProps) {
  const { market } = useMarket()
  if (!collection) return null

  const { src } = getNFTInfoByCollection(market, collection)
  return <SmallAvatar sx={sx} alt={collection} src={src} />
}

export function NFTIcon({ collection, sx }: NFTIconProps) {
  const { market } = useMarket()
  if (!collection) return null

  const { src } = getNFTInfoByCollection(market, collection)
  return <Avatar sx={sx} alt={collection} src={src} />
}
