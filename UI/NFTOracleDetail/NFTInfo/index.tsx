import type { FC } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Image from 'next/image'
import { RESPONSIVE_DESIGN } from 'styles/constants'
import { useContractNFT, useMarket, useThegraph } from 'domains'
import { format } from 'date-fns'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { NFTIcon } from 'app/web3/TokenIcon'
import NumberDisplay from 'components/math/NumberDisplay'

import type { NFTInfoProps } from './types'
import { getNFTInfoByNFTID } from 'app/web3/TokenIcon/nft-list'
import { safeGet } from 'utils/get'
import LinkToAddress from 'components/LinkToAddress'

const NFTInfo: FC<NFTInfoProps> = () => {
  const { t } = useTranslation('nft-oracle-detail')
  const ROOT = useMemoEmpty(() =>
    styled(Paper)(({ theme }) => ({
      padding: theme.spacing(2),
      borderRadius: '10px',
      flex: 4,
    }))
  )
  const Title = useMemoEmpty(
    () => styled('div')`
      display: flex;
      justify-content: space-between;
      align-items: 'center';
    `
  )
  const InfoList = useMemoEmpty(
    () => styled(Stack)`
      .MuiGrid-container {
        align-items: center;
      }
    `
  )

  const { nft: nftSource } = useContractNFT()
  const { oracleAssets } = useThegraph()
  const nft = useMemo(() => {
    if (!nftSource || !oracleAssets || !oracleAssets.length) return {}
    return oracleAssets.find((i) => i.NFT_ID === nftSource.NFT_ID)
  }, [nftSource, oracleAssets])
  const M = useMarket()
  const { market } = getNFTInfoByNFTID(M.market, nft.collection)

  return (
    <ROOT variant="card">
      <Stack spacing={2}>
        <Title sx={RESPONSIVE_DESIGN.display.GTSM('flex')}>
          <Stack spacing={1} direction="row">
            <NFTIcon NFT_ID={nft.NFT_ID} sx={{ width: '50px', height: '50px' }} />
            <Typography variant="h5" component="div" sx={{ lineHeight: '50px' }}>
              {nft.collection}
            </Typography>
          </Stack>
          {market && (
            <IconButton
              sx={{ height: 40 }}
              onClick={() => {
                open(market.url, '_blank')
              }}
            >
              <Image src={market.logo} alt={market.url} width={24} height={24} />
            </IconButton>
          )}
        </Title>
        <Title sx={RESPONSIVE_DESIGN.display.LESM('flex')}>
          <Stack spacing={1} direction="row">
            <NFTIcon NFT_ID={nft.NFT_ID} sx={{ width: '50px', height: '50px' }} />
            <Typography variant="h5" component="div" sx={{ lineHeight: '50px' }}>
              {nft.collection}
            </Typography>
          </Stack>
        </Title>
        <InfoList spacing={1.5}>
          <Grid container>
            <Grid item xs>
              <Tooltip title={t('tips.threshold')} placement="bottom-end">
                <Typography variant="subtitle1">{t('info.threshold')}</Typography>
              </Tooltip>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                <NumberDisplay value={0.02} options="percent" />
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Tooltip title={t('tips.interval')} placement="bottom-end">
                <Typography variant="subtitle1">{t('info.interval')}</Typography>
              </Tooltip>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">30 min</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Tooltip title={t('tips.fluctuation')} placement="bottom-end">
                <Typography variant="subtitle1">{t('info.fluctuation')}</Typography>
              </Tooltip>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                <NumberDisplay value={0.15} options="percent" />
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Typography variant="subtitle1">{t('info.update')}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{safeGet(() => format(nft.lastUpdate, 'MM/dd hh:mm')) || '-'}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Typography variant="subtitle1">{t('info.address')}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                <LinkToAddress address={nft.underlyingAsset} />
              </Typography>
            </Grid>
          </Grid>
        </InfoList>
      </Stack>
    </ROOT>
  )
}

export default NFTInfo
