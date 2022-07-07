import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { grey } from '@mui/material/colors'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Slider from '@mui/material/Slider'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Image from 'next/image'
import { RESPONSIVE_DESIGN } from 'styles/constants'
import { useContractNFT, useMarket } from 'domains'

import { useApp } from 'app/App'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { NFTIcon } from 'app/web3/TokenIcon'
import NumberDisplay from 'components/math/NumberDisplay'
import HealthFactor from 'components/HealthFactor'

import type { NFTInfoProps } from './types'
import { getNFTInfoByNFTID } from 'app/web3/TokenIcon/nft-list'

const NFTInfo: FC<NFTInfoProps> = () => {
  const {
    format: { number: NF },
  } = useApp()
  const { t } = useTranslation()
  const ROOT = useMemoEmpty(() =>
    styled(Paper)(({ theme }) => ({
      padding: theme.spacing(2),
      borderRadius: '10px',
      minHeight: '530px',
    }))
  )
  const Title = useMemoEmpty(
    () => styled('div')`
      display: flex;
      justify-content: space-between;
      align-items: 'center';
    `
  )
  const BorrowLimit = useMemoEmpty(() =>
    styled(Stack)(({ theme }) => ({
      paddingTop: theme.spacing(4),
    }))
  )
  const InfoList = useMemoEmpty(
    () => styled(Stack)`
      .MuiGrid-container {
        align-items: center;
      }
    `
  )

  const { nft } = useContractNFT()
  const M = useMarket()
  const { market } = getNFTInfoByNFTID(M.market, nft.collection)

  return (
    <ROOT variant="card">
      <Stack spacing={2}>
        <Title sx={RESPONSIVE_DESIGN.display.GTSM('flex')}>
          <Stack spacing={1} direction="row">
            <NFTIcon NFT_ID={nft.NFT_ID} sx={{ width: '50px', height: '50px' }} />
            <Typography variant="h5" component="div" sx={{ lineHeight: '50px' }}>
              {nft. collection}
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
              {nft. collection}
            </Typography>
          </Stack>
        </Title>

        <BorrowLimit>
          <Slider
            value={nft.borrowLimitUtilization || 0}
            valueLabelFormat={(value) => {
              return NF.format(value, NF.options('percent'))
            }}
            max={1}
            valueLabelDisplay="on"
          />
          <Grid container>
            <Grid item xs>
              <Typography variant="subtitle2" color={grey[500]}>
                {t('borrow-detail:borrowInfo.borrowLimit')}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" color={grey[500]}>
                <NumberDisplay value={nft.borrowLimit} type="network" />
              </Typography>
            </Grid>
          </Grid>
        </BorrowLimit>
        <InfoList spacing={1.5}>
          <Grid container sx={RESPONSIVE_DESIGN.display.LESM('flex')}>
            <Grid item xs>
              <Typography variant="subtitle1">{t('borrow-detail:borrowInfo.market')}</Typography>
            </Grid>
            <Grid item>
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
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Tooltip title={t('borrow-detail:tips.healthFactor')} placement="bottom-end">
                <Typography variant="subtitle1">{t('borrow-detail:borrowInfo.healthFactor')}</Typography>
              </Tooltip>
            </Grid>
            <Grid item>
              <HealthFactor value={nft.healthFactor} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Tooltip title={t('borrow-detail:tips.floorPrice')} placement="bottom-end">
                <Typography variant="subtitle1">{t('borrow-detail:borrowInfo.currentFloorPrice')}</Typography>
              </Tooltip>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                <NumberDisplay value={nft.currentFloorPrice} type="network" />
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Tooltip title={t('borrow-detail:tips.liquidationPrice')} placement="bottom-end">
                <Typography variant="subtitle1">{t('borrow-detail:borrowInfo.liquidationFloorPrice')}</Typography>
              </Tooltip>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                <NumberDisplay value={nft.liquidationPrice} type="network" />
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Tooltip title={t('borrow-detail:tips.collateralValue')} placement="bottom-end">
                <Typography variant="subtitle1">{t('borrow-detail:borrowInfo.collateralValue')}</Typography>
              </Tooltip>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                <NumberDisplay value={nft.collateralValue} type="network" />
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Tooltip title={t('borrow-detail:tips.totalBorrowed')} placement="bottom-end">
                <Typography variant="subtitle1">{t('borrow-detail:borrowInfo.totalBorrowed')}</Typography>
              </Tooltip>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                <NumberDisplay value={nft.borrowBalance} type="network" />
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Tooltip title={t('borrow-detail:tips.availableToBorrow')} placement="bottom-end">
                <Typography variant="subtitle1">{t('borrow-detail:borrowInfo.availableToBorrow')}</Typography>
              </Tooltip>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                <NumberDisplay value={nft.totalUserAvailableToBorrow} type="network" />
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Tooltip title={t('borrow-detail:tips.ltv')} placement="bottom-end">
                <Typography variant="subtitle1">{t('borrow-detail:borrowInfo.ltv')}</Typography>
              </Tooltip>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                <NumberDisplay value={nft.baseLTVasCollateral} options="percent" />
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Tooltip title={t('borrow-detail:tips.liquidationFee')} placement="bottom-end">
                <Typography variant="subtitle1">{t('borrow-detail:borrowInfo.liquidationFee')}</Typography>
              </Tooltip>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                <NumberDisplay value={nft.liquidationFee} options="percent" />
              </Typography>
            </Grid>
          </Grid>
        </InfoList>
      </Stack>
    </ROOT>
  )
}

export default NFTInfo
