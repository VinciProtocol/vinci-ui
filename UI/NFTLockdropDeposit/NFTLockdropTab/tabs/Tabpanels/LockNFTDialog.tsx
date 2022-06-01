import type { FC } from 'react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'

import { ROOT } from 'app/Dialogs/styles'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { DialogCloseIconButton } from 'components/btn/IconButton'
import type { NFTCardProps } from 'components/nft/NFTCard'
import NumberDisplay from 'components/math/NumberDisplay'
import { lockTypeList, lockTypeMap, REWARD_AMOUNT } from 'domains/thegraph'
import { useThegraph } from 'domains'
import { valueToBigNumber } from 'utils/math'

type LockNFTDialogProps = {
  nfts: NFTCardProps[]
  onClick: (type: string) => void
  visible: boolean
  close: () => void
}
const LockNFTDialog: FC<LockNFTDialogProps> = ({ nfts, visible, close, onClick }) => {
  const { t } = useTranslation('nft-lockdrop-deposit')
  const [type, setType] = useState('1')
  const ActionButton = useMemoEmpty(
    () => styled(Button)`
      width: 100%;
    `
  )
  const {
    timeLockedDashboard: { totalValue, rewardAmount },
  } = useThegraph()

  const estimatedRewards = useMemo(() => {
    if (!totalValue || totalValue.eq(0) || !nfts) return 0
    const days = lockTypeMap[type]
    const userValue = nfts.reduce((sum, nft) => {
      if (!nft.currentFloorPrice) return sum
      return sum.plus(valueToBigNumber(days).multipliedBy(nft.currentFloorPrice))
    }, valueToBigNumber(0))
    if (userValue.eq(0)) return 0
    return userValue.div(totalValue.plus(userValue)).multipliedBy(rewardAmount)
  }, [nfts, rewardAmount, totalValue, type])

  return (
    <Dialog onClose={close} open={visible}>
      <ROOT>
        <DialogCloseIconButton onClick={close} />
        <DialogTitle>
          <Typography variant="h6" sx={{ lineHeight: '40px' }}>
            {t('LockNFTDialog.title')}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            {nfts.map((nft) => (
              <NFTCard key={nft.id} {...nft} />
            ))}
            <ChooseLockTime setType={setType} type={type} />
            <EstimatedRewards estimatedRewards={estimatedRewards} />

            <Stack spacing={2} direction="row">
              <ActionButton variant="outlined" disabled={false} onClick={close}>
                {t('LockNFTDialog.actions.cancel')}
              </ActionButton>
              <ActionButton variant="linear" disabled={false} onClick={() => onClick(type)}>
                {t(`LockNFTDialog.actions.deposit`)}
              </ActionButton>
            </Stack>
          </Stack>
        </DialogContent>
      </ROOT>
    </Dialog>
  )
}

const NFTCard: FC<NFTCardProps> = ({ id, description, image, currentFloorPrice, valuation }) => {
  const Root = useMemoEmpty(
    () =>
      styled(Card)`
        width: 100%;
        position: relative;
      `
  )
  const title = useMemo(() => (id ? `${description} #${id}` : description), [description, id])

  return (
    <Root>
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <CardMedia component="img" height="140" image={image} alt={description} />
        </Grid>
        <Grid item xs={8}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="body2" component="div">
                {title}
              </Typography>
              {currentFloorPrice && (
                <Stack spacing={2}>
                  <Typography component="div" variant="caption" color="text.secondary">
                    {valuation}
                  </Typography>
                  <Typography variant="body1" component="div">
                    <NumberDisplay value={currentFloorPrice} type="network" />
                  </Typography>
                </Stack>
              )}
            </Stack>
          </CardContent>
        </Grid>
      </Grid>
    </Root>
  )
}

const ChooseLockTime: FC<{ setType: (type: string) => void; type: string }> = ({ setType, type }) => {
  const Root = useMemoEmpty(() => styled(Stack)``)
  const { t } = useTranslation('nft-lockdrop-deposit')
  return (
    <Root spacing={2}>
      <Typography variant="subtitle2" component="div">
        <span>{t('LockNFTDialog.chooseLockTime.title')}</span>
      </Typography>
      {lockTypeList.map((row, index) => (
        <Grid key={index} container spacing={0}>
          {row.map((info) => (
            <Grid key={info.type} item xs={4}>
              <Button
                key={`${index}-${info.type}`}
                sx={{ width: '90%', margin: '0 5%' }}
                onClick={() => setType(info.type)}
                variant={type === info.type ? 'linear' : 'outlined'}
              >
                {info.days + ' ' + t('LockNFTDialog.chooseLockTime.days')}
              </Button>
            </Grid>
          ))}
        </Grid>
      ))}
    </Root>
  )
}

const EstimatedRewards: FC<{ estimatedRewards: any }> = ({ estimatedRewards }) => {
  const Root = useMemoEmpty(() => styled(Stack)``)
  const { t } = useTranslation('nft-lockdrop-deposit')
  const Tip = styled('p')(({ theme }) => ({
    ...theme.typography.caption,
  }))
  return (
    <Root spacing={2}>
      <Typography variant="subtitle2" component="div">
        <Stack spacing={2} direction="row">
          <span>{t('LockNFTDialog.estimatedRewards.title')}</span>
          <NumberDisplay value={estimatedRewards} type="VCI" />
        </Stack>
      </Typography>
      <Alert severity="info">
        <Tip>{t('LockNFTDialog.estimatedRewards.warn.1')}</Tip>
        <Tip>{t('LockNFTDialog.estimatedRewards.warn.2')}</Tip>
        <Tip>{t('LockNFTDialog.estimatedRewards.warn.3')}</Tip>
      </Alert>
    </Root>
  )
}

export default LockNFTDialog
